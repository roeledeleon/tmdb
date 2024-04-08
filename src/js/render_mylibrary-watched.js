import { markupMovies } from './render_mylibrary-film-card';

const refs = {
  gallery: document.querySelector('.gallery_watch-block'),
  pageMyLibrary: document.querySelector('.pagination-mylibrary_container'),
};

export function renderMyLibraryWatched(userWatched) {
  if (!userWatched || userWatched.length === 0) {
    refs.pageMyLibrary.classList.add('is-hidden');
    refs.gallery.classList.remove('is-hidden');
    return (refs.gallery.innerHTML = `<h1 style="font-size=80px">There are no added watched films</h1>`);
  }
  refs.gallery.innerHTML = markupMovies(userWatched);
}
