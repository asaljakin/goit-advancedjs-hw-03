import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const elements = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

setVisible(elements.loader);

const slimSelect = new SlimSelect({
  select: elements.selector,
  settings: {
    placeholderText: 'Select breeds',
  },
});

let arrBreedsId = [];

fetchBreeds()   
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    slimSelect.setData([{ placeholder: true, text: '' }, ...arrBreedsId]);
    elements.selector.addEventListener('change', onSelectBreed);
    setVisible(elements.selector);
    setVisible(elements.loader, false);
    })
.catch(onFetchError);

function onSelectBreed(event) {
    setVisible(elements.selector, false);
    setVisible(elements.divCatInfo, false);
    setVisible(elements.loader);
    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
        const { url, breeds } = data[0];
            elements.divCatInfo.innerHTML = `<div class="box-img">
        <img src="${url}" alt="${breeds[0].name}" width="400"/>
        </div>
        <div class="box"><h2>${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;

        setVisible(elements.loader, false);
        setVisible(elements.selector);
        setVisible(elements.divCatInfo);
    })
    .catch(onFetchError);
};

function onFetchError(error) {
    // elements.loader.classList.replace('loader', 'is-hidden');
    // elements.selector.classList.remove('is-hidden');
    setVisible(elements.selector);
    setVisible(elements.loader, false);
    iziToast.error({
                title: 'Error',
                position: 'center',
                message: 'Oops! Something went wrong! Try reloading the page or select another cat breed!',
            });

};

function setVisible(el, isVisible = true) {
    el.classList.toggle('is-hidden', !isVisible);
}