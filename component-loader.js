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
            }
            
        } catch (error) {
            console.error(`Error loading ${name} component:`, error);
        }
    }
    
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
