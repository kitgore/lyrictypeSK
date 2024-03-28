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
const functions = require('firebase-functions');
const Genius = require("genius-lyrics");
const normalize = require('normalize-strings');

// Initialize Genius Client with your API key
const geniusApiKey = functions.config().genius.key;
const Client = new Genius.Client(geniusApiKey);


// Helper function to format characters
function formatChars(input) {
    let output = "";
    const replacements = {
        "‘": "'", "’": "'", "❛": "'", "❜": "'", "＇": "'",
        "“": '"', "”": '"', "‟": '"', "❝": '"', "❞": '"', "〝": '"', "〞": '"', "＂": '"',
        "‚": ",",
        // Add more replacements as needed
    };
    for (let i = 0; i < input.length; i++) {
        output += replacements[input.charAt(i)] || input.charAt(i);
    }
    return normalize(output).toLowerCase();
}

// Helper function to extract random 4 lines from lyrics
function extractRandomLyricsSegment(lyrics) {
    const lines = lyrics.split('\n').filter(line => line.trim() !== '');
    if (lines.length <= 4) {
        return lines.join('\n');
    }

    const start = Math.floor(Math.random() * (lines.length - 4));
    return lines.slice(start, start + 4).join('\n');
}

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Firebase Function to search for an artist and fetch lyrics
exports.searchArtistAndFetchLyrics = functions.https.onCall(async (data, context) => {
    const { artistName } = data;

    try {
        const searches = await Client.songs.search(artistName);
        if (searches.length === 0) {
            throw new functions.https.HttpsError('not-found', 'Artist not found.');
        }

        // Shuffle search results to randomize song selection
        const shuffledSearches = shuffleArray(searches);
        const song = shuffledSearches[0]; // Select the first song after shuffling
        const lyrics = await song.lyrics();
        const formattedLyrics = formatChars(lyrics);
        const randomLyricsSegment = extractRandomLyricsSegment(formattedLyrics);

        const response = {
            title: song.title,
            artist: song.artist.name,
            lyrics: randomLyricsSegment, // Use the extracted random lyrics segment
            album: song.album ? song.album.name : "Unknown",
            image: song.album ? song.album.image : null,
        };

        return response;
    } catch (error) {
        console.error("Error fetching artist lyrics:", error);
        throw new functions.https.HttpsError('internal', 'Failed to fetch artist lyrics', error);
    }
});
