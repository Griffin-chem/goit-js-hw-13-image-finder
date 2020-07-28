"use strict"

export default {
  page: 1,
  theme: '',
  searchImage: function (request) {
    this.theme = request;
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${request}&page=1&per_page=12&key=17444544-23cadc231d8229819c84cd722`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      .then(response => {
        if (response.status !== 200) {
          return response = []
        } else {
          return response.json()
        };
      });
  },

  showMore: function () {
    this.page = this.page + 1;
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.theme}&page=${this.page}&per_page=12&key=17444544-23cadc231d8229819c84cd722`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      .then(response => {
        if (response.status !== 200) {
          return response = []
        } else {
          return response.json()
        };
      });
  }
};
