import {
    onAuthStateChanged,
    signOut,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {
    collection,
    getDocs,
    query,
     where,
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'
import {
    auth, db,
} from "./firebaseConfig.js";

let User = localStorage.getItem("user");
if (!User) {
  console.log("no");
  window.location.replace("./simple sign up login/registration page/register.html");
  
}
console.log(User);

let userName = localStorage.getItem("userName");

////checking user state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        localStorage.setItem("user", JSON.stringify(uid))
        let username = user.displayName;
        console.log(username)
        localStorage.setItem("userName", JSON.stringify(username))
        console.log(user)
        let shwName = document.getElementById("shwName");
        shwName.innerHTML = username;
        let userEmail =user.email;
         let shwEmail = document.getElementById("shwEmail");
         shwEmail.innerHTML = userEmail;
        console.log("user-Id =>", uid)
        console.log("User is signed in")
        // ...
    } else {
        // User is signed out
        console.log("User is signed out")
        // ...
    }
})



/// getting All posts from firebase
const querySnapshot = await getDocs(collection(db, "Posts"));
querySnapshot.forEach((doc) => {

    let user = doc.data().Userid;
    // console.log("user-Id =>", user)
    let posts = doc.data().post;
    // console.log("user-text =>", posts)
    let email = doc.data().email;
    let username = doc.data().userName /// yaha mujhe userName get krna he front me show karwaney k liyee...
    console.log("user-Name =>", username)

    
    let rowDiv = document.querySelector(".row");
    let tempDiv = `
    <div class="col  ">
    <div class="card p-3 bg-info bg-opacity-10 border border-info border rounded border-light h-100" h-100">
    <div class="card-body  ">
    <h5 class="card-title  text-light">${posts}</h5>
    <p class="card-text text-light">Written By => ${ username}</p>
    </div>
    </div>
    </div>
    `

    rowDiv.innerHTML += tempDiv;
});



//// sign out function
let signOutBttn = () => {

    signOut(auth).then(() => {
        console.log("log out successfully");
        localStorage.removeItem("user");
        window.location.assign("./simple sign up login/registration page/register.html");
    }).catch((error) => {
        console.log(error.message);
    });

}

let signOutButton = document.getElementById("signOutBttn");
signOutButton.addEventListener("click", signOutBttn);









