'use strict';

import localStorageApi from './localstorage-functions';
import galleryCardTemplate from '../templates/galleryCardForLibrary.hbs';
import { LoadSpinner } from './loading-spinner';

const spinner = new LoadSpinner({
  selector: '.backdrop-spinner',
  hidden: true,
});



const galleryEl = document.querySelector('.gallery__list');
const watchedBtn = document.querySelector('.btn-watched');
const queueBtn = document.querySelector('.btn-queue');

queueBtn.addEventListener('click', renderQueue);

watchedBtn.addEventListener('click', renderWatched);

function renderQueue() {
    watchedBtn.classList.remove('is-active');
    queueBtn.classList.add('is-active');
    galleryEl.innerHTML = galleryCardTemplate(localStorageApi.load('queue'))
}

function renderWatched() {
    queueBtn.classList.remove('is-active');
    watchedBtn.classList.add('is-active');
    galleryEl.innerHTML = galleryCardTemplate(localStorageApi.load('watched'))
}


document.addEventListener('DOMContentLoaded', function (e) {
  setTimeout(function () {
    const myElement = document.querySelector('.btn-watched');
    myElement.classList.add('is-active'); 
    myElement.click(); 
  }, 0); 
});






 

