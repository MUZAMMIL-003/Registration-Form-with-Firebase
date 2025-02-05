import {
    collection,
    addDoc,
    getDocs,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

import { db } from '../firebaseConfig.js';

let txtArea = document.getElementById('txtArea');
let crtBttn = document.getElementById('crtBttn');
let dltBttn = document.getElementById('dltBttn');

crtBttn.addEventListener('click', () => {
    console.log(txtArea.value);
});

// let crtFun = async() => {
//     console.log(txtArea.value);
//     try {
//         const docRef = await addDoc(collection(db, "Posts"), {
//           first: "Ada",
//           last: "Lovelace",
//           born: 1815
//         });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
// }



//ab iskey under mujhe addDoc karwana he 