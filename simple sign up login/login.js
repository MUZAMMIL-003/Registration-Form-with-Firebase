import { signInWithEmailAndPassword,
    onAuthStateChanged,
 } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import { auth } from '../firebaseConfig.js'



onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      localStorage.setItem("user", JSON.stringify(uid))
      console.log(uid)
        console.log("User is signed in")
        window.location.replace("../index.html")
      // ...
    } else {
      // User is signed out
      console.log("User is signed out")
      // ...
    }
  })



let loginFunction = (event) => {
    event.preventDefault();

    let email = document.getElementById("email")
    let password = document.getElementById("password")

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Sign in successfull")
            console.log("User: ", user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
            console.log("Sign in failed")
            // ..
        });
}
let loginBttn = document.getElementById("loginBttn")
loginBttn.addEventListener("click", loginFunction)