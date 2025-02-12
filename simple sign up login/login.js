import { signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
 } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import { auth, provider,GoogleAuthProvider, } from '../firebaseConfig.js'




///////////////////////////// CHECKING IF USER EXIST OR NOT  //////////////////////////////////////////////


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      localStorage.setItem("user", JSON.stringify(uid))
      
      console.log(uid)
        console.log("User is signed in")
        window.location.assign("../index.html")
      // ...
    } else {
      // User is signed out
      console.log("User is signed out")
      // ...
    }
  })



////////////////////////// LOGIN FUNCTION ////////////////////////////////////////////////////////////////

  let email = document.getElementById("email")
  let password = document.getElementById("password")

let loginFunction = (event) => {
    event.preventDefault();


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





///////////////////////////////////// LOGIN WITH GOOGLE!  //////////////////////////////////////////////

let loginWithGooglefunc = (event)=>{
  event.preventDefault();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    console.log(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

let googleLoginBttn = document.getElementById("loginWithGoogleBttn")
googleLoginBttn.addEventListener("click", loginWithGooglefunc);