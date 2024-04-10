// ----- IMPORTS

import { updateMoviesGalleryByStatus } from './mylibrary_update-details';

// ---- DECLARATIONS

const refs = {
  galleryMyLibraryWatch: document.querySelector('.gallery_watch-block'),
  galleryMyLibraryQueue: document.querySelector('.gallery_queue-block'),
  watchedBtn: document.querySelector('.watched-btn'),
  queueBtn: document.querySelector('.queue-btn'),
  unselectBtn: document.querySelector('.unselect-btn'),
  paginationMyLibraryContainer: document.querySelector(
    '.pagination-mylibrary_container'
  ),
  filmModal: document.querySelector('[data-modal]'),
};

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
refs.queueBtn.addEventListener('click', onQueueBtnClick);

// ----- FUNCTIONS | onWatchedBtnClick

function onWatchedBtnClick({ target }) {
  refs.galleryMyLibraryWatch.classList.remove('is-hidden');
  refs.galleryMyLibraryQueue.classList.add('is-hidden');
  if (target.classList.contains('active')) {
    return;
  }
  refs.watchedBtn.classList.add('active');
  refs.queueBtn.classList.remove('active');

  updateMoviesGalleryByStatus(target.dataset.status);
}

// ----- FUNCTIONS | onQueueBtnClick

function onQueueBtnClick({ target }) {
  refs.galleryMyLibraryWatch.classList.add('is-hidden');
  refs.galleryMyLibraryQueue.classList.remove('is-hidden');
  if (target.classList.contains('active')) {
    return;
  }
  refs.watchedBtn.classList.remove('active');
  refs.queueBtn.classList.add('active');

  updateMoviesGalleryByStatus(target.dataset.status);
}
