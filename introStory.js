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
            showButton: true,
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left'
        };
    },

    updateHtml(html, formData) {
        console.log('Updating Intro Story HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }

        const imagePosition = formData.imagePosition === 'right' ? 'rtl' : 'ltr';
        const buttonStyle = formData.showButton !== false ? '' : 'display: none;';
        const titleAlignmentDesktopClass = `desktop-text-${formData.titleAlignmentDesktop}`;
        const titleAlignmentMobileClass = `mobile-text-${formData.titleAlignmentMobile}`;
        const descriptionAlignmentDesktopClass = `desktop-text-${formData.descriptionAlignmentDesktop}`;
        const descriptionAlignmentMobileClass = `mobile-text-${formData.descriptionAlignmentMobile}`;

        return `
        <!-- START .intro-story -->
        <div class="intro-story" style="text-align: ${formData.titleAlignmentDesktop};">
            <h2 class="${titleAlignmentDesktopClass} ${titleAlignmentMobileClass}">${formData.title}</h2>
            <p class="${descriptionAlignmentDesktopClass} ${descriptionAlignmentMobileClass}">${formData.description}</p>
            ${formData.showButton ? `<a href="${formData.buttonLink}" style="text-align: ${formData.titleAlignmentDesktop};">${formData.buttonText}</a>` : ''}
        </div>
        <!-- END .intro-story -->
        `;
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
                if (url && url.startsWith('https://')) {
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
                } else {
                    alert('Please enter a valid URL that starts with https://');
                }
            });
        }

        const editLinkButton = document.querySelector('#introStoryModule .rich-text-toolbar button[data-command="editLink"]');
        if (editLinkButton) {
            // Remove existing listeners to prevent duplicates
            editLinkButton.replaceWith(editLinkButton.cloneNode(true));
            const newEditLinkButton = document.querySelector('#introStoryModule .rich-text-toolbar button[data-command="editLink"]');
            newEditLinkButton.addEventListener('click', function() {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const anchor = range.startContainer.parentElement;
                    if (anchor && anchor.tagName === 'A') {
                        const url = prompt('Edit the URL', anchor.href);
                        if (url && url.startsWith('https://')) {
                            anchor.href = url;
                            handleFormFieldChange('introStory', 'description', descriptionEditor.innerHTML);
                        } else {
                            alert('Please enter a valid URL that starts with https://');
                        }
                    }
                }
            });
        }

        const removeLinkButton = document.querySelector('#introStoryModule .rich-text-toolbar button[data-command="removeLink"]');
        if (removeLinkButton) {
            // Remove existing listeners to prevent duplicates
            removeLinkButton.replaceWith(removeLinkButton.cloneNode(true));
            const newRemoveLinkButton = document.querySelector('#introStoryModule .rich-text-toolbar button[data-command="removeLink"]');
            newRemoveLinkButton.addEventListener('click', function() {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const anchor = range.startContainer.parentElement;
                    if (anchor && anchor.tagName === 'A') {
                        const parent = anchor.parentNode;
                        while (anchor.firstChild) {
                            parent.insertBefore(anchor.firstChild, anchor);
                        }
                        parent.removeChild(anchor);
                        handleFormFieldChange('introStory', 'description', descriptionEditor.innerHTML);
                    }
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

        const superscriptButton = document.querySelector('#introStoryModule .rich-text-toolbar button[data-command="superscript"]');
        if (superscriptButton) {
            superscriptButton.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('introStory', 'description', descriptionEditor.innerHTML);
            });
        }
    }
};

moduleRegistry.register('introStory', introStoryModule);

export default introStoryModule;
