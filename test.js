import { ComponentLoader } from './component-loader.js';

document.addEventListener('DOMContentLoaded', async () => {

    const dropdownContainer = document.querySelector('.dropdown-test');
    const dropdown = await ComponentLoader.loadComponent('dropdown', dropdownContainer);

    dropdown.createOptions(["Option 1", "Option 2", "Option 3"], 0);

    const carouselContainer = document.querySelector('.carousel-test');
    const carousel = await ComponentLoader.loadComponent('carousel', carouselContainer);

    carousel.addImage("./beautiful-shot-big-green-leafed-trees-grassy-field.jpg");
    carousel.addImage("./green-grass-field-with-trees-daytime.jpg");
    carousel.addImage("./mountains-with-cedar-forest.jpg");
});