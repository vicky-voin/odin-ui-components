import { ComponentLoader } from './component-loader.js';

document.addEventListener('DOMContentLoaded', async () => {

    const dropdownContainer = document.querySelector('.dropdown-test');
    const dropdown = await ComponentLoader.loadComponent('dropdown', dropdownContainer);

    dropdown.createOptions(["Option 1", "Option 2", "Option 3"], 0);
    
    const carouselContainer = document.querySelector('.carousel-test');
    await ComponentLoader.loadComponent('carousel', carouselContainer);
});