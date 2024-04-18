// ----- IMPORTS

import { firebaseConfig } from './api/firebase-api';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

import { optionsIMDB } from './api/imdb-api';

import {
  createLocalStorageData,
  readLocalStorageData,
} from './api/local-storage-API';

import { Notify } from 'notiflix';

// ----- DECLARATIONS | Firebase

const app = initializeApp(firebaseConfig);

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

      optionsIMDB.specs.uid = user.uid;
      optionsIMDB.specs.email = user.email;
      optionsIMDB.specs.login = 1;

      createLocalStorageData(JSON.stringify(optionsIMDB.specs.uid), 'uid');
      createLocalStorageData(JSON.stringify(optionsIMDB.specs.email), 'email');
      createLocalStorageData(JSON.stringify(optionsIMDB.specs.login), 'login');

      const myLibraryPageEl = document.querySelector('.navlist-library');
      const loginEl = document.querySelector('.navlist-login');
      const signupEl = document.querySelector('.navlist-signup');
      const logoutEL = document.querySelector('.navlist-logout');

      const emailBoxEl = document.querySelector('.navlist-email');
      const emailEl = document.querySelector('.navlist-email-btn');

      let login = optionsIMDB.specs.login;
      if (login === 0) {
        myLibraryPageEl.classList.add('is-hidden');
        loginEl.classList.remove('is-hidden');
        signupEl.classList.remove('is-hidden');
        logoutEL.classList.add('is-hidden');
        emailBoxEl.classList.add('is-hidden');
      } else {
        myLibraryPageEl.classList.remove('is-hidden');
        loginEl.classList.add('is-hidden');
        signupEl.classList.add('is-hidden');
        logoutEL.classList.remove('is-hidden');
        emailBoxEl.classList.remove('is-hidden');

        emailEl.innerHTML = readLocalStorageData('email');
      }

      Notify.success('User Created');

      var modal = document.getElementById('id02');
      modal.style.display = 'none';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      Notify.failure(
        'User Creation Not Successful! Please check your network connection!'
      );

      var modal = document.getElementById('id02');
      modal.style.display = 'none';
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
