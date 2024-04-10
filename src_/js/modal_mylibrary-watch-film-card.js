// ----- IMPORTS

import { fetchFilmDetailsById } from './modal_fetch-film-card-details';
import noPosterURL from '../images/foto.jpg';
import closeBtnIcon from '../images/icon/symbol-defs.svg';
import {
  dataSaveQueue,
  dataSaveWatch,
  removeSaveWatch,
  removeSaveQueue,
} from './modal_add-film-card';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { updateMoviesGalleryByStatus } from './mylibrary_update-details';

// ----- DECLARATIONS

const refs = {
  galleryWatchBox: document.querySelector('.gallery_watch-box'),
  filmModal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
};

let filmDetails = {};
const cache = [];

// ----- FUNCTIONS | onGalleryBoxClick

async function onGalleryBoxClick(event) {
  if (event.target.classList.contains('gallery_fetch-box')) {
    return;
  }

  const filmId = Number(event.target.closest('.card').id);

  let cachedFilmDetails = cache.find(film => film.id === filmId);

  if (cachedFilmDetails) {
    filmDetails = cachedFilmDetails;
  } else {
    try {
      filmDetails = await fetchFilmDetailsById(filmId);
    } catch (err) {
      console.log(err.message);
      console.log(err.code);
    }

    cache.push(filmDetails);
  }
  clearFilmModalMarkup();

  renderFilmModal(filmDetails);

  const modalButtonsRefs = {
    closeBtn: document.querySelector('[button-modal-close]'),
    addQueueBtn: document.querySelector('[button-add-queue]'),
    addWatchBtn: document.querySelector('[button-add-watch]'),
    unselectBtn: document.querySelector('[button-unselect]'),
  };

  enableBtn(modalButtonsRefs.unselectBtn);

  modalButtonsRefs.closeBtn.addEventListener('click', onCloseModal);
  modalButtonsRefs.addQueueBtn.addEventListener('click', onAddQueueBtn);
  modalButtonsRefs.addWatchBtn.addEventListener('click', onAddWatchBtn);
  modalButtonsRefs.unselectBtn.addEventListener('click', onUnselectBtn);

  const watchedMovies = getMovies('watched') || [];
  const moviesInQueue = getMovies('queue') || [];

  // Check if Movie Watched / Queue

  const isMovieWatched = watchedMovies.some(
    movie => movie.id === filmDetails.id
  );

  const isMovieInQueue = moviesInQueue.some(
    movie => movie.id === filmDetails.id
  );

  if (isMovieInQueue) {
    disableBtn(modalButtonsRefs.addQueueBtn);
  }

  if (isMovieWatched) {
    disableBtn(modalButtonsRefs.addWatchBtn);
  }

  onOpenModal();
  window.addEventListener('keydown', onEscKeyPress);
}

// ----- FUNCTIONS

function renderFilmModal(data) {
  const filmModalMarkup = createFilmModalMarkup(data);
  refs.filmModal.insertAdjacentHTML('beforeend', filmModalMarkup);
}

function onOpenModal() {
  refs.filmModal.classList.remove('is-hidden');
  disableScroll();
}

function clearFilmModalMarkup() {
  refs.filmModal.innerHTML = '';
}

function onBackdropModalClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function disableScroll() {
  let paddingOffset = window.innerWidth - refs.body.offsetWidth + 'px';
  refs.body.classList.add('disable-scroll');
  refs.body.style.paddingRight = paddingOffset;
}

function enableScroll() {
  refs.body.classList.remove('disable-scroll');
  refs.body.style.paddingRight = 0;
}

function onCloseModal() {
  refs.filmModal.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
  enableScroll();

  //---- Update Watch Gallery on Close
  updateMoviesGalleryByStatus('watched', globalCurrentPage);
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onUnselectBtn() {
  const watchedMovies = getMovies('watched') || [];
  const moviesInQueue = getMovies('queue') || [];

  const isMovieWatched = watchedMovies.some(
    movie => movie.id === filmDetails.id
  );

  const isMovieInQueue = moviesInQueue.some(
    movie => movie.id === filmDetails.id
  );

  if (isMovieInQueue) {
    removeSaveQueue(filmDetails);
  }

  if (isMovieWatched) {
    removeSaveWatch(filmDetails);
  }

  enableBtn(document.querySelector('[button-add-watch]'));
  enableBtn(document.querySelector('[button-add-queue]'));
}

function onAddQueueBtn({ target }) {
  dataSaveQueue(filmDetails);
  if (window.location.pathname.includes('my-library')) {
    if (document.querySelector('.watched-btn').classList.contains('active')) {
      updateMoviesGalleryByStatus('watched', globalCurrentPage);
    } else {
      updateMoviesGalleryByStatus('queue', globalCurrentPage);
    }
  }

  updateMoviesGalleryByStatus('watch');

  disableBtn(target);
  enableBtn(document.querySelector('[button-add-watch]'));
  enableBtn(document.querySelector('[button-unselect]'));
}

function onAddWatchBtn({ target }) {
  dataSaveWatch(filmDetails);
  if (window.location.pathname.includes('my-library')) {
    if (document.querySelector('.watched-btn').classList.contains('active')) {
      updateMoviesGalleryByStatus('watched', globalCurrentPage);
    } else {
      updateMoviesGalleryByStatus('queue', globalCurrentPage);
    }
  }

  updateMoviesGalleryByStatus('watch');

  disableBtn(target);
  enableBtn(document.querySelector('[button-add-queue]'));
  enableBtn(document.querySelector('[button-unselect]'));
}

function getLocalStorageData(key) {
  return localStorage.getItem(key);
}

function deserializeData(data) {
  let deserializedData;

  try {
    deserializedData = JSON.parse(data);
  } catch (err) {
    console.log('ERROR: ', err.message);
    console.log('ERROR CODE: ', err.code);
  }

  return deserializedData;
}

function getMovies(movieStatus) {
  return deserializeData(getLocalStorageData(movieStatus));
}

function disableBtn(btn) {
  btn.disabled = true;
  btn.classList.add('is-disabled');
}

function enableBtn(btn) {
  btn.disabled = false;
  btn.classList.remove('is-disabled');
}

window.loadNoPoster = function (img) {
  img.src = noPosterURL;
};

function createFilmModalMarkup(data) {
  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
  } = data;

  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return `
  <div class="film-modal">
    <button class="button-close" type="button" button-modal-close>
      <svg class="icon-close">
        <use href="${closeBtnIcon}#icon-close"></use>
      </svg>
    </button>
    <img
      class="film_image"
      src="${posterUrl}"
      alt="Film Image"
      onerror="loadNoPoster(this)"
    />
    <article>
      <div class="film_content">
        <h2 class="film_title">${title}</h2>

        <ul class="film-info">
          <li class="film-info_item">
            <p class="film-info_lable">Vote / Votes</p>

            <div class="film-vote">
              <span class="film-vote_lable film-vote_lable--orange"
                >${vote_average}</span
              >
              <span>/</span>
              <span class="film-vote_lable">${vote_count}</span>
            </div>
          </li>

          <li class="film-info_item">
            <p class="film-info_lable">Popularity</p>
            <span class="film-info_text">${popularity}</span>
          </li>

          <li class="film-info_item">
            <p class="film-info_lable">Original Title</p>
            <span class="film-info_text film-info_text--uppercase">
              ${original_title}
            </span>
          </li>

          <li class="film-info_item">
            <p class="film-info_lable">Genre</p>
            <span class="film-info_text"
              >${genres.map(genre => genre.name).join(', ')}</span
            >
          </li>
        </ul>

        <div class="film-description">
          <h3 class="film-description_title">About</h3>
          <p class="film-description_text">${overview}</p>
        </div>
      </div>

      <ul class="film-button">
        <li class="film-button_item" id="button-add-watch">
          <button
            class="film-button_primary"
            type="button"
            button-add-watch
          >
            Add to Watched
          </button>
        </li>

        <li class="film-button_item">
          <button class="film-button_primary" type="button" button-add-queue>
            Add to Queue
          </button>
        </li>
        <li class="film-button_item">
          <button class="film-button_primary" type="button" button-unselect>
            Unselect
          </button>
        </li>
      </ul>
    </article>
  </div>
`;
}

// ----- EVENT LISTENERS

refs.galleryWatchBox.addEventListener('click', onGalleryBoxClick);
refs.filmModal.addEventListener('click', onBackdropModalClick);
