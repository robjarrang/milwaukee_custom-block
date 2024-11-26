import moduleRegistry from './moduleRegistry.js';
import introStoryModule from './introStory.js';
import oneColumnStoryModule from './oneColumnStory.js';
import leadStoryModule from './leadStory.js';
import fwImageModule from './fwImage.js';
import fwButtonModule from './fwButton.js';
import dividerModule from './divider.js';
import spacerModule from './spacer.js';
import twoColumnStoryModule from './twoColumnStory.js';
import threeColumnStoryModule from './threeColumnStory.js';
import gridModule from './grid.js';
import prizeEveryMonthModule from './prizeEveryMonth.js';
import fullWidthTitleModule from './fullWidthTitle.js';
import galleryModule from './gallery.js';
import checklistModule from './checklist.js';

import { getState, updateFormData, updateFullHtml, setInitialState, getFullHtml, resetFullHtml } from './centralDataStore.js';
import { debounce, logAction, logError, logWarning } from './utils.js';

(function() {
    let sdk;
    const DEFAULT_MODULE = 'leadStory';

    async function init() {
        console.log('Initialization started');
        try {
            await waitForSDK();
            sdk = initializeSDK();

            // Register modules
            moduleRegistry.register('introStory', introStoryModule);
            moduleRegistry.register('oneColumnStory', oneColumnStoryModule);
            moduleRegistry.register('leadStory', leadStoryModule);
            moduleRegistry.register('fwImage', fwImageModule);
            moduleRegistry.register('fwButton', fwButtonModule);
            moduleRegistry.register('divider', dividerModule);
            moduleRegistry.register('spacer', spacerModule);
            moduleRegistry.register('twoColumnStory', twoColumnStoryModule);
            moduleRegistry.register('threeColumnStory', threeColumnStoryModule);
            moduleRegistry.register('grid', gridModule);
            moduleRegistry.register('prizeEveryMonth', prizeEveryMonthModule);
            moduleRegistry.register('fullWidthTitle', fullWidthTitleModule);
            moduleRegistry.register('gallery', galleryModule);
            moduleRegistry.register('checklist', checklistModule);

            sdk.getData(function(data) {
                console.log('Initial SDK data:', data);
                initializeState(data);
                setupModules();
                setupEventListeners();
                handleModuleChange(getState().moduleType);
                console.log('Application fully initialized');
            });
        } catch (error) {
            logError('Failed to initialize the application:', error);
        }
    }

    function waitForSDK() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 20; // 10 seconds total
            const checkSDK = () => {
                attempts++;
                if (window.sfdc && window.sfdc.BlockSDK) {
                    console.log('SDK found');
                    resolve();
                } else if (attempts >= maxAttempts) {
                    console.error('SDK not found after maximum attempts');
                    reject(new Error('BlockSDK not loaded after 10 seconds'));
                } else {
                    console.log(`Waiting for SDK... Attempt ${attempts}`);
                    setTimeout(checkSDK, 500);
                }
            };
            checkSDK();
        });
    }

    function initializeSDK() {
        console.log('Initializing SDK...');
        const sdk = new window.sfdc.BlockSDK({
            name: 'Milwaukee Blocks',
            icon: 'icon.png',
            blockEditorWidth: 600,
            tabs: [
                'htmlblock'
            ]
        });
        console.log('SDK initialized:', sdk);
        return sdk;
    }

    function initializeState(data) {
        if (data && data.moduleType) {
            setInitialState({
                moduleType: data.moduleType,
                formData: data.formData || {},
                fullHtml: data.fullHtml || ''
            });
        } else {
            const initialModule = DEFAULT_MODULE;
            const module = moduleRegistry.get(initialModule);
            if (module && typeof module.getPlaceholderData === 'function') {
                const initialData = module.getPlaceholderData();
                const initialHtml = module.updateHtml('', initialData);
                setInitialState({
                    moduleType: initialModule,
                    formData: {
                        leadStory: leadStoryModule.getPlaceholderData(),
                        introStory: introStoryModule.getPlaceholderData(),
                        oneColumnStory: oneColumnStoryModule.getPlaceholderData(),
                        twoColumnStory: twoColumnStoryModule.getPlaceholderData(),
                        fwImage: fwImageModule.getPlaceholderData(),
                        fwButton: fwButtonModule.getPlaceholderData(),
                        divider: dividerModule.getPlaceholderData(),
                        spacer: spacerModule.getPlaceholderData()
                    },
                    fullHtml: initialHtml
                });
            } else {
                logError('Module or getPlaceholderData not found for', initialModule);
            }
        }
        console.log('State initialized:', getState());
    }

    function setupModules() {
        moduleRegistry.getAll().forEach(moduleName => {
            const module = moduleRegistry.get(moduleName);
            if (module && typeof module.setup === 'function') {
                module.setup();
            } else {
                logWarning(`Setup method not found for module: ${moduleName}`);
            }
        });
    }

    function handleModuleChange(newModuleType) {
        console.log(`Switching to ${newModuleType} module`);
        const state = getState();
    
        resetFullHtml();
        updateFormData({ moduleType: newModuleType });
    
        // Hide all modules
        moduleRegistry.getAll().forEach(moduleName => {
            const moduleElement = document.getElementById(`${moduleName}Module`);
            if (moduleElement) {
                moduleElement.style.display = 'none';
            }
        });
    
        // Show the selected module
        const selectedModuleElement = document.getElementById(`${newModuleType}Module`);
        if (selectedModuleElement) {
            selectedModuleElement.style.display = 'block';
        } else {
            console.error(`Module element not found for ${newModuleType}`);
        }
    
        const module = moduleRegistry.get(newModuleType);
        if (module) {
            const moduleData = state.formData[newModuleType] && Object.keys(state.formData[newModuleType]).length > 0
                ? state.formData[newModuleType]
                : module.getPlaceholderData();
    
            const newHtml = module.updateHtml('', moduleData);
            console.log(`Generated HTML for ${newModuleType}:`, newHtml);
    
            updateFormData({ [newModuleType]: moduleData });
            updateFullHtml(newHtml);
    
            // Ensure the form is populated after the DOM has been updated
            requestAnimationFrame(() => {
                setTimeout(() => {
                    module.populateForm(moduleData);
                    updateContent(false);
                    setupEventListeners(); // Re-setup event listeners after populating form
                }, 200);
            });
        } else {
            console.error(`Module not found: ${newModuleType}`);
        }
    }

    function updateContent(regenerateHtml = true) {
        console.log('updateContent called, regenerateHtml:', regenerateHtml);
        const state = getState();
        console.log('Current state:', state);

        if (regenerateHtml) {
            console.log('Updating HTML from form data for module:', state.moduleType);
            let currentHtml = getFullHtml();
            const module = moduleRegistry.get(state.moduleType);
            if (module && typeof module.updateHtml === 'function') {
                try {
                    const moduleFormData = state.formData[state.moduleType] || {};
                    currentHtml = module.updateHtml(currentHtml, moduleFormData);
                    console.log('Updated content:', currentHtml);
                    updateFullHtml(currentHtml);
                } catch (error) {
                    logError(`Error updating HTML for module ${state.moduleType}:`, error);
                }
            } else {
                logError(`updateHtml method not found for module: ${state.moduleType}`);
            }
        }

        const currentHtml = getFullHtml();
        sdk.setContent(currentHtml);
        sdk.setData({
            moduleType: state.moduleType,
            formData: state.formData,
            fullHtml: currentHtml
        });
    }

    function setupEventListeners() {
        console.log('Setting up event listeners...');
    
        const moduleSelector = document.getElementById('moduleSelector');
        if (moduleSelector) {
            moduleSelector.value = getState().moduleType; // Set the initial value
            moduleSelector.addEventListener('change', function(event) {
                handleModuleChange(event.target.value);
            });
        } else {
            logWarning('Module selector not found');
        }
    
        moduleRegistry.getAll().forEach(moduleName => {
            const module = moduleRegistry.get(moduleName);
            if (module && typeof module.setupEventListeners === 'function') {
                module.setupEventListeners(handleFormFieldChange);
            } else {
                logWarning(`setupEventListeners method not found for module: ${moduleName}`);
            }
        });

        setupRichTextEditors();
    
        console.log('Event listeners set up');
    }
    
    function handleFormFieldChange(moduleType, field, value) {
        console.log(`${moduleType} form field changed:`, field, value);
        const state = getState();
        const newData = { 
            ...state.formData[moduleType], 
            [field]: value 
        };
        console.log(`Updating ${moduleType} data:`, newData);
        updateFormData({ [moduleType]: newData });
    
        console.log('Updated state:', getState());
    
        if (state.moduleType === moduleType) {
            updateContent(true);
        }
    
        // Persist the data to the SDK
        sdk.setData({
            moduleType: state.moduleType,
            formData: getState().formData,
            fullHtml: getFullHtml()
        });
    }

    function setupRichTextEditors() {
        const editors = document.querySelectorAll('.rich-text-editor');
        editors.forEach(editor => {
            const toolbar = editor.previousElementSibling;
            if (toolbar && toolbar.classList.contains('rich-text-toolbar')) {
                toolbar.addEventListener('click', handleToolbarClick);
            }
            editor.addEventListener('input', handleEditorInput);
            editor.addEventListener('paste', handlePaste);
        });
    }

    function handleToolbarClick(event) {
        if (event.target.tagName === 'BUTTON') {
            event.preventDefault();
            const command = event.target.getAttribute('data-command');
            const editor = event.target.closest('.editor-container').querySelector('.rich-text-editor');
            document.execCommand(command, false, null);
            editor.focus();
        }
    }
    
    function handleEditorInput(event) {
        const editor = event.target;
        const moduleType = editor.closest('[id$="Module"]').id.replace('Module', '');
        const fieldName = editor.id;
        handleFormFieldChange(moduleType, fieldName, editor.innerHTML);
    }

    function handlePaste(event) {
        event.preventDefault();
        const text = (event.clipboardData || window.clipboardData).getData('text');
        document.execCommand('insertText', false, text);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();