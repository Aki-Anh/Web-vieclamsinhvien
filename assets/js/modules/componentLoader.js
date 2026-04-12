// Component Loader Module
const ComponentLoader = {
    // Load external HTML component
    loadComponent: function(selector, url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(selector).innerHTML = data;
                if (callback) callback();
            })
            .catch(error => {
                console.error('Error loading component:', url, error);
            });
    },

    // Load login panel into header
    loadLoginPanel: function(headerSelector) {
        const header = document.querySelector(headerSelector);
        if (!header) return;

        // Create container for login panel if not exists
        let loginPanelContainer = header.querySelector('.login-panel-container');
        if (!loginPanelContainer) {
            loginPanelContainer = document.createElement('div');
            loginPanelContainer.className = 'login-panel-container';
            header.appendChild(loginPanelContainer);
        }

        // Load login panel component
        this.loadComponent('.login-panel-container', '../components/login-panel.html', () => {
            // Re-initialize login panel events
            if (typeof LoginPanel !== 'undefined' && LoginPanel.init) {
                LoginPanel.init();
            }
        });
    }
};
