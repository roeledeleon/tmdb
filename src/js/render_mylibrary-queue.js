import { markupMovies } from './render_mylibrary-film-card';

const refs = {
  gallery: document.querySelector('.gallery_queue-block'),
  pageMyLibrary: document.querySelector('.pagination-mylibrary_container'),
};

export function renderMyLibraryQueue(userQueue) {
  console.log(userQueue);
  if (!userQueue || userQueue.length === 0) {
    refs.pageMyLibrary.classList.add('is-hidden');
    refs.gallery.classList.remove('is-hidden');
    return (refs.gallery.innerHTML = `<h1 style="font-size=80px">There are no added queue films</h1>`);
  }
  refs.gallery.innerHTML = markupMovies(userQueue);
}
