import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { LoadSpinner } from './loading-spinner';
import galleryCardTemplate from '../templates/galleryCard.hbs';
const spinner = new LoadSpinner({
    selector: '.backdrop-spinner',
    hidden: true
});


export class PaginationHelper {
    constructor(paginationWrapper, markup, fetch){
        this.paginationWrapper = paginationWrapper,
        this.markup = markup,
        this.fetch = fetch
    }


    paginationTrend(total_results){
        new Pagination(this.paginationWrapper,{
        totalItems: total_results,
        itemsPerPage: 20,
        visiblePages: 5
    }).on('beforeMove', async (event) => {
        spinner.enable();
        try{
        this.fetch.page = event.page;
        const trendMovies = await this.fetch.fetchTrendMovies();
        spinner.disable();
        
        this.markup.innerHTML = galleryCardTemplate(trendMovies.data);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        } catch(err){
            console.log(err);
            spinner.enable();
        }
    
    });

    };

    paginationSearch(total_results){
        new Pagination(this.paginationWrapper,{
            totalItems: total_results,
            itemsPerPage: 20,
            visiblePages: 5
    }).on('beforeMove', async (event) => {
        spinner.enable();
        try{
        this.fetch.page = event.page;
        const searchMovie = await this.fetch.fetchSearchMovies();
        spinner.disable();
        this.markup.innerHTML = galleryCardTemplate(searchMovie.data);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        }catch(err){
            console.log(err);
            spinner.disable();
        }
    });
    };

}

