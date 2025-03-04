import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

export const renderGallery = async (images, total, reset = false) => {
  if (reset) {
    gallery.innerHTML = '';
    totalHits = total;
    currentPage = 1;
  }

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    loadMoreBtn.classList.add('hidden');
    return;
  }

  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="info">
        <p>Likes<span>${image.likes}</span></p>
        <p>Views <span>${image.views}</span></p>
        <p>Comments<span>${image.comments}</span></p>
        <p>Downloads<span>${image.downloads}</span></p>
      </div>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  await lightbox.refresh();

  if (gallery.children.length >= totalHits) {
    loadMoreBtn.classList.add('hidden');
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    loadMoreBtn.classList.remove('hidden');
  }

  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

export const resetPagination = () => {
  currentPage = 1;
};

export const incrementPage = () => {
  currentPage += 1;
};

export const getCurrentPage = () => currentPage;
export const setCurrentQuery = query => {
  currentQuery = query;
};
export const getCurrentQuery = () => currentQuery;
