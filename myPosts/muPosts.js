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
  deleteDoc,
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

let updateFunc = async (docID) => {
  console.log(docID);

};

/// gettinh user posts from firestore with Query...
const UserPfp = collection(db, "Posts");
let user = JSON.parse(localStorage.getItem("user"));

const q = query(UserPfp, where("Userid", "==", user));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc1) => {
//   let posts = doc1.data().post;
//   let Userid = doc1.data().Userid;
//   let username = doc1.data().userName 
//   let docID = doc1.id;
//   console.log(docID)
// // console.log(posts)
//   let rowDiv = document.querySelector(".row");
//   let tempDiv = `
// <div class="col">
// <div class="card h-100">
// <div class="card-body">
// <h5 class="card-title">${posts}</h5>
// <p class="card-text">Written By =>${ username}</p>
// <a href="#" class="card-link" id="Update">Update Post</a>
// <a href="#" class="card-link" id="delete">Delete Post</a>
// </div>
// </div>
// </div>
// `
// rowDiv.innerHTML += tempDiv;

// let deleteBttn = document.getElementById("delete");
// deleteBttn.addEventListener("click", async () => {
//   await deleteDoc(doc(db, "Posts", docID));
//   window.location.reload();
// })

// let updateBttn = document.getElementById("Update");
// updateBttn.addEventListener("click", async () => {
//   updateFunc(docID)
//   let input = prompt(" enter here",posts)
//   console.log(input)
// })

// });

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc1) => {
  let posts = doc1.data().post;
  let Userid = doc1.data().Userid;
  let username = doc1.data().userName;
  let docID = doc1.id;

  console.log(docID);  // This will print each specific docID

  let rowDiv = document.querySelector(".row");
  
  // Modify the buttons' IDs to include the docID so they're unique
  let tempDiv = `
  <div class="col">
    <div class="card bg-transparent  border-light h-100">
      <div class="card-body">
        <h5 class="card-title text-light">${posts}</h5>
        <p class="card-text text-light">Written By =>${username}</p>
        <a href="#" class="card-link" id="Update-${docID}"><button type="button" class="btn btn-secondary">Edit Post</button></a>
        <a href="#" class="card-link" id="Delete-${docID}"><button type="button" class="btn btn-danger">Delete Post</button></a>
        
      </div>
    </div>
  </div>
  `;

  rowDiv.innerHTML += tempDiv;

  // Get the unique buttons based on docID
  let deleteBttn = document.getElementById(`Delete-${docID}`);
  let updateBttn = document.getElementById(`Update-${docID}`);
  // let updateBttn = document.getElementById(`Update`);

  // Event listener for the delete button
  deleteBttn.addEventListener("click", async () => {
    await deleteDoc(doc(db, "Posts", docID));  // Delete the document by docID
    window.location.reload();  // Reload to reflect changes
  });

  // Event listener for the update button
  updateBttn.addEventListener("click", async () => {
    updateFunc(docID);  // Call your update function here (if necessary)
    let input = prompt("Enter here", posts);  // Prompt the user to enter a new post
    if (input !== null) {
      // Make sure the input is not null before updating the post
      await updateDoc(doc(db, "Posts", docID), { post: input });
      console.log(input);  // Log the new post content
      window.location.reload();  // Reload to reflect the update
    }
  });
});