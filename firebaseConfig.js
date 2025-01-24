
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  import { getAuth } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

  const firebaseConfig = {
    apiKey: "AIzaSyDUGNB_d1tXz8dCqMy0ooJ4nNee2mAFTzU",
    authDomain: "first-project-9a7fc.firebaseapp.com",
    projectId: "first-project-9a7fc",
    storageBucket: "first-project-9a7fc.firebasestorage.app",
    messagingSenderId: "5077976363",
    appId: "1:5077976363:web:84cfc0ebd5eb42b754316e",
    measurementId: "G-SKVX8DPQCZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);


  export{
    auth,
    db,
  }