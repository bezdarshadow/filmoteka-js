'use strict';
import Notiflix from 'notiflix';
import { TheMoviedbAPI } from './themoviedb-api';
import galleryCardTemplate from '../templates/galleryCard.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';


const galleryEl = document.querySelector('.gallery__list');
const searchFormEl = document.querySelector('#search-form')
const paginationEl=document.querySelector(".tui-pagination")


const themoviedbApi = new TheMoviedbAPI;


searchFormEl.addEventListener('submit', onSearchFormSubmit)


renderTrendMovies();

export async function renderTrendMovies(){
    const trendMovies = await themoviedbApi.fetchTrendMovies();

    galleryEl.innerHTML = galleryCardTemplate(trendMovies.data);
}

export async function onSearchFormSubmit(event){
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
        const paginationpoisk= new Pagination(paginationEl,{
            totalItems: 1000,
            itemsPerPage: 40,
            visiblePages: 9
        })
         paginationpoisk.on('beforeMove',   async (event) => {
            themoviedbApi.page=event.page
            const searchMovie = await themoviedbApi.fetchSearchMovies()
            galleryEl.innerHTML=galleryCardTemplate(searchMovie.data);
            //  galleryEl.innerHTML = " ";
            // console.log(themoviedbApi.page);
            // console.log(galleryEl);
            // console.log(galleryCardTemplate);
            // galleryEl.innerHTML=galleryCardTemplate(searchMovie.data);
        });

    } catch(err){
        searchError();
    }
    
}


export function defaultSearchForForm (keyword, numberPage) {
    themoviedbApi.page = numberPage;
    themoviedbApi.searchQuery = keyword;
  };

  function galleryCleaning (){
    galleryEl.innerHTML = '';
  };

  function searchError () {
    Notiflix.Notify.failure("Sorry, there are no movies matching your search query. Please try again.");
  };