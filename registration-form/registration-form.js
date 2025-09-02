export class RegistrationForm
{
    #form;
    #emailInput;
    #passwordInput;
    #repeatPasswordInput;
    #countrySelect;
    #postalCodeInput;
    #submitButton;

    #postalCodesPatterns = [
        {
            pattern: "^[ABCEGHJ-NPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z][ -]?\\d[ABCEGHJ-NPRSTV-Z]\\d$",
            flags: "i",
            errorMessage: "Canadian postal code must follow format A0A 1B1"
        },
        {
            pattern: "^\\d{5}(-\\d{4})?$",
            flags: "",
            errorMessage: "United States postal code must follow format 12345 or 12345-6789"
        }
    ];

    constructor(container)
    {
        this.container = container;
        this.#init();
    }

    #init() 
    {
        this.#form = this.container.querySelector('.registration-form');
        this.#emailInput = this.container.querySelector('#email');
        this.#passwordInput = this.container.querySelector('#password');
        this.#repeatPasswordInput = this.container.querySelector('#repeat-password');
        this.#countrySelect = this.container.querySelector('#country');
        this.#postalCodeInput = this.container.querySelector('#postal-code');
        this.#submitButton = this.container.querySelector('input[type="submit"]');
    
        this.#emailInput.addEventListener('input', (e) => {
            this.#handleEmailInput(e);
        });
        
        this.#passwordInput.addEventListener('input', (e) => {
            this.#handlePasswordInput(e);
        });
        
        this.#repeatPasswordInput.addEventListener('input', (e) => {
            this.#handleRepeatPasswordInput(e);
        });
        
        this.#countrySelect.addEventListener('change', (e) => {
            this.#handleCountryChange(e);
        });
        
        this.#postalCodeInput.addEventListener('input', (e) => {
            this.#handlePostalCodeInput(e);
        });

        this.#submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            this.#handleEmailInput();
            this.#checkPasswords();
            this.#checkPostalCode();
            
            if (this.#form.reportValidity()) {
                this.#form.submit();
            } else {
                console.log('Form has validation errors');
            }
        })
        
    }
    
    #handleEmailInput(event) {
        if(this.#emailInput.validity.typeMismatch)
        {
            this.#emailInput.setCustomValidity("Enter a valid email!");
        }
        else
        {
            this.#emailInput.setCustomValidity("");
        }
        
        if (event) {
            this.#emailInput.reportValidity();
        }
    }
    
    #handlePasswordInput(event) {
        this.#checkPasswords();
    }
    
    #handleRepeatPasswordInput(event) {
        this.#checkPasswords();
    }
    
    #handleCountryChange(event) {
        this.#checkPostalCode();
    }
    
    #handlePostalCodeInput(event) {
        this.#checkPostalCode();
    }

    #checkPasswords()
    {
        if(this.#passwordInput.value != this.#repeatPasswordInput.value)
        {
            this.#passwordInput.setCustomValidity("The passwords must match!");
            this.#repeatPasswordInput.setCustomValidity("The passwords must match!");
        }
        else
        {
            this.#passwordInput.setCustomValidity("");
            this.#repeatPasswordInput.setCustomValidity("");
        }
    }

    #checkPostalCode()
    {
        const postalCodeInfo = this.#postalCodesPatterns[this.#countrySelect.selectedIndex];

        const regex = new RegExp(postalCodeInfo.pattern, postalCodeInfo.flags);
        if(regex.test(this.#postalCodeInput.value))
        {
            this.#postalCodeInput.setCustomValidity("");
        }
        else
        {
            this.#postalCodeInput.setCustomValidity(postalCodeInfo.errorMessage);
        }
        this.#postalCodeInput.reportValidity();
    }
}