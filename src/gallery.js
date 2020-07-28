"use strict"
import galleryTemplate from './templates/gallery.hbs';
import service from './apiService';
import * as basicLightbox from 'basiclightbox';

const res = {
  search: document.getElementById('search-form'),
  more: document.getElementById('show-more'),
  gallery: document.querySelector('.gallery')
};

const buildGallery = function (imageArray) {
  const galleryCode = imageArray.reduce((code, elem) => code + galleryTemplate(elem), '');
  res.gallery.insertAdjacentHTML('beforeend', galleryCode);
};

const clearGallery = function () {
  res.gallery.innerHTML = '';
}

const handleNewRequest = function (event) {
  event.preventDefault();
  clearGallery();
  const request = res.search[0].value;
  service.searchImage(request).then(data => {
    buildGallery(data.hits)
  });
};

const scrollGallery = function (dest) {
  window.scrollTo({
    top: dest,
    behavior: 'smooth'
  })
}

const handleMoreRequest = function (event) {
  event.preventDefault();
  const scrollDist = res.gallery.scrollHeight + res.gallery.offsetTop;
  service.showMore().then(data => {
    buildGallery(data.hits);
    setTimeout(scrollGallery, 1000, scrollDist);
  });
};

function showLargeImage(event) {
  const imageURL = event.target.dataset.large;
  const largeImage = basicLightbox.create(`<img src=${imageURL}>`);
  largeImage.show();
}

res.search.addEventListener('submit', handleNewRequest);
res.more.addEventListener('click', handleMoreRequest);
res.gallery.addEventListener('click', showLargeImage);