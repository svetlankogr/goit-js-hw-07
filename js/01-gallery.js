import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup();

gallery.addEventListener('click', onGalleryClick);

gallery.insertAdjacentHTML('afterbegin', galleryItemsMarkup);

function createGalleryItemsMarkup() {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `;
    })
    .join('');
}

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: instance => {
        document.addEventListener('keydown', event => {
          if (event.code === 'Escape') {
            instance.close();
          }
        });
      },
      onClose: instance => {
        document.removeEventListener('keydown', event => {
          if (event.code === 'Escape') {
            instance.close();
          }
        });
      },
    }
  );
  instance.show();
}
