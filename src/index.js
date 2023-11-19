import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const elements = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

elements.loader.classList.replace('loader', 'is-hidden');
elements.error.classList.add('is-hidden');
elements.divCatInfo.classList.add('is-hidden');

let arrBreedsId = [];

fetchBreeds()   
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: elements.selector,
        data: arrBreedsId
    });
    })
.catch(onFetchError);

elements.selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    elements.loader.classList.replace('is-hidden', 'loader');
    elements.divCatInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        elements.loader.classList.replace('loader', 'is-hidden');
        const { url, breeds } = data[0];
        
        elements.divCatInfo.innerHTML = `<div class="box-img">
        <img src="${url}" alt="${breeds[0].name}" width="400"/>
        </div>
        <div class="box"><h2>${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`

        elements.divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};

function onFetchError(error) {
    elements.loader.classList.replace('loader', 'is-hidden');
    iziToast.error({
                title: 'Error',
                position: 'center',
                message: 'Oops! Something went wrong! Try reloading the page or select another cat breed!',
            });

};