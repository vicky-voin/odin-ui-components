export class Carousel
{
    #content;
    #indicatorsContainer;
    #navigationLeft;
    #navigationRight;
    #itemTemplate;
    #indicatorTemplate;

    #images = [];
    #indicators = [];

    #cycleIntervalID;

    #currentItemIndex = 0;

    constructor(container)
    {
        this.container = container;
        this.#init();
    }

    #init() 
    {
        this.#content = this.container.querySelector('.carousel-content');
        this.#indicatorsContainer = this.container.querySelector('.carousel-indicators');
        this.#navigationLeft = this.container.querySelector('.carousel-navigation-left .carousel-navigation-button');
        this.#navigationRight = this.container.querySelector('.carousel-navigation-right .carousel-navigation-button');
        this.#itemTemplate = this.container.querySelector('template#carousel-item-template');
        this.#indicatorTemplate = this.container.querySelector('template#carousel-indicator-template');

        this.#navigationLeft.addEventListener('click', () => {
            this.#goToPrevious();
        });
        
        this.#navigationRight.addEventListener('click', () => {
            this.#goToNext();
        });

        this.restartAutoCycle();
    }

    addImage(imageURL)
    {
        const newItemInstance = this.#itemTemplate.content.cloneNode(true);
        const itemElement = newItemInstance.querySelector(".carousel-item");

        itemElement.src = imageURL;

        this.#images.push(itemElement);

        this.#content.appendChild(newItemInstance);

        this.#addIndicator();
    }

    #addIndicator()
    {
        const newIndicatorInstance = this.#indicatorTemplate.content.cloneNode(true);
        const indicatorElement = newIndicatorInstance.querySelector(".carousel-indicator");

        this.#indicators.push(indicatorElement);
        const newIndex = this.#indicators.length-1;

        this.#setIndicatorActive(indicatorElement, newIndex == this.#currentItemIndex);

        this.#indicatorsContainer.appendChild(newIndicatorInstance);
        
        const appendedIndicator = this.#indicatorsContainer.lastElementChild;
        appendedIndicator.addEventListener("click", () => {
            this.#goTo(newIndex);
        });
    }

    #setIndicatorActive(indicator, isActive)
    {
        indicator.classList.add('inactive');

        if(isActive)
        {
            indicator.classList.remove('inactive');
        }
    }

    restartAutoCycle()
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
        this.#goTo(this.#currentItemIndex - 1 < 0? this.#images.length - 1 : this.#currentItemIndex - 1);
    }

    #goTo(index)
    {
        this.restartAutoCycle();

        this.#currentItemIndex = index;

        let contentOffset = 0;

        for(var i = 0; i <= this.#images.length-1; i++)
        {
            if(i >= 1 && i <= index)
            {
                contentOffset -= this.#images[index].offsetWidth;
            }

            this.#setIndicatorActive(this.#indicators[i], i == index);
        }

        this.#content.style.left = contentOffset + "px";
    }
}