'use strict';
import axios from "axios";

export class TheMoviedbAPI {
    #BASE_URL = 'https://api.themoviedb.org/3/';
    #API_KEY = '933b4fa86956fa4d472b102b5087182d';
    constructor(keyword = null){

        this.page = 1;
        this.searchQuery = keyword;

    }

    async fetchTrendMovies(){
        const trendMovies = await axios.get(`${this.#BASE_URL}trending/movie/week`, {
            params: {
                api_key: this.#API_KEY,   
            }
        });

        await this.genresFromIdToName(trendMovies);
        
        return trendMovies;
    }


    async fetchSearchMovies(){
        const searchMovies = await axios.get(`${this.#BASE_URL}search/movie`, {
            params: {
                api_key: this.#API_KEY,
                query: this.searchQuery,
                language: 'en-US',
            }
        })

        await this.genresFromIdToName(searchMovies);

        return searchMovies;
    }

    async genresFromIdToName(movies){
        const genres = await axios.get(`${this.#BASE_URL}genre/movie/list`, {
            params: {
                api_key: this.#API_KEY,
            }
        });
        movies.data.results.forEach(movie => {
            const genresName = [];
            genres.data.genres.forEach(genreName => {
              movie.genre_ids.forEach(genreId => {
                if (genreId == genreName.id) {
                    genresName.push(genreName.name);
                }
              });
            });
            movie.genre_ids = genresName.slice(0,3);
          });


    }


}