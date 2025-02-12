import {
    onAuthStateChanged,
 } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'


import { auth } from "../../firebaseConfig.js";



onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      localStorage.setItem("user", JSON.stringify(uid))
      localStorage.setItem("userName", JSON.stringify(displayName))

      console.log(uid)
        console.log("User is signed in")
        window.location.assign("../../index.html")
      // ...
    } else {
      // User is signed out
      console.log("User is signed out")
      // ...
    }
  })