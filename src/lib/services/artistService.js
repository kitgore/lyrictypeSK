// src/lib/services/artistService.js
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from './initFirebase'; // Adjust the path as necessary to import your Firebase app instance

export async function getArtistLyrics(artistName) {
    const functions = getFunctions(app);
    const callGetArtistLyrics = httpsCallable(functions, 'initialArtistSearch');
  
    try {
      const result = await callGetArtistLyrics({ artistName });
      return result.data; // The response from your Firebase Function is accessed via result.data
    } catch (error) {
      console.error("Error calling getArtistLyrics Firebase Function:", error);
      throw error; // Rethrow or handle the error as you see fit
    }
  }


export async function searchByArtistId(artistId, seenSongs, numSongs) {
  const functions = getFunctions(app);
  const callSearch = httpsCallable(functions, 'searchByArtistId');

  try {
    const result = await callSearch({ artistId, seenSongs, numSongs});
    console.log(result.data);
    return result.data; // The response from your Firebase Function is accessed via result.data
  } catch (error) {
    console.error("Error calling getArtistLyrics Firebase Function:", error);
    throw error; // Rethrow or handle the error as you see fit
  }
}