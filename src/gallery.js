"use strict"
import galleryTemplate from './templates/gallery.hbs';
import {searchImage} from './search';

const res = {
  search: document.getElementById('search-form'),
  more: document.getElementById('show-more'),
  gallery: document.querySelector('.gallery')
};

const buildGallery = function (imageArray) {
  const galleryCode = imageArray.reduce((code, elem) => code + galleryTemplate(elem), '');
  res.gallery.insertAdjacentHTML('beforeend', galleryCode);
};

const clearGallery = function() {
  res.gallery.innerHTML='';
}

const handleNewRequest = function (event) {
  event.preventDefault();
  clearGallery();
  const request = res.search[0].value;
  searchImage(request).then(data => {
    console.log(data.hits[0]);
    buildGallery(data.hits)});
};

const handleShowMore = function (event) {};

res.search.addEventListener('submit', handleNewRequest);