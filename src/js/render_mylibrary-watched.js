// ----- IMPORTS

//import { markupMovies } from './render_mylibrary-film-card';
import img from '../images/foto.jpg';

// ----- DECLARATIONS

const refs = {
  gallery: document.querySelector('.gallery_watch-box'),
  gallerySection: document.querySelector('.gallery_watch-block'),
  pageMyLibrary: document.querySelector('.pagination-mylibrary_container'),
};

// ----- FUNCTIONS | renderMyLibraryWatched

export function renderMyLibraryWatched(userWatched) {
  if (!userWatched || userWatched.length === 0) {
    refs.pageMyLibrary.classList.add('is-hidden');
    refs.gallerySection.classList.remove('is-hidden');
    return (refs.gallery.innerHTML = `<h1 style="font-size=80px">There are no added watched films</h1>`);
  }
  refs.gallery.innerHTML = markupMovies(userWatched);
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
        <img class="card__img" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" />
        <div class="card__wrap">
        <p class="card__titel">
        ${title} <br />
          <span class="card__text">${getGenres(genres)} | ${date}</span>
        </p> <p class="cart__rating">${vote_average.toFixed(1)}</p> </div>
  </li>`;
      }
      return `
      <div class="card" id="${id}">
        <img class="card__img" src="${img}" alt="${title}" />
        <p class="card__titel">
        ${title} <br />
          <span class="card__text">${getGenres(genres)} | ${date}</span>
        </p> <p class="cart__rating">${vote_average.toFixed(1)}</p>
  </div>`;
    })
    .join('');
}
