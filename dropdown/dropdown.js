export class Dropdown
{
    #dropdownMenu;
    #dropdownValue;
    #dropdownArrow;
    #dropdownOptions;
    #template;

    #options = [];

    #optionsDefaultDisplay;

    constructor(container)
    {
        this.container = container;
        this.#init();
    }
    
    #init() {
        this.#dropdownMenu = this.container.querySelector('.dropdown-menu');
        this.#dropdownValue = this.container.querySelector('.dropdown-value');
        this.#dropdownArrow = this.container.querySelector('.dropdown-arrow');
        this.#dropdownOptions = this.container.querySelector('.dropdown-options');
        this.#template = this.container.querySelector('template#option-template');

        this.#optionsDefaultDisplay = this.#dropdownOptions.style.display;
        this.#dropdownOptions.style.display = "none";

        this.#dropdownMenu.addEventListener('click', () => {
            this.#toggleOptions();
        });
    }

    createOptions(options, selectedIndex)
    {
        for(let option of options)
        {
            this.#addOption(option);
        }

        this.#dropdownValue.textContent = options[selectedIndex];
    }

    #addOption(name)
    {
        const option = this.#template.content.cloneNode(true);
        const button = option.querySelector('.dropdown-option');
        button.textContent = name;

        button.addEventListener('click', () =>
        {
            this.#dropdownValue.textContent = button.textContent;
        });

        this.#dropdownOptions.appendChild(option);
        this.#options.push(button);
    }

    #toggleOptions()
    {
        this.#dropdownOptions.style.display = this.#dropdownOptions.style.display === this.#optionsDefaultDisplay?
        'none' : this.#optionsDefaultDisplay ;
    }
}