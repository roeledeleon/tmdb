// ----- IMPORTS

import { firebaseConfig } from './api/firebase-api';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

// ----- DECLARATIONS | Firebase

const app = initializeApp(firebaseConfig);

const signupBtnEl = document.querySelector('.signupbtn');

const form = document.querySelector('.modal-content-signup');

let queueFilms = [];
let watchFilms = [];

// ----- EVENT LISTENERS

form.addEventListener('submit', e => {
  e.preventDefault();
  onRegister();
});

// ----- FUNCTIONS | Register

function onRegister() {
  // Get all input fields

  let fullname = document.getElementById('signup_fname').value;
  let email = document.getElementById('signup_email').value;
  let password = document.getElementById('signup_pword').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or password not OK');
    return;
    // Don't continue to run code
  }

  if (validate_field(fullname) == false) {
    alert('Input Field not OK');
    return;
    // Don't continue to run code
  }

  // Move on with Authentication
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed up
      const user = userCredential.user;
      // ...

      // Add this user to Firebase Database
      var user_data = {
        fullname: fullname,
        email: email,
        queueFilms: queueFilms,
        watchFilms: watchFilms,
        last_login: Date.now(),
      };

      const db = getDatabase();
      set(ref(db, 'users/' + user.uid), user_data);

      alert('User Created');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

function validate_email(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  alert('You have entered an invalid email address!');
  return false;
}

function validate_password(password) {
  //Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

// Get the modal
var modal = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
