import axios from 'axios';
import ListItems from '../handlebars/modal.hbs';

const open = document.querySelector('.gallery__list');
const modal = document.querySelector('.backdropp');
const closeBt = document.querySelector('.modal__button_close');
const backdropp = document.querySelector('.backdropp');
const modalll = document.querySelector('.modal');

const API_KEY = '0d162b8d206fdcffbed55fe71207ad50';
const BASE_URL = 'https://api.themoviedb.org/3';

const ID_URL = `${BASE_URL}/movie/`;

open.addEventListener('click', openModall);
function openModall(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H3') {
    return;
  }
  modal.classList.remove('is-hiden');

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
}
function closeModall() {
  modal.classList.add('is-hiden');
  closeBt.removeEventListener('click', closeModall);
  document.body.removeEventListener('keydown', closeModallEsc);
  //   modal.remove(document.querySelector('.modal__container_right'));
  //   modal.remove(document.querySelector('.modal__container_left'));

  //   const rigtt = document.querySelector('.modal__container_right');
  //   const left = document.querySelector('.modal__container_left');
  //   const pr = document.querySelector('.proba');
  //   left.innerHTML = '';
  //   modalll.innerHTML = '';
  //   pr.innerHTML = '';
}
function closeModallEsc(e) {
  if (e.key === 'Escape') {
    return closeModall();
  }
}

// getMovieById(115036)

// async getMovieById(id) {
//     try {
//       const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);

//       const result = {
//         ...data,
//         year: createYear(data),
//         customGenres: createGenresFromID(data),
//       };
//         console.log(result);

//       return result;
//     } catch (error) {
//       console.error('Smth wrong with api ID fetch' + error);
//     }
// }

// console.log(data);

let idx = 1726;
// function getMovieById(id) {
//     try {
//         const  data  = axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
//         const result = {
//             ...data,
//         };
//         console.log(result);
//         // return result;
//     }
// }
// getMovieById(idx)
//   .try(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.log(err);
//   });

function getMovieById(id) {
  const data = axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
  data.then(resp => {
    // let reslut = resp.data.title;
    // console.log(resp);
    // return reslut;
  });
  //   console.log(data);
  return data;
}
