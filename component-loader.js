// Generic component loader utility
export class ComponentLoader {
    static async loadComponent(name, container) {
        try {
            // Load HTML
            const htmlResponse = await fetch(`./${name}/${name}.html`);
            const html = await htmlResponse.text();
            
            // Load CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = `./${name}/${name}.css`;
            
            // Check if CSS is already loaded
            if (!document.querySelector(`link[href*="${name}.css"]`)) {
                document.head.appendChild(cssLink);
            }
            
            // Insert HTML
            container.innerHTML = html;
            
            // Load and initialize JavaScript
            const module = await import(`./${name}/${name}.js`);
            
            const ComponentClass = module[this.capitalize(name)];
            
            if (ComponentClass) {
                return new ComponentClass(container);
            } else {
                console.error(`Class ${this.capitalize(name)} not found in module`);
            }
            
        } catch (error) {
            console.error(`Error loading ${name} component:`, error);
        }
    }
    
    static capitalize(str) {
        // Convert kebab-case to PascalCase
        // e.g., "registration-form" becomes "RegistrationForm"
        return str.split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('');
    }
}
