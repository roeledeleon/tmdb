// ----- IMPORTS

import { optionsIMDB } from './api/imdb-api';

import { paginationMyLibrary } from './pagination';
import { renderMyLibraryWatched } from './render_mylibrary';
import { renderMyLibraryQueue } from './render_mylibrary';
import {
  readLocalStorageData,
  createLocalStorageData,
  deserializeData,
} from './api/local-storage-API';

import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

// ----- DECLARATIONS

const MOVIES_PER_PAGE = 21;

const paginationMyLibraryContainer = document.querySelector(
  '.pagination-mylibrary_container'
);

let movies = [];
let splittedMovieSet;
let currentPage = 1;
let totalPages = 0;
let totalMovies = 0;

// ----- FUNCTIONS | updateMoviesGalleryByStatus

export function updateMoviesGalleryByStatus(status, pageNumber) {
  'use strict';
  paginationMyLibraryContainer.classList.remove('is-hidden');

  const data = readLocalStorageData(status);

  if (!data) {
    return;
  }
  const unSerializedData = deserializeData(data);

  movies = [...unSerializedData];

  currentPage = pageNumber || 1;
  totalMovies = movies.length;
  totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

  splittedMovieSet = splitSet(movies, MOVIES_PER_PAGE, totalPages);

  if (status === 'queue') {
    loadLoading();
    if (!splittedMovieSet.get(currentPage) && currentPage) {
      renderMyLibraryQueue(splittedMovieSet.get(currentPage - 1));
      if (currentPage <= 1) {
        paginationMyLibraryContainer.innerHTML = '';
      } else {
        paginationMyLibrary(currentPage - 1, totalPages);
      }
    } else {
      renderMyLibraryQueue(splittedMovieSet.get(currentPage));
      paginationMyLibrary(currentPage, totalPages);
    }
    removeLoading();
  }
  if (status === 'watched') {
    loadLoading();
    if (!splittedMovieSet.get(currentPage) && currentPage) {
      renderMyLibraryWatched(splittedMovieSet.get(currentPage - 1));
      if (currentPage <= 1) {
        paginationMyLibraryContainer.innerHTML = '';
      } else {
        paginationMyLibrary(currentPage - 1, totalPages);
      }
    } else {
      renderMyLibraryWatched(splittedMovieSet.get(currentPage));
      paginationMyLibrary(currentPage, totalPages);
    }
    removeLoading();

    // Check if Log-In
    const emailBoxEl = document.querySelector('.navlist-email');
    const emailEl = document.querySelector('.navlist-email-btn');

    if (readLocalStorageData('login') == null) {
      optionsIMDB.specs.login = 0;
    } else {
      optionsIMDB.specs.login = readLocalStorageData('login');
    }

    let login = optionsIMDB.specs.login;

    if (login == 0) {
      emailBoxEl.classList.add('is-hidden');
    } else {
      emailBoxEl.classList.remove('is-hidden');
      emailEl.innerHTML = readLocalStorageData('email');
    }
  }

  paginationMyLibraryContainer.removeEventListener(
    'click',
    status === 'watched'
      ? onQueuePaginationItemClick
      : onWatchedPaginationItemClick
  );

  paginationMyLibraryContainer.addEventListener(
    'click',
    status === 'watched'
      ? onWatchedPaginationItemClick
      : onQueuePaginationItemClick
  );
}

// ----- FUNCTIONS | Loading

function loadLoading() {
  Loading.pulse({
    svgColor: 'purple',
  });
}

function removeLoading() {
  Loading.remove(100);
}

// ----- FUNCTIONS | SPLIT MOVIE SET

function splitSet(dataSet, chunckSize, totalSize) {
  const spliettedSet = new Map();

  for (let i = 0; i < totalSize; i++) {
    spliettedSet.set(
      i + 1,
      dataSet.slice(i * chunckSize, i * chunckSize + chunckSize)
    );
  }
  return spliettedSet;
}

// ----- PAGINATION | WATCH

function onWatchedPaginationItemClick({ target }) {
  if (target.nodeName === 'UL' || target.classList.contains('disabled')) {
    return;
  }

  currentPage = globalCurrentPage;

  let watchStatus = 0;
  if (
    target.classList.contains('btn-left') &&
    !target.classList.contains('disabled')
  ) {
    watchStatus = 1;
  }
  if (
    target.classList.contains('btn-right') &&
    !target.classList.contains('disabled')
  ) {
    watchStatus = 2;
  }
  if (!watchStatus) {
    if (target.nodeName === 'UL' || target.classList.contains('disabled')) {
      return;
    }
    if (isNaN(Number(target.textContent)) && watchStatus != 0) {
    } else if (isNaN(Number(target.textContent))) {
      return;
    }
    if (Number(target.textContent) === globalCurrentPage) {
      return;
    }
  }

  switch (watchStatus) {
    case 0:
      globalCurrentPage = Number(target.textContent);
      break;
    case 1:
      globalCurrentPage--;
      break;
    case 2:
      globalCurrentPage++;
      break;
  }

  currentPage = globalCurrentPage;

  renderMyLibraryWatched(splittedMovieSet.get(currentPage));
  paginationMyLibrary(currentPage, totalPages);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----- PAGINATION | QUEUE

function onQueuePaginationItemClick({ target }) {
  if (target.nodeName === 'UL' || target.classList.contains('disabled')) {
    return;
  }
  currentPage = globalCurrentPage;

  let queueStatus = 0;

  if (
    target.classList.contains('btn-left') &&
    !target.classList.contains('disabled')
  ) {
    queueStatus = 1;
  }

  if (
    target.classList.contains('btn-right') &&
    !target.classList.contains('disabled')
  ) {
    queueStatus = 2;
  }

  if (!queueStatus) {
    if (target.nodeName === 'UL' || target.classList.contains('disabled')) {
      return;
    }

    if (isNaN(Number(target.textContent)) && queueStatus != 0) {
    } else if (isNaN(Number(target.textContent))) {
      return;
    }

    if (Number(target.textContent) === globalCurrentPage) {
      return;
    }
  }

  switch (queueStatus) {
    case 0:
      globalCurrentPage = Number(target.textContent);
      break;
    case 1:
      globalCurrentPage--;
      break;
    case 2:
      globalCurrentPage++;
      break;
  }

  currentPage = globalCurrentPage;

  renderMyLibraryQueue(splittedMovieSet.get(currentPage));
  paginationMyLibrary(currentPage, totalPages);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
