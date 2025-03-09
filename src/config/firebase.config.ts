import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCQ0UXGlK4fXpr9UX56dYDkxKGplCPG0Ew",
  authDomain: "imagesadmin.firebaseapp.com",
  projectId: "imagesadmin",
  storageBucket: "imagesadmin.firebasestorage.app",
  messagingSenderId: "213999167533",
  appId: "1:213999167533:web:50c8ecac6260091150f0a4"
};

export const app = initializeApp(firebaseConfig);
