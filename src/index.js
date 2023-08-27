import './sass/index.scss';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchBreeds, fetchCatByBreed} from "./cat-api";
import 'slim-select/dist/slimselect.css';

const refs = {
    container: document.querySelector(".cat-info"),
    select: document.querySelector('select.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

refs.loader.classList.replace('loader', 'hidden');
refs.error.classList.add('hidden');
refs.container.classList.add('hidden');

refs.select.addEventListener('change', handlerSelect);

fetchBreeds()
    .then(markupBreedsCats)
    .catch(onFetchError);

function markupBreedsCats(arr) {
    const markup = arr.map(el => `<option value='${el.id}'>${el.name}</option>`).join('');
    refs.select.insertAdjacentHTML('beforeend', markup);
     new SlimSelect({
        select: '.breed-select'
    });
}

function onFetchError(error) {
    refs.select.classList.remove('hidden');
    refs.loader.classList.replace('loader', 'hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        borderRadius: '10px',
        timeout: 2000,
        
    });
};

function handlerSelect(e) {
    const breedId = e.currentTarget.value;
     refs.loader.classList.replace('hidden', 'loader');
    refs.select.classList.add('hidden');
    refs.container.classList.add('hidden');

    fetchCatByBreed(breedId) 
    .then(data => {
        const { url, breeds } = data[0];
        refs.container.innerHTML = `<div class="box"><div class="box-img"><img class="card-img" src="${url}" alt="${breeds[0].name}"/></div><div class="box-text"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div></div>`
        refs.container.classList.remove('hidden');
        refs.loader.classList.replace('loader', 'hidden');
        refs.select.classList.remove('hidden');
    })
        .catch(onFetchError);
    }
;

