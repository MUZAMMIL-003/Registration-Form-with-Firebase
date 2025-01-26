import {
    onAuthStateChanged,
    signOut, 
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'


import { auth,
} from "./firebaseConfig.js";


////checking user state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user)
        console.log("User is signed in")
        // ...
    } else {
        // User is signed out
        console.log("User is signed out")
        // ...
    }
})

//// sign out function
let signOutBttn = () => { 

    signOut(auth).then(() => {

        window.location.assign("./simple sign up login/registration page/register.html");

    }).catch((error) => {

        console.log(error.message);

    });

}

let signOutButton = document.getElementById("signOutBttn");
signOutButton.addEventListener("click", signOutBttn);