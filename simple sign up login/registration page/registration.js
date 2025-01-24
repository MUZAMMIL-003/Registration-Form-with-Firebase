
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import { auth } from "../../firebaseConfig.js";


import {
    collection,
    addDoc,
    getDocs,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { db } from '../../firebaseConfig.js';

////checking user state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log("User is signed in")
        window.location.replace("../../index.html")
        // ...
    } else {
        // User is signed out
        console.log("User is signed out")
        // ...
    }
})


///getting user data from database

//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id.value} => ${doc.data().value}`);
//   });


let signUp = async (event) => {
    event.preventDefault();
    let userName = document.getElementById("name")
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("Sign up successfull")
            console.log("User: ", user)

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
            console.log("Sign up failed")
            // ..
        });

    try {
        const docRef = await addDoc(collection(db, "users"), {
            displayName: userName.value,
            email: email.value,
            password: password.value,

        });
        console.log("Document written with ID: ", docRef.id);
        console.log("user added to database");
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    await setDoc(doc(db, `users`, uid), {
        displayName: userName.value,
        email: email.value,

    });


}

let signUpBttn = document.getElementById("signUpBttn")
signUpBttn.addEventListener("click", signUp)