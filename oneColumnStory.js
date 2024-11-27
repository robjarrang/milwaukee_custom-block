import moduleRegistry from './moduleRegistry.js';

const oneColumnStoryModule = {
    setup() {
        console.log('1 Column Story (Small) module setup');
    },

    getPlaceholderData() {
        return {
            imageUrl: 'https://fakeimg.pl/290x200/dddddd/ffffff',
            imageLink: 'https://milwaukeetool.eu/',
            title: 'Tempus euismod phasellus',
            description: 'Vestibulum condimentum tempus euismod. Phasellus ligula nibh, ornare at ligula a.',
            buttonText: 'Button title',
            buttonLink: 'https://milwaukeetool.eu/',
            backgroundColor: 'red',
            imagePosition: 'left'
        };
    },

    updateHtml(html, formData) {
        console.log('Updating 1 Column Story HTML with form data:', formData);
        if (!formData) {
            return html;
        }

        const backgroundColor = formData.backgroundColor === 'red' ? '#DB011C' : '#000000';
        const imageFirst = formData.imagePosition === 'left';

        // Build the HTML content using the formData
        const imageColumn = this.getImageColumn(formData);
        const contentColumn = this.getContentColumn(formData);

        const content = imageFirst
            ? `<tr>${imageColumn}${contentColumn}</tr>`
            : `<tr>${contentColumn}${imageColumn}</tr>`;

        // Create a mapping of placeholders to formData values
        const placeholderMap = {
            '{{content}}': content,
            '{{backgroundColor}}': backgroundColor,
        };

        // Replace placeholders with actual values, ensuring HTML content is preserved
        Object.keys(placeholderMap).forEach((placeholder) => {
            const value = placeholderMap[placeholder];
            html = html.split(placeholder).join(value);
        });

        return html;
    },

    getImageColumn(formData) {
        return `
        <td>
            <a href="${formData.imageLink || '#'}">
                <img src="${formData.imageUrl || ''}" alt="">
            </a>
        </td>
        `;
    },

    getContentColumn(formData) {
        return `
        <td>
            <h2>${formData.title || ''}</h2>
            <div>
                ${formData.description || ''}
            </div>
            ${formData.buttonText ? `<a href="${formData.buttonLink || '#'}">${formData.buttonText}</a>` : ''}
        </td>
        `;
    },

    populateForm(formData) {
        console.log('Populating One Column Story form with data:', formData);
        document.getElementById('oneColumnImageUrl').value = formData.imageUrl || '';
        document.getElementById('oneColumnImageLink').value = formData.imageLink || '';
        document.getElementById('oneColumnTitle').value = formData.title || '';
        const descriptionEditor = document.getElementById('oneColumnDescription');
        if (descriptionEditor) {
            descriptionEditor.innerHTML = formData.description || '';
        }
        document.getElementById('oneColumnButtonText').value = formData.buttonText || '';
        document.getElementById('oneColumnButtonLink').value = formData.buttonLink || '';

        const backgroundColorRadios = document.querySelectorAll('input[name="oneColumnBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            radio.checked = radio.value === formData.backgroundColor;
        });

        const imagePositionRadios = document.querySelectorAll('input[name="oneColumnImagePosition"]');
        imagePositionRadios.forEach(radio => {
            radio.checked = radio.value === formData.imagePosition;
        });
    },

    setupEventListeners(handleFormFieldChange) {
        ['oneColumnImageUrl', 'oneColumnImageLink', 'oneColumnTitle', 'oneColumnButtonText', 'oneColumnButtonLink'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function(event) {
                    const key = id.replace('oneColumn', '').toLowerCase();
                    handleFormFieldChange('oneColumnStory', key, event.target.value);
                });
            } else {
                console.warn(`Element with id ${id} not found`);
            }
        });

        const descriptionEditor = document.getElementById('oneColumnDescription');
        if (descriptionEditor) {
            descriptionEditor.addEventListener('input', function(event) {
                handleFormFieldChange('oneColumnStory', 'description', event.target.innerHTML);
            });
        }

        const superscriptButton = document.querySelector('#oneColumnStoryModule .rich-text-toolbar button[data-command="superscript"]');
        if (superscriptButton) {
            superscriptButton.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('oneColumnStory', 'description', descriptionEditor.innerHTML);
            });
        }

        const linkButton = document.querySelector('#oneColumnStoryModule .rich-text-toolbar button[data-command="link"]');
        if (linkButton) {
            // Remove existing listeners to prevent duplicates
            linkButton.replaceWith(linkButton.cloneNode(true));
            const newLinkButton = document.querySelector('#oneColumnStoryModule .rich-text-toolbar button[data-command="link"]');
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
                    handleFormFieldChange('oneColumnStory', 'description', descriptionEditor.innerHTML);
                }
            });
        }

        const backgroundColorRadios = document.querySelectorAll('input[name="oneColumnBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            radio.addEventListener('change', function(event) {
                handleFormFieldChange('oneColumnStory', 'backgroundColor', event.target.value);
            });
        });

        const imagePositionRadios = document.querySelectorAll('input[name="oneColumnImagePosition"]');
        imagePositionRadios.forEach(radio => {
            radio.addEventListener('change', function(event) {
                handleFormFieldChange('oneColumnStory', 'imagePosition', event.target.value);
            });
        });
    }
};

moduleRegistry.register('oneColumnStory', oneColumnStoryModule);

export default oneColumnStoryModule;