import {
    onAuthStateChanged,
    signOut, 
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {
    collection,
    getDocs,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'
import { auth,db,
} from "./firebaseConfig.js";


////checking user state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user)
        console.log(uid)
        console.log("User is signed in")
        // ...
    } else {
        // User is signed out
        console.log("User is signed out")
        // ...
    }
})


const querySnapshot = await getDocs(collection(db, "Posts"));
querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
let user = doc.data(); /// mujhe user ki id chahiye thi taki me usey posts ke sath print karwa saku
console.log(user)
let posts = doc.data().post; // yaha mujhe user ki posts chahiye thi
console.log(posts)
let postsPrnDiv = document.getElementById("postsPrnDiv");
let postsChldDiv = document.getElementById("postsChldDiv");
postsChldDiv.style.class = "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-auto max-w-full rounded-lg"
postsChldDiv.innerHTML = (`
    <svg class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
      </svg>
      <a href="#">
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">${user.uid}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">${posts}</p>
    `);
postsPrnDiv.appendChild(postsChldDiv);

});


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









