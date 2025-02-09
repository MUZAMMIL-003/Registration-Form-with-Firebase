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

  // try {
  //   // Add a new document in collection "cities"
  //   await updateDoc(doc(db, "posts", post_id), {
  //     postText: "updated post 2nd time",
  //   }).then(()=>{
  //     console.log("update done");
  //     getMyPosts();
  //   })
  // } catch (error) {
  //   console.error(error)
  // }
};

/// gettinh user posts from firestore with Query...
const UserPfp = collection(db, "Posts");
let user = JSON.parse(localStorage.getItem("user"));

const q = query(UserPfp, where("Userid", "==", user));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc1) => {
  let posts = doc1.data().post;
  let Userid = doc1.data().Userid;
  let username = doc1.data().userName 
  let docID = doc1.id;
  console.log(docID)

  let rowDiv = document.querySelector(".row");
  let tempDiv = `
<div class="col">
<div class="card h-100">
<div class="card-body">
<h5 class="card-title">${posts}</h5>
<p class="card-text">Written By =>${ username}</p>
<a href="#" class="card-link" id="Update">Update Post</a>
<a href="#" class="card-link" id="delete">Delete Post</a>
</div>
</div>
</div>
`
rowDiv.innerHTML += tempDiv;

let deleteBttn = document.getElementById("delete");
deleteBttn.addEventListener("click", async () => {
  await deleteDoc(doc(db, "Posts", docID));
  window.location.reload();
})

let updateBttn = document.getElementById("Update");
updateBttn.addEventListener("click", async () => {
  updateFunc(docID)
  
})

});


// let modalBody = document.getElementById("modal-body")
// console.log("modalBody.innerText")

// let madalinpt = document.getElementById("madalInpt").value;
// console.log("madalinpt")
 

