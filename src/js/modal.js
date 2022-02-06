'use strict';
import axios from 'axios';
import ListItems from '../handlebars/modal.hbs';
const open = document.querySelector('.gallery__list');
const modal = document.querySelector('.backdropp');
const closeBt = document.querySelector('.modal__button_close');
const backdropp = document.querySelector('.backdropp');
const modalll = document.querySelector('.modal__render');
const API_KEY = '0d162b8d206fdcffbed55fe71207ad50';
const BASE_URL = 'https://api.themoviedb.org/3';

let arr = [];
losos();
function losos() {
  if (localStorage.getItem('id') == null) {
    // console.log(1);
    return;
  } else {
    let ididid = localStorage.getItem('id');
    arr = ididid.split(',');
  }
}
let arrSec = [];
lososSec();
function lososSec() {
  if (localStorage.getItem('id2') == null) {
    // console.log(1);
    return;
  } else {
    let ididid = localStorage.getItem('id2');
    arrSec = ididid.split(',');
  }
}

const ID_URL = `${BASE_URL}/movie/`;
let idx = null;
open.addEventListener('click', openModall);
function openModall(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H3') {
    return;
  }
  modal.classList.remove('is-hiden');

  idx = e.target.dataset.action;

  getMovieById(idx)
    .then(response => {
      //   console.log(response.data);
      const title = response.data.title;
      const [genre] = response.data.genres;
      const genres = genre.name;
      const popularity = response.data.popularity;
      const vote = response.data.vote_average;
      const votes = response.data.vote_count;
      const original = response.data.original_title;
      const about = response.data.overview;
      const img = response.data.poster_path;
      const [com] = response.data.production_companies;
      const comp = com.logo_path;
      //   const id = response.data.id;

      modalll.insertAdjacentHTML(
        'beforeend',
        ListItems({
          // id,
          title,
          vote,
          img,
          comp,
          about,
          votes,
          genres,
          popularity,
          original,
        }),
      );
    })
    .catch(err => {
      console.log(err);
    });

  closeBt.addEventListener('click', closeModall);
  document.body.addEventListener('keydown', closeModallEsc);

  backdropp.addEventListener('click', event => {
    if (event.target === backdropp) {
      return closeModall();
    }
  });

  setTimeout(() => {
    const knopka = document.querySelector('.modal__button_watch');
    for (let i = 0; i <= arr.length; i += 1) {
      if (idx == arr[i]) {
        knopka.classList.add('activ');
      }
    }
    knopka.addEventListener('click', event => {
      for (let i = 0; i <= arr.length; i += 1) {
        console.log(arr);
        if (idx !== arr[i]) {
          knopka.classList.add('activ');
          arr.splice(0, 0, idx);
          //   console.log(arr);
          localStorage.setItem('id', arr);

          return;
        } else if (idx == arr[i]) {
          knopka.classList.remove('activ');
          delete arr[i];
          localStorage.setItem('id', arr);

          return;
        }
      }
    });
  }, 50);
  setTimeout(() => {
    const knopkaSecond = document.querySelector('.modal__button_queue');
    for (let i = 0; i <= arrSec.length; i += 1) {
      if (idx == arrSec[i]) {
        knopkaSecond.classList.add('activ');
      }
    }
    knopkaSecond.addEventListener('click', event => {
      for (let i = 0; i <= arrSec.length; i += 1) {
        //   console.log(arr);
        if (idx !== arrSec[i]) {
          arrSec.splice(0, 0, idx);
          // console.log(arr);
          localStorage.setItem('id2', arrSec);
          knopkaSecond.classList.add('activ');
        } else if (idx == arrSec[i]) {
          knopkaSecond.classList.remove('activ');
          delete arrSec[i];
          localStorage.setItem('id2', arr);

          return;
        }
      }
    });
  }, 50);
}

function closeModall() {
  modalll.innerHTML = '';
  modal.classList.add('is-hiden');
  closeBt.removeEventListener('click', closeModall);
  document.body.removeEventListener('keydown', closeModallEsc);
}
function closeModallEsc(e) {
  if (e.key === 'Escape') {
    return closeModall();
  }
}
function getMovieById(id) {
  const data = axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
  data.then(resp => {});

  return data;
}
