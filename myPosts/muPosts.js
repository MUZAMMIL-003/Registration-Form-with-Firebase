import {
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
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



///chat gpt code...

/// gettinh user posts from firestore with Query...
const UserPfp = collection(db, "Posts");
let user = JSON.parse(localStorage.getItem("user"));

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
<a href="#" class="card-link">Update Post</a>
<a href="#" class="card-link">Delete Post</a>
</div>
</div>
</div>
`
  rowDiv.innerHTML += tempDiv;
});


const userDocRef = doc(db, 'users', 'user');
// Define the fields you want to update
const updateUser = async () => {
  try {
    await updateDoc(userDocRef, {
      name: 'New Name',  // Field to update
      age: 25            // Another field to update
    });
    console.log('Document updated successfully!');
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// updateUser();  // Call the function to update the document



