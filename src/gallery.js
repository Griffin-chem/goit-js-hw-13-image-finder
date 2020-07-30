"use strict"
import galleryTemplate from './templates/gallery.hbs';
import service from './apiService';
import * as basicLightbox from 'basiclightbox';
import * as _ from 'lodash'
import {
  alert,
  error,
  Stack
} from '@pnotify/core'

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

const myStack = new Stack({
  dir1: 'left',
  firstpos1: 50,
  dir2: 'up',
  modal: false,
  context: document.querySelector('.gallery')
});

const errorOptions = {
  title: 'Error!',
  text: 'Something goes wrong! \n Please, try again later!',
  minHeight: '100px',
  delay: 1500,
  closer: false,
  sticker: false,
  width: '500px',
  stack: myStack
}

const alertOptions = {
  title: 'Alert!',
  text: 'No matches found! \n Please, try again later!',
  minHeight: '100px',
  delay: 1500,
  closer: false,
  sticker: false,
  width: '500px',
  stack: myStack
}

const handleNewRequest = function (event) {
  event.preventDefault();
  clearGallery();
  const request = res.search[0].value;
  service.searchImage(request).then(data => {
    if (data === 'err') {
      const mistake = error(errorOptions)
    } else if (data.hits.length === 0) {
      const message = alert(alertOptions)
    } else {
      buildGallery(data.hits)
    }
  });
};

const delayedRequest = _.debounce(handleNewRequest, 1000);

const scrollGallery = function (dest) {
  window.scrollTo({
    top: dest,
    behavior: 'smooth'
  })
};

const handleMoreRequest = function (event) {
  event.preventDefault();
  const scrollDist = res.gallery.scrollHeight + res.gallery.offsetTop;
  service.showMore().then(data => {
    if (data === 'err') {
      const mistake = error(errorOptions)
    } else if (data.hits.length === 0) {
      const message = alert(alertOptions)
    } else {
      buildGallery(data.hits)
    }
    setTimeout(scrollGallery, 1000, scrollDist);
  })
};

function showLargeImage(event) {
  const imageURL = event.target.dataset.large;
  const largeImage = basicLightbox.create(`<img src=${imageURL}>`);
  largeImage.show();
}

res.search.addEventListener('submit', handleNewRequest);
res.search.addEventListener('input', delayedRequest);
res.more.addEventListener('click', handleMoreRequest);
res.gallery.addEventListener('click', showLargeImage);
