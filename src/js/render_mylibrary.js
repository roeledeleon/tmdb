// ----- IMPORTS

import img from '../images/desktop/film-image-desktop.jpg';

// ----- DECLARATIONS

const refs = {
  galleryWatch: document.querySelector('.gallery_watch-box'),
  gallerySectionWatch: document.querySelector('.gallery_watch-block'),

  galleryQueue: document.querySelector('.gallery_queue-box'),
  gallerySectionQueue: document.querySelector('.gallery_queue-block'),

  pageMyLibrary: document.querySelector('.pagination-mylibrary_container'),
};

// ----- FUNCTIONS | renderMyLibraryWatched

export function renderMyLibraryWatched(userWatched) {
  if (!userWatched || userWatched.length === 0) {
    refs.pageMyLibrary.classList.add('is-hidden');
    refs.gallerySectionWatch.classList.remove('is-hidden');
    return (refs.galleryWatch.innerHTML = `<h1 style="font-size=80px">There are no added watched films</h1>`);
  }
  refs.galleryWatch.innerHTML = markupMovies(userWatched);
}

// ----- FUNCTIONS | renderMyLibraryQueue

export function renderMyLibraryQueue(userQueue) {
  if (!userQueue || userQueue.length === 0) {
    refs.pageMyLibrary.classList.add('is-hidden');
    refs.gallerySectionQueue.classList.remove('is-hidden');
    return (refs.galleryQueue.innerHTML = `<h1 style="font-size=80px">There are no added queue films</h1>`);
  }
  refs.galleryQueue.innerHTML = markupMovies(userQueue);
}

// ----- FUNCTIONS | getGenres

function getGenres(genres) {
  const movieGenres = genres.map(genre => genre.name);
  if (movieGenres.length > 2) {
    const removedGenres = movieGenres.splice(0, 2);
    removedGenres.push('Other');

    return removedGenres.join(', ');
  }
  return movieGenres.join(', ');
}

// ----- FUNCTIONS | markupMovies

function markupMovies(movies) {
  return movies
    .map(({ poster_path, title, genres, release_date, id, vote_average }) => {
      const date = new Date(release_date).getFullYear();
      if (poster_path) {
        return `
      <li class="card" id="${id}">
        <img class="card_img" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" />
        <div class="card_wrap">
        <p class="card_titel">
        ${title} <br />
          <span class="card_text">${getGenres(genres)} | ${date}</span>
        </p> <p class="cart_rating">${vote_average.toFixed(1)}</p> </div>
  </li>`;
      }
      return `
      <div class="card" id="${id}">
        <img class="card_img" src="${img}" alt="${title}" />
        <p class="card_titel">
        ${title} <br />
          <span class="card_text">${getGenres(genres)} | ${date}</span>
        </p> <p class="cart_rating">${vote_average.toFixed(1)}</p>
  </div>`;
    })
    .join('');
}
