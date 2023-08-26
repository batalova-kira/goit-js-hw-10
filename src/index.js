import SlimSelect from 'slim-select';
import {fetchBreeds, fetchCatByBreed} from "./cat-api";
import 'slim-select/dist/slimselect.css';

const refs = {
    container: document.querySelector(".cat-info"),
    select: document.querySelector('select.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

fetchBreeds().then(markupBreedsCats);

function markupBreedsCats(arr) {
    const markup = arr.map(el => `<option value='${el.id}'>${el.name}</option>`).join('');
    refs.select.insertAdjacentHTML('beforeend', markup);
     new SlimSelect({
        select: '.breed-select'
    });
}

refs.select.addEventListener('change', handlerSelect);

function handlerSelect(e) {
    const breedId = e.currentTarget.value;
    fetchCatByBreed(breedId) 
    .then(data => {
        const { url, breeds } = data[0];
        refs.container.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        refs.container.classList.remove('is-hidden');
    })
        .catch(error => {
            console.log("error", error);
        });
    }
;