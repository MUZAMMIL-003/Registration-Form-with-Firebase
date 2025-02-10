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

// Function to reload posts after delete or update
async function loadPosts() {
  const querySnapshot = await getDocs(q);
  const rowDiv = document.querySelector(".row");
  rowDiv.innerHTML = ''; // Clear previous posts but not the event listeners

  querySnapshot.forEach((doc1) => {
    let posts = doc1.data().post;
    let username = doc1.data().userName;
    let docID = doc1.id;

    // Create the card for each post dynamically
    let colDiv = document.createElement("div");
    colDiv.classList.add("col");

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "p-3", "bg-info", "bg-opacity-10", "border", "border-info", "border", "rounded", "border-light", "h-100");

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    let postTitle = document.createElement("h5");
    postTitle.classList.add("card-title", "text-light");
    postTitle.textContent = posts;

    let postText = document.createElement("p");
    postText.classList.add("card-text", "text-light");
    postText.textContent = `Written By => ${username}`;

    let updateLink = document.createElement("a");
    updateLink.href = "#";
    updateLink.classList.add("card-link");
    updateLink.id = `Update-${docID}`;
    let updateButton = document.createElement("button");
    updateButton.type = "button";
    updateButton.classList.add("text-white", "bg-gradient-to-br", "from-purple-600", "to-blue-500", "hover:bg-gradient-to-bl", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "dark:focus:ring-blue-800", "font-medium", "rounded-lg", "text-sm", "px-3", "py-2.5", "text-center", "me-2", "mb-2");
    updateButton.textContent = "Edit Post";
    updateLink.appendChild(updateButton);

    let deleteLink = document.createElement("a");
    deleteLink.href = "#";
    deleteLink.classList.add("card-link");
    deleteLink.id = `Delete-${docID}`;
    let deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("text-white", "bg-gradient-to-br", "from-pink-500", "to-orange-400", "hover:bg-gradient-to-bl", "focus:ring-4", "focus:outline-none", "focus:ring-pink-200", "dark:focus:ring-pink-800", "font-medium", "rounded-lg", "text-sm", "px-2.5", "py-2.5", "text-center", "me-2", "mb-2");
    deleteButton.textContent = "Delete Post";
    deleteLink.appendChild(deleteButton);

    // Append elements to card body
    cardBodyDiv.appendChild(postTitle);
    cardBodyDiv.appendChild(postText);
    cardBodyDiv.appendChild(updateLink);
    cardBodyDiv.appendChild(deleteLink);

    // Append card body to card div
    cardDiv.appendChild(cardBodyDiv);

    // Append card div to column div
    colDiv.appendChild(cardDiv);

    // Append the entire column div to rowDiv
    rowDiv.appendChild(colDiv);

    // Attach event listeners for the unique delete and update buttons
    let deleteBttn = document.getElementById(`Delete-${docID}`);
    let updateBttn = document.getElementById(`Update-${docID}`);

    // Event listener for the delete button
    deleteBttn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "Posts", docID));  // Delete the document by docID
      loadPosts();  // Reload the posts dynamically
    });

    // Event listener for the update button
    updateBttn.addEventListener("click", async () => {
      let input = prompt("Enter here", posts);  // Prompt the user to enter a new post
      if (input !== null) {
        // Make sure the input is not null before updating the post
        await updateDoc(doc(db, "Posts", docID), { post: input });
        console.log(input);  // Log the new post content
        loadPosts();  // Reload the posts dynamically
      }
    });
  });
}

// Call the loadPosts function to initially load the posts
loadPosts();
