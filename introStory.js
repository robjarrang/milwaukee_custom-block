import moduleRegistry from './moduleRegistry.js';

const introStoryModule = {
    setup() {
        console.log('Intro Story module setup');
    },

    getPlaceholderData() {
        return {
            imageUrl: 'https://fakeimg.pl/290x290/dddddd/ffffff',
            imageLink: 'https://milwaukeetool.eu/',
            title: 'Tempus euismod phasellus',
            description: 'Vestibulum condimentum tempus euismod. Phasellus ligula nibh, ornare at ligula a.',
            buttonText: 'Button title',
            buttonLink: 'https://milwaukeetool.eu/',
            imagePosition: 'left',
            showButton: true
        };
    },

    updateHtml(html, formData) {
        console.log('Updating Intro Story HTML with form data:', formData);
        if (!formData) {
            return html;
        }

        // Set dynamic styles or classes if needed
        const imagePositionClass = formData.imagePosition === 'right' ? 'rtl' : 'ltr';
        const buttonStyle = formData.showButton !== false ? '' : 'display: none;';

        // Mapping placeholders to formData values
        const placeholderMap = {
            '{{introDescription}}': formData.introDescription || '',
            '{{introTitle}}': formData.introTitle || '',
            '{{imagePositionClass}}': imagePositionClass,
            '{{buttonStyle}}': buttonStyle,
            // Add other placeholders as needed
        };

        Object.keys(placeholderMap).forEach((placeholder) => {
            const value = placeholderMap[placeholder];
            html = html.split(placeholder).join(value);
        });

        return html;
    },

    populateForm(formData) {
        console.log('Populating Intro Story form with data:', formData);
        document.getElementById('introImageUrl').value = formData.imageUrl || '';
        document.getElementById('introImageLink').value = formData.imageLink || '';
        document.getElementById('introTitle').value = formData.title || '';
        const descriptionEditor = document.getElementById('introDescription');
        if (descriptionEditor) {
            descriptionEditor.innerHTML = formData.description || '';
        }
        document.getElementById('introButtonText').value = formData.buttonText || '';
        document.getElementById('introButtonLink').value = formData.buttonLink || '';
        
        const imagePositionRadios = document.querySelectorAll('input[name="introImagePosition"]');
        imagePositionRadios.forEach(radio => {
            radio.checked = radio.value === formData.imagePosition;
        });
        
        document.getElementById('introShowButton').checked = formData.showButton !== false;
    },

    setupEventListeners(handleFormFieldChange) {
        ['introImageUrl', 'introImageLink', 'introTitle', 'introButtonText', 'introButtonLink'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function(event) {
                    const key = id.replace('intro', '').toLowerCase();
                    handleFormFieldChange('introStory', key, event.target.value);
                });
            }
        });

        const descriptionEditor = document.getElementById('introDescription');
        if (descriptionEditor) {
            descriptionEditor.addEventListener('input', function(event) {
                handleFormFieldChange('introStory', 'description', event.target.innerHTML);
            });
        }

        const linkButton = document.querySelector('#introStoryModule .rich-text-toolbar button[data-command="link"]');
        if (linkButton) {
            // Remove existing listeners to prevent duplicates
            linkButton.replaceWith(linkButton.cloneNode(true));
            const newLinkButton = document.querySelector('#introStoryModule .rich-text-toolbar button[data-command="link"]');
            newLinkButton.addEventListener('click', function() {
                const url = prompt('Enter the URL');
                if (url) {
                    document.execCommand('createLink', false, url);
                    // Apply the style to the newly created link
                    const selection = window.getSelection();
                    if (selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        const anchor = range.startContainer.parentElement;
                        if (anchor && anchor.tagName === 'A') {
                            anchor.style.color = '#ffffff';
                            anchor.setAttribute('target', '_blank');
                        }
                    }
                    handleFormFieldChange('introStory', 'description', descriptionEditor.innerHTML);
                }
            });
        }

        const imagePositionRadios = document.querySelectorAll('input[name="introImagePosition"]');
        imagePositionRadios.forEach(radio => {
            radio.addEventListener('change', function(event) {
                handleFormFieldChange('introStory', 'imagePosition', event.target.value);
            });
        });

        const showButtonCheckbox = document.getElementById('introShowButton');
        if (showButtonCheckbox) {
            showButtonCheckbox.addEventListener('change', function(event) {
                handleFormFieldChange('introStory', 'showButton', event.target.checked);
            });
        }
    }
};

moduleRegistry.register('introStory', introStoryModule);

export default introStoryModule;