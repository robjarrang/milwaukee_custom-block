const moduleRegistry = {
    modules: {},

    register: function(moduleName, moduleConfig) {
        // Validate required module methods
        const requiredMethods = ['setup', 'getPlaceholderData', 'updateHtml', 'populateForm', 'setupEventListeners'];
        const missingMethods = requiredMethods.filter(method => !moduleConfig[method]);
        
        if (missingMethods.length > 0) {
            console.warn(`Module ${moduleName} is missing required methods: ${missingMethods.join(', ')}`);
        }
        
        this.modules[moduleName] = moduleConfig;
    },

    get: function(moduleName) {
        return this.modules[moduleName];
    },

    getAll: function() {
        return Object.keys(this.modules);
    }
};

export default moduleRegistry;