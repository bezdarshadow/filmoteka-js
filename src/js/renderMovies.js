'use strict';
import Notiflix from 'notiflix';
import { TheMoviedbAPI } from './themoviedb-api';
import galleryCardTemplate from '../templates/galleryCard.hbs';

const galleryEl = document.querySelector('.gallery__list');
const searchFormEl = document.querySelector('#search-form')


const themoviedbApi = new TheMoviedbAPI;


searchFormEl.addEventListener('submit', onSearchFormSubmit)


renderTrendMovies();

async function renderTrendMovies(){
    const trendMovies = await themoviedbApi.fetchTrendMovies();

    galleryEl.innerHTML = galleryCardTemplate(trendMovies.data);
}

async function onSearchFormSubmit(event){
    event.preventDefault();

    const keyword = event.currentTarget.elements['searchQuery'].value;

    if (keyword.trim() === '') {
        return;
    }
    

    try{
        defaultSearchForForm(keyword);
        const searchMovie = await themoviedbApi.fetchSearchMovies();
        if(searchMovie.data.total_results === 0){
            throw new Error(err);
        }
        galleryCleaning();
        galleryEl.innerHTML = galleryCardTemplate(searchMovie.data);

    } catch(err){
        searchError();
    }




}


function defaultSearchForForm (keyword) {
    themoviedbApi.page = 1;
    themoviedbApi.searchQuery = keyword;
  };

  function galleryCleaning (){
    galleryEl.innerHTML = '';
  };

  function searchError () {
    Notiflix.Notify.failure("Sorry, there are no movies matching your search query. Please try again.");
  };