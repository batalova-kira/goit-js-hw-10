import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_6cHvPNYUXbm7yQZ53vVkKzqlyTfxjHtWMUPP8ndwWvLYQMQEFzrYA8knId3dmZ5E";

const URL = 'https://api.thecatapi.com/v1';


export function fetchBreeds() {
    return axios
        .get(`${URL}/breeds`)
        .then((response) => {
            if (!response.data) {
                 new Error(response.status);
            }
            else {
                 return response.data;
            }
       })
}

export function fetchCatByBreed(breedId) {
    return axios
        .get(`${URL}/images/search?breed_ids=${breedId}`)
        .then((response) => {
            if (!response.data) {
                new Error(response.status);
            }
            else {
                return response.data;
            }
        })
}