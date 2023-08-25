import axios from "axios";
// import {fetchBreeds} from "./cat-api";
axios.defaults.headers.common["x-api-key"] = "live_6cHvPNYUXbm7yQZ53vVkKzqlyTfxjHtWMUPP8ndwWvLYQMQEFzrYA8knId3dmZ5E";
const refs = {
    container: document.querySelector(".cat-info"),
    select: document.querySelector(".breed-select")
}
function fetchBreeds() {
    const URL = 'https://api.thecatapi.com/v1';
    return axios
        .get(`${URL}/breeds`)
        .then(resp => {
            const markup = markupBrendsCats(resp);
            console.log(markup);
            refs.select.insertAdjacentElement("beforeend", markup);
        })
        .catch(error => {
            console.log("error", error);
        });
}

function markupBrendsCats(arr) {
     return arr.map(({ id, name }) => {
        return `<option  class="item-breed" value="${id}">${name}</option>`
    }).join('');
}
fetchBreeds();
