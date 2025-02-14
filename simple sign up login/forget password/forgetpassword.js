import {
    onAuthStateChanged,
    sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'


import { auth } from "../../firebaseConfig.js";

///////// CHECKING IF USER EXITST OR NOT //////////////////////////////////////////////////////

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


////////////////////////// FORGET PASSWORD FUNCTION ////////////////////////////////////////////////////////

const forget_Password_Func = () => {

    let email = document.getElementById("email").value;
    sendPasswordResetEmail(auth, email)
        .then(() => {
           console.log("Send Email");
        })
        .catch((error) => {
            const errorMessage = error.message;
           console.log(errorMessage);
        });
}


let frgtBtn = document.getElementById("frgtBtn");
frgtBtn.addEventListener("click", forget_Password_Func); 
