/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// functions/index.js
// const functions = require('firebase-functions');
// const Genius = require("genius-lyrics");
// const normalize = require('normalize-strings');

// // Initialize Genius Client with your API key
// const geniusApiKey = functions.config().genius.key;
// const Client = new Genius.Client(geniusApiKey);


// // Helper function to format characters
// function formatChars(input) {
//     let output = "";
//     const replacements = {
//         "‘": "'", "’": "'", "❛": "'", "❜": "'", "＇": "'",
//         "“": '"', "”": '"', "‟": '"', "❝": '"', "❞": '"', "〝": '"', "〞": '"', "＂": '"',
//         "‚": ",",
//         // Add more replacements as needed
//     };
//     for (let i = 0; i < input.length; i++) {
//         output += replacements[input.charAt(i)] || input.charAt(i);
//     }
//     return normalize(output).toLowerCase();
// }

// // Helper function to extract random 4 lines from lyrics
// function extractRandomLyricsSegment(lyrics) {
//     const lines = lyrics.split('\n').filter(line => line.trim() !== '');
//     if (lines.length <= 4) {
//         return lines.join('\n');
//     }

//     const start = Math.floor(Math.random() * (lines.length - 4));
//     return lines.slice(start, start + 4).join('\n');
// }

// // Helper function to shuffle an array
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// // Firebase Function to search for an artist and fetch lyrics
// exports.searchArtistAndFetchLyrics = functions.https.onCall(async (data, context) => {
//     const { artistName } = data;

//     try {
//         const searches = await Client.songs.search(artistName);
//         if (searches.length === 0) {
//             throw new functions.https.HttpsError('not-found', 'Artist not found.');
//         }

//         // Shuffle search results to randomize song selection
//         const shuffledSearches = shuffleArray(searches);
//         const song = shuffledSearches[0]; // Select the first song after shuffling
//         const lyrics = await song.lyrics();
//         const songInfo = await song.fetch();
//         const formattedLyrics = formatChars(lyrics);
//         const randomLyricsSegment = extractRandomLyricsSegment(formattedLyrics);

//         const response = {
//             title: song.title,
//             artist: song.artist.name,
//             lyrics: randomLyricsSegment,
//             image: songInfo.album ? songInfo.album.image : null,
//         };

//         return response;
//     } catch (error) {
//         console.error("Error fetching artist lyrics:", error);
//         throw new functions.https.HttpsError('internal', 'Failed to fetch artist lyrics', error);
//     }
// });

const functions = require('firebase-functions');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


async function getGeniusSongLyrics(artist_name) {
    // Search for songs by the artist using the Genius API
    const searchUrl = "https://api.genius.com/search";
    let geniusApiKey = functions.config().genius ? functions.config().genius.key : null;

    // Fallback to local config if the Firebase config is null
    if (!geniusApiKey) {
        try {
            const localConfigPath = path.join(__dirname, 'local-config.json');
            const localConfig = JSON.parse(fs.readFileSync(localConfigPath, 'utf8'));
            geniusApiKey = localConfig.genius.key;
        } catch (error) {
            console.error('Error loading local config:', error);
            throw new Error('API key not found. Please configure your API key.');
        }
    }
    const headers = {
        "Authorization": geniusApiKey
    };

    const params = new URLSearchParams({ q: artist_name });
    const response = await fetch(`${searchUrl}?${params}`, { headers });
    const data = await response.json();
    const songs = data.response.hits;

    if (songs.length === 0) {
        return { songTitle: "No songs found.", lyrics: "" };
    }

    
    // Randomly select a song
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const songTitle = randomSong.result.title;
    const songUrl = randomSong.result.url;
    const songArt = randomSong.result.song_art_image_url;
    const songArtist = randomSong.result.artist_names;
    const primaryArtist = randomSong.result.primary_artist.name;
    const artistImg = randomSong.result.primary_artist.image_url;
    // console.log(randomSong.result)
    
    try {
        // Fetch the song page
        const songPageResponse = await fetch(songUrl);
        const songPageHtml = await songPageResponse.text();

        // Parse the page with cheerio
        const $ = cheerio.load(songPageHtml);
        let lyricsHtml = '';

        // Select the container that includes the lyrics and retrieve the HTML
        const lyricsContainer = $('.lyrics, .Lyrics__Container-sc-1ynbvzw-1');
        if (lyricsContainer.length > 0) {
            lyricsHtml = lyricsContainer.html();
        } else {
            lyricsHtml = "Lyrics not found.";  // Fallback text if no container is found
        }


        // Replace <br> tags with \n to maintain formatting
        let lyrics = lyricsHtml.replace(/<br\s*\/?>/gi, '\n');

        // Remove any script or style elements entirely
        lyrics = lyrics.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '');
        lyrics = lyrics.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '');

        // Optionally remove remaining HTML tags but keep the content within them
        lyrics = lyrics.replace(/<\/?a[^>]*>/gi, ''); // Remove anchor tags but preserve their text
        lyrics = lyrics.replace(/<span[^>]*>/gi, ''); // Remove start span tags
        lyrics = lyrics.replace(/<\/span>/gi, '');    // Remove end span tags
        lyrics = lyrics.replace(/<div[^>]*>/gi, '\n');// Replace start div tags with new lines
        lyrics = lyrics.replace(/<\/div>/gi, '');     // Remove end div tags
        lyrics = lyrics.replace(/\[.*?\]/g, '');      // Remove text within square brackets
        lyrics = lyrics.replace(/<\/?(i|b)>/gi, '');  // Remove italic and bold tags

        // console.log(lyrics)

        // Decode HTML entities
        lyrics = $('<textarea/>').html(lyrics).text();

        // Trim the final string to remove any leading/trailing whitespace
        lyrics = lyrics.trim();

        // After processing, you can select random lines or use as is
        const lines = lyrics.split('\n');

        // Filter out empty lines and lines with text in square brackets
        const filteredLines = lines.filter(line => line.trim() !== '' && !line.trim().match(/\[.*?\]/));

        // console.log(lines)

        // Ensure there are at least four lines to choose from
        if (filteredLines.length < 4) {
            return { songTitle, lyrics }; // Or handle differently if needed
        }

        // Choose a random start index, ensuring it allows for four consecutive lines
        const startIndex = Math.floor(Math.random() * (filteredLines.length - 3));
        const selectedLines = filteredLines.slice(startIndex, startIndex + 4).join('\n');

        // Use selectedLines instead of the full lyrics
        lyrics = selectedLines;
        //console.log(lyrics)
        return { songTitle, lyrics, songArtist, songArt, primaryArtist, artistImg };

    } catch (error) {
        console.error("Error navigating to song URL:", error);
        throw error;
    }
}

exports.searchArtistAndFetchLyrics = functions.https.onCall(async (data, context) => {
    const { artistName } = data;
    try {
        const { songTitle, lyrics, songArtist, songArt, primaryArtist, artistImg } = await getGeniusSongLyrics(artistName);
        return {
            title: songTitle,
            artist: songArtist,
            lyrics: lyrics,
            image: songArt,
            primaryArtist: primaryArtist,
            artistImg: artistImg
        };
    } catch (error) {
        console.error("Error fetching artist lyrics:", error);
        throw new functions.https.HttpsError('internal', 'Failed to fetch artist lyrics', error.toString());
    }
});


console.log(getGeniusSongLyrics("Arctic Monkeys"));
//searchArtistAndFetchLyrics({data: {artistName: "playboi carti"}}).then(result => console.log(result));