'use strict';
import axios from 'axios';
import ListItems from '../handlebars/modal.hbs';
import libRend from '../handlebars/gallery.hbs';

const open = document.querySelector('.gallery__list');
const modal = document.querySelector('.backdropp');
const closeBt = document.querySelector('.modal__button_close');
const backdropp = document.querySelector('.backdropp');
const modalll = document.querySelector('.modal');
const libary = document.querySelector('.libaryDiv');

const API_KEY = '0d162b8d206fdcffbed55fe71207ad50';
const BASE_URL = 'https://api.themoviedb.org/3';

let arr = [];

function libaryRender() {
  //   const knopka = document.querySelector('.modal__button_watch');
  console.log('lox');
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
  //   console.dir(e);
  //   const danylo = document.querySelector('.film-card__image');

  idx = e.target.dataset.action;

  arr.splice(0, 0, idx);
  console.log(arr);
  localStorage.setItem('id', arr);
  //   console.log(danylo.dataset.action);

  getMovieById(idx)
    .then(response => {
      //   console.log(response.data.img);
      console.log(response.data);
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

      modalll.innerHTML = ListItems({
        title,
        vote,
        img,
        comp,
        about,
        votes,
        genres,
        popularity,
        original,
      });
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
    // libaryRender();
    knopka.addEventListener('click', event => {
      libaryRender();
    });
    console.log(knopka);
  }, 1000);
}

function closeModall() {
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
