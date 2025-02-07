import {
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {
  collection,
  getDocs,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'


import { auth, db } from '../firebaseConfig.js';



////checking user state
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    localStorage.setItem("user", JSON.stringify(uid))
    console.log(user)
    console.log("user-Id =>", uid)
    console.log("User is signed in")
    // ...
  } else {
    // User is signed out
    console.log("User is signed out")
    // ...
  }
})






const UserPfp = collection(db, "Posts");
let user = JSON.parse(localStorage.getItem("user"));
// Create a query against the collection.
const q = query(UserPfp, where("Userid", "==", user));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
let posts = doc.data().post;
let Userid = doc.data().Userid;

  let rowDiv = document.querySelector(".row");
  let tempDiv = `
<div class="col">
<div class="card h-100">
<div class="card-body">
<h5 class="card-title">${posts}</h5>
<p class="card-text">${"Written By =>", Userid}</p>
</div>
</div>
</div>
`
  rowDiv.innerHTML += tempDiv;
});