// ----- IMPORTS

import { paginationMyLibrary } from './pagination-mylibrary';
import { renderMyLibraryQueue } from './render_mylibrary-queue';
import { renderMyLibraryWatched } from './render_mylibrary-watched';
import { readLocalStorageData, deserializeData } from './api/local-storage-API';

const MOVIES_PER_PAGE = 20;

const paginationMyLibraryContainer = document.querySelector(
  '.pagination-mylibrary_container'
);

// ----- DECLARATIONS

let movies = [];
let splittedMovieSet;
let currentPage = 1;
let totalPages = 0;
let totalMovies = 0;

// ----- FUNCTIONS | updateMoviesGalleryByStatus

export function updateMoviesGalleryByStatus(status, pageNumber) {
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
  }
  if (status === 'watched') {
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

// ----- SPLIT MOVIE SET

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
}
