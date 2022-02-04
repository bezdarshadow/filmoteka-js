'use strict';
import Notiflix from 'notiflix';
import { TheMoviedbAPI } from './themoviedb-api';
import { LoadSpinner } from './loading-spinner';
import { PaginationHelper } from './pagination';
import galleryCardTemplate from '../templates/galleryCard.hbs';


const paginationEl = document.querySelector('#pagination');
const galleryEl = document.querySelector('.gallery__list');
const searchFormEl = document.querySelector('#search-form')



const themoviedbApi = new TheMoviedbAPI;

const spinner = new LoadSpinner({
    selector: '.backdrop-spinner',
    hidden: true
});


searchFormEl.addEventListener('submit', onSearchFormSubmit)


renderTrendMovies();

async function renderTrendMovies(){
    spinner.enable();

    try{
        defaultSearchForForm();
        const trendMovies = await themoviedbApi.fetchTrendMovies();
        spinner.disable();
        
        galleryEl.innerHTML = galleryCardTemplate(trendMovies.data);
        const pagination = new PaginationHelper(paginationEl, galleryEl, themoviedbApi);
        pagination.paginationTrend(trendMovies.data.total_results);
    } catch(err){
        console.log(err);
        spinner.disable();
    }

}

async function onSearchFormSubmit(event){
    event.preventDefault();
    const keyword = event.currentTarget.elements['searchQuery'].value;
    if (keyword.trim() === '') {
        return;
    }
    spinner.enable();
    try{
        defaultSearchForForm(keyword);
        const searchMovie = await themoviedbApi.fetchSearchMovies();
        if(searchMovie.data.total_results === 0){
            throw new Error(err);
        }
        galleryCleaning();
        spinner.disable();
        galleryEl.innerHTML = galleryCardTemplate(searchMovie.data);

        const pagination = new PaginationHelper(paginationEl, galleryEl, themoviedbApi);
        pagination.paginationSearch(searchMovie.data.total_results);
    } catch(err){
        searchError();
        spinner.disable();
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

