import {
    collection,
    addDoc,
    getDocs,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import {
    onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import { db } from '../firebaseConfig.js';
import { auth } from '../firebaseConfig.js';

let txtArea = document.getElementById('txtArea');
let crtBttn = document.getElementById('crtBttn');
let dltBttn = document.getElementById('dltBttn');



onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user)
        console.log(uid)
        console.log("User is signed in")
        crtBttn.addEventListener('click', async() => {
            console.log(txtArea.value);
            try {
                const docRef = await addDoc(collection(db, "Posts"), {
                    Userid : user.uid,
                    post: txtArea.value,
                });
                console.log("Document written with ID: ", docRef.id);
                console.log(uid)
                // console.log(post)
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        });
        // ...
    } else {
        // User is signed out
        console.log("User is signed out")
        // ...
    }
})
