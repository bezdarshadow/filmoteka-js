'use strict';

import { TheMoviedbAPI } from './themoviedb-api';
import modalCard from '../templates/modal.hbs';
import localStorageApi from './localstorage-functions';
const themoviedbApi = new TheMoviedbAPI;


const galleryEl = document.querySelector('.gallery__list');
const backdropEl = document.querySelector('.backdropp');
const movieInfoEl = document.querySelector('.modal__render');
const closeBtnEl = document.querySelector('.modal__button_close');





galleryEl.addEventListener('click', el => {
    if (el.target.nodeName === 'IMG') {
      const filmId = el.target.dataset.action;
      openModal(filmId);
    }
});



async function openModal(id){
    try{
        const idMovie = await themoviedbApi.fetchIdMovies(id);
        backdropEl.classList.remove('is-hiden')
        movieInfoEl.innerHTML = modalCard(idMovie.data);

        window.addEventListener('keydown', closeModalByEsc);
        closeBtnEl.addEventListener('click', closeModal);
        backdropEl.addEventListener('click', closeModalByClickOnBackdrop);

        
        const queueBtn = movieInfoEl.querySelector('.modal__button_queue');
        queueBtn.movie = idMovie.data;
        queueBtn.addEventListener('click', addToQueue)
        queueCheck(idMovie, queueBtn)

        const watchedBtn = movieInfoEl.querySelector('.modal__button_watch');
        watchedBtn.movie = idMovie.data;
        watchedBtn.addEventListener('click', addToWatched)
        watchedCheck(idMovie, watchedBtn)

    } catch(err){
        console.log(err)
    }
}


function closeModal(){
    backdropEl.classList.add('is-hiden');

    window.removeEventListener('keydown', closeModalByEsc);
    closeBtnEl.removeEventListener('click', closeModal);
    backdropEl.removeEventListener('click', closeModalByClickOnBackdrop);

}

function closeModalByEsc(event){
    if (event.code === 'Escape') {
        closeModal();
    }
}

function closeModalByClickOnBackdrop(event){
    if (!event.target.classList.contains('backdropp')) {
        return;
      }
      closeModal();
}

function addToWatched(event){
    let localStorageArray = [];
    const localStorageParsed = localStorageApi.load('watched');
    const movie = event.currentTarget.movie;
    const button = event.currentTarget;
    button.addEventListener('click', removeFromWatched);
    button.removeEventListener('click', addToWatched);
  
    if (!localStorageParsed) {
      localStorageArray.push(movie);
      localStorageApi.save('watched', localStorageArray);
      button.textContent = `Remove from watched`;
      return;
    }
  
    if (localStorageParsed.find(elem => elem.id === movie.id)) {
      return;
    }
  
    localStorageArray = localStorageParsed;
    localStorageArray.push(movie);
    localStorageApi.save('watched', localStorageArray);
    button.textContent = `Remove from watched`;
      
}

function watchedCheck(movieEl, button) {
    const localStorageArray = localStorageApi.load('watched');
  
    if (!localStorageArray) {
      return;
    }
  
    if (localStorageArray.find(elem => elem.id === movieEl.data.id)) {
      button.textContent = 'Remove from watched';
      button.addEventListener('click', removeFromWatched);
      button.removeEventListener('click', addToWatched);
  
      return;
    }
  }
  
  function removeFromWatched(event) {
    const localStorageParsed = localStorageApi.load('watched');
    const movie = event.currentTarget.movie;
    const button = event.currentTarget;
    button.addEventListener('click', addToWatched);
    button.removeEventListener('click', removeFromWatched);
  
    if (localStorageParsed.find(elem => elem.id === movie.id)) {
      button.textContent = 'Remove from watched';
      const index = localStorageParsed.findIndex(item => item.id === movie.id);
      localStorageParsed.splice(index, 1);
      localStorageApi.save('watched', localStorageParsed);
      button.textContent = 'Add to watched';
    }
  }



  function addToQueue(event){
    let localStorageArray = [];
    const localStorageParsed = localStorageApi.load('queue');
    const movie = event.currentTarget.movie;
    const button = event.currentTarget;
    button.addEventListener('click', removeFromQueue);
    button.removeEventListener('click', addToQueue);
  
    if (!localStorageParsed) {
      localStorageArray.push(movie);
      localStorageApi.save('queue', localStorageArray);
      button.textContent = `Remove from queue`;
      return;
    }
  
    if (localStorageParsed.find(elem => elem.id === movie.id)) {
      return;
    }
  
    localStorageArray = localStorageParsed;
    localStorageArray.push(movie);
    localStorageApi.save('queue', localStorageArray);
    button.textContent = `Remove from queue`;
      
}

function queueCheck(movieEl, button) {
    const localStorageArray = localStorageApi.load('queue');
  
    if (!localStorageArray) {
      return;
    }
  
    if (localStorageArray.find(elem => elem.id === movieEl.data.id)) {
      button.textContent = 'Remove from queue';
      button.addEventListener('click', removeFromQueue);
      button.removeEventListener('click', addToQueue);
  
      return;
    }
  }
  
  function removeFromQueue(event) {
    const localStorageParsed = localStorageApi.load('queue');
    const movie = event.currentTarget.movie;
    const button = event.currentTarget;
    button.addEventListener('click', addToQueue);
    button.removeEventListener('click', removeFromQueue);
  
    if (localStorageParsed.find(elem => elem.id === movie.id)) {
      button.textContent = 'Remove from queue';
      const index = localStorageParsed.findIndex(item => item.id === movie.id);
      localStorageParsed.splice(index, 1);
      localStorageApi.save('queue', localStorageParsed);
      button.textContent = 'Add to queue';
    }
  }














