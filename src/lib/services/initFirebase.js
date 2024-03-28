// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX53dpNUbjeJhP_CstO6yOzSe76CLbgc4",
  authDomain: "lyrictype-cdf2c.firebaseapp.com",
  projectId: "lyrictype-cdf2c",
  storageBucket: "lyrictype-cdf2c.appspot.com",
  messagingSenderId: "835790496614",
  appId: "1:835790496614:web:a87481404a0eb63104dea7",
  measurementId: "G-6N60MSG8SL"
};

const app = initializeApp(firebaseConfig);

// Conditionally initialize Firebase Analytics
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.warn('Firebase Analytics is not supported in this environment.');
    }
  }).catch(error => {
    console.error('Error checking Firebase Analytics support:', error);
  });
}

export default app;