import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  incrementPage,
  resetPagination,
  setCurrentQuery,
} from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = searchInput.value.trim();

  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }

  setCurrentQuery(query);
  resetPagination();
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, 1);
    renderGallery(data.hits, data.totalHits, true);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  const currentPage = incrementPage();
  const query = searchInput.value.trim();

  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, currentPage);
    renderGallery(data.hits, data.totalHits);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('hidden');
  }
});
