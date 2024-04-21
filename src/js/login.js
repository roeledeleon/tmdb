// ----- IMPORTS
import { optionsIMDB } from './api/imdb-api';

import {
  createLocalStorageData,
  readLocalStorageData,
} from './api/local-storage-API';

import { firebaseConfig } from './api/firebase-api';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  onValue,
  snapshot,
} from 'firebase/database';

import { Notify } from 'notiflix';

// ----- DECLARATIONS | Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const loginBtnEl = document.querySelector('.loginbtn');

const form = document.querySelector('.modal-content-login');

// ----- EVENT LISTENERS

let uid = optionsIMDB.specs.uid;
let email = optionsIMDB.specs.email;
let login = optionsIMDB.specs.login;

form.addEventListener('submit', e => {
  e.preventDefault();
  onLogin();
});

// ----- FUNCTIONS | LogIn

function onLogin() {
  'user strict';
  let email = document.getElementById('login_email').value;
  let password = document.getElementById('login_pword').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or password not OK');
    return;
    // Don't continue to run code
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      Notify.success('Log-In Successful!');

      optionsIMDB.specs.uid = user.uid;
      optionsIMDB.specs.email = user.email;
      optionsIMDB.specs.password = password;
      optionsIMDB.specs.login = 1;

      createLocalStorageData(JSON.stringify(optionsIMDB.specs.uid), 'uid');
      createLocalStorageData(JSON.stringify(optionsIMDB.specs.email), 'email');
      createLocalStorageData(JSON.stringify(optionsIMDB.specs.login), 'login');
      createLocalStorageData(
        JSON.stringify(optionsIMDB.specs.password),
        'password'
      );

      // update last_login data of Firebase Database
      var user_data = {
        last_login: Date.now(),
      };
      const db = getDatabase();
      update(ref(db, 'users/' + readLocalStorageData('uid')), user_data);

      // downloading realtime data from firebase
      const dbRef = ref(getDatabase());
      let watchFilmList = [];
      let queueFilmList = [];
      get(child(dbRef, `users/${readLocalStorageData('uid')}`))
        .then(snapshot => {
          if (snapshot.exists()) {
            let realtimeDB = {
              fullname: snapshot.val().fullname,
              email: snapshot.val().email,
              last_login: snapshot.val().last_login,
              watchFilmList: snapshot.val().watchFilmList,
              queueFilmList: snapshot.val().queueFilmList,
            };

            // Check if realtime data is undefined
            if (typeof realtimeDB.watchFilmList == 'undefined') {
              createLocalStorageData(JSON.stringify(watchFilmList), 'watched');
            } else {
              createLocalStorageData(
                JSON.stringify(realtimeDB.watchFilmList),
                'watched'
              );
            }
            if (typeof realtimeDB.queueFilmList == 'undefined') {
              createLocalStorageData(JSON.stringify(queueFilmList), 'queue');
            } else {
              createLocalStorageData(
                JSON.stringify(realtimeDB.queueFilmList),
                'queue'
              );
            }
          } else {
            // console.log('No data available');
          }
        })
        .catch(error => {
          console.error(error);
        });

      const myLibraryPageEl = document.querySelector('.navlist-library');
      const loginEl = document.querySelector('.navlist-login');
      const signupEl = document.querySelector('.navlist-signup');
      const logoutEL = document.querySelector('.navlist-logout');
      const emailEL = document.querySelector('.navlist-email');

      let login = optionsIMDB.specs.login;
      if (login === 0) {
        myLibraryPageEl.classList.add('is-hidden');
        loginEl.classList.remove('is-hidden');
        signupEl.classList.remove('is-hidden');
        logoutEL.classList.add('is-hidden');
        emailEL.classList.add('is-hidden');
      } else {
        myLibraryPageEl.classList.remove('is-hidden');
        loginEl.classList.add('is-hidden');
        signupEl.classList.add('is-hidden');
        logoutEL.classList.remove('is-hidden');
        emailEL.classList.remove('is-hidden');
      }

      watchedFilms;
      var modal = document.getElementById('id01');
      modal.style.display = 'none';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(error.message);

      if (errorCode == 'auth/invalid-credential') {
        Notify.failure(
          'Log-In Not Successful! Please input correct email/password!'
        );
      }

      var modal = document.getElementById('id01');
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

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
