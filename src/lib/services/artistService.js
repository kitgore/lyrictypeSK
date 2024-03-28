// src/lib/services/artistService.js
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from './initFirebase'; // Adjust the path as necessary to import your Firebase app instance

export async function getArtistLyrics(artistName) {
    const functions = getFunctions(app); // Initialize Firebase Functions with your app instance
    const callGetArtistLyrics = httpsCallable(functions, 'searchArtistAndFetchLyrics'); // The name here should match the name of your deployed Firebase Function
  
    try {
      const result = await callGetArtistLyrics({ artistName });
      return result.data; // The response from your Firebase Function is accessed via result.data
    } catch (error) {
      console.error("Error calling getArtistLyrics Firebase Function:", error);
      throw error; // Rethrow or handle the error as you see fit
    }
  }