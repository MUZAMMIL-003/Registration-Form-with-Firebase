//////////////// Initializing Firebase //////////////////////////////////////////
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  import { getAuth, 
     GoogleAuthProvider,
   } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

  const firebaseConfig = {
    apiKey: "AIzaSyBfs94YMgiXcWUnk3tZdofVLUnrUjQsm_o",
    authDomain: "registration-form-7542c.firebaseapp.com",
    projectId: "registration-form-7542c",
    storageBucket: "registration-form-7542c.firebasestorage.app",
    messagingSenderId: "530077366848",
    appId: "1:530077366848:web:824c3046b936035f1cbda5",
    measurementId: "G-Y5534XS8FH"
  };



  ////////////////////////////// Initialize Firebase variables //////////////////////////
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();



 /////////////////////////// Export Firebase Function's keyWords ///////////////////////////////////
  export{
    auth,
    db,
    provider,
    GoogleAuthProvider,
  }