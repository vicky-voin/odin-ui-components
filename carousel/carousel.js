export class Carousel
{
    #carousel;
    #viewport;
    #content;
    #indicators;
    #navigation;
    #navigationLeft;
    #navigationRight;
    #itemTemplate;
    #indicatorTemplate;

    #images = [];

    #cycleIntervalID;

    #currentItemIndex = 0;

    constructor(container)
    {
        this.container = container;
        this.#init();
    }

    #init() 
    {
        this.#carousel = this.container.querySelector('.carousel');
        this.#viewport = this.container.querySelector('.carousel-viewport');
        this.#content = this.container.querySelector('.carousel-content');
        this.#indicators = this.container.querySelector('.carousel-indicators');
        this.#navigation = this.container.querySelector('.carousel-navigation');
        this.#navigationLeft = this.container.querySelector('.carousel-navigation-left');
        this.#navigationRight = this.container.querySelector('.carousel-navigation-right');
        this.#itemTemplate = this.container.querySelector('template#carousel-item-template');
        this.#indicatorTemplate = this.container.querySelector('template#carousel-indicator-template');

        this.startAutoCycle();
    }

    addImage(imageURL)
    {
        const newItemInstance = this.#itemTemplate.content.cloneNode(true);
        const itemElement = newItemInstance.querySelector(".carousel-item");

        itemElement.src = imageURL;

        this.#images.push(itemElement);

        this.#content.appendChild(newItemInstance);
    }

    startAutoCycle()
    {
        this.stopAutoCycle();

        this.#cycleIntervalID = setInterval(() => 
        {
            this.#goToNext();
        }, 5000);
    }

    stopAutoCycle()
    {
        clearInterval(this.#cycleIntervalID);
    }

    #goToNext()
    {
        this.#goTo(this.#currentItemIndex + 1 > this.#images.length - 1? 0 : this.#currentItemIndex + 1);
    }

    #goToPrevious()
    {
        this.#goTo(this.#currentItemIndex - 1 < 0? this.#images.length : this.#currentItemIndex - 1);
    }

    #goTo(index)
    {
        console.log("moving to " + index);
        this.#currentItemIndex = index;

        let contentOffset = 0;

        for(var i = 1; i <= index; i++)
        {
            contentOffset -= this.#images[index].offsetWidth;
        }

        this.#content.style.left = contentOffset + "px";
    }
}