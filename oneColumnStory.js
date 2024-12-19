import moduleRegistry from './moduleRegistry.js';

const oneColumnStoryModule = {
    setup() {
        console.log('1 Column Story (Small) module setup');
    },

    getPlaceholderData() {
        return {
            imageUrl: 'https://fakeimg.pl/290x200/dddddd/ffffff',
            imageLink: 'https://milwaukeetool.eu/',
            imageAltText: 'Milwaukee Tool Product Image',
            title: 'Tempus euismod phasellus',
            description: 'Vestibulum condimentum tempus euismod. Phasellus ligula nibh, ornare at ligula a.',
            buttonText: 'Button title',
            buttonLink: 'https://milwaukeetool.eu/',
            backgroundColor: 'red',
            imagePosition: 'left',
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left'
        };
    },

    updateHtml(html, formData) {
        console.log('Updating 1 Column Story HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        const backgroundColor = formData.backgroundColor === 'red' ? '#DB011C' : '#000000';
        const imageFirst = formData.imagePosition === 'left';
        const titleAlignmentDesktopClass = `desktop-text-${formData.titleAlignmentDesktop}`;
        const titleAlignmentMobileClass = `mobile-text-${formData.titleAlignmentMobile}`;
        const descriptionAlignmentDesktopClass = `desktop-text-${formData.descriptionAlignmentDesktop}`;
        const descriptionAlignmentMobileClass = `mobile-text-${formData.descriptionAlignmentMobile}`;

        return `
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: ${backgroundColor}; width: 620px;">
            <tr>
                <td class="side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="content-inner" style="width: 580px;" valign="middle">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            ${imageFirst ? this.getImageColumn(formData) : this.getContentColumn(formData, titleAlignmentDesktopClass, titleAlignmentMobileClass, descriptionAlignmentDesktopClass, descriptionAlignmentMobileClass)}
                            ${imageFirst ? this.getContentColumn(formData, titleAlignmentDesktopClass, titleAlignmentMobileClass, descriptionAlignmentDesktopClass, descriptionAlignmentMobileClass) : this.getImageColumn(formData)}
                        </tr>
                    </table>
                </td>
                <td class="side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        `;
    },

    getImageColumn(formData) {
        return `
        <td class="block" style="width: 290px;" valign="middle">
            <div>
                <a href="${formData.imageLink}" target="_blank" style="color: #ffffff;">
                    <img align="top" alt="${formData.imageAltText}" class="fill no-hover" src="${formData.imageUrl}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="290">
                </a>
            </div>
        </td>
        `;
    },

    getContentColumn(formData, titleAlignmentDesktopClass, titleAlignmentMobileClass, descriptionAlignmentDesktopClass, descriptionAlignmentMobileClass) {
        return `
        <td class="block" style="width: 290px;" valign="middle">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                <tr>
                    <td style="padding: 20px;" valign="middle">
                        <table border="0" cellpadding="0" cellspacing="0" class="sect" style="width: 100%;">
                            <tr>
                                <td class="${titleAlignmentDesktopClass} ${titleAlignmentMobileClass}" style="text-align: ${formData.titleAlignmentDesktop};">
                                    <h3 style="color: #ffffff; font-family: 'HelveticaNeue-CondensedBold', Arial, sans-serif, 'Open-Sans'; font-size: 28px; font-stretch: condensed; font-weight: bold; line-height: 32px; margin: 0; margin-bottom: 0; margin-top: 0; text-transform: uppercase;">
                                        ${formData.title}
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="clear: both; display: block; font-size: 4px; height: 4px; line-height: 4px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="story-intro ${descriptionAlignmentDesktopClass} ${descriptionAlignmentMobileClass}" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; text-align: ${formData.descriptionAlignmentDesktop};">
                                    ${formData.description}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="clear: both; display: block; font-size: 16px; height: 16px; line-height: 16px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                                        <tr>
                                            <td align="center" class="block" style="width: 100%;" valign="top">
                                                <table border="0" cellpadding="0" cellspacing="0" class="button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px; mso-text-raise: 6px;">
                                                    <tr>
                                                        <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%;">
                                                            <a href="${formData.buttonLink}" style="color: #ffffff; text-decoration: none;" target="_blank">${formData.buttonText}</a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
        `;
    },

    populateForm(formData) {
        console.log('Populating One Column Story form with data:', formData);
        document.getElementById('oneColumnImageUrl').value = formData.imageUrl || '';
        document.getElementById('oneColumnImageLink').value = formData.imageLink || '';
        document.getElementById('oneColumnImageAltText').value = formData.imageAltText || '';
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

        const setAlignmentIfExists = (id, value) => {
            const button = document.querySelector(`#${id} .alignment-button[data-alignment="${value}"]`);
            if (button) {
                button.classList.add('active');
            } else {
                console.warn(`Alignment button for ${id} with value ${value} not found`);
            }
        };

        setAlignmentIfExists('oneColumnTitleAlignmentDesktop', formData.titleAlignmentDesktop);
        setAlignmentIfExists('oneColumnTitleAlignmentMobile', formData.titleAlignmentMobile);
        setAlignmentIfExists('oneColumnDescriptionAlignmentDesktop', formData.descriptionAlignmentDesktop);
        setAlignmentIfExists('oneColumnDescriptionAlignmentMobile', formData.descriptionAlignmentMobile);
    },

    setupEventListeners(handleFormFieldChange) {
        ['oneColumnImageUrl', 'oneColumnImageLink', 'oneColumnImageAltText', 'oneColumnTitle', 'oneColumnButtonText', 'oneColumnButtonLink'].forEach(id => {
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
                    handleFormFieldChange('oneColumnStory', 'description', descriptionEditor.innerHTML);
                } else {
                    alert('Please enter a valid URL that starts with https://');
                }
            });
        }

        const editLinkButton = document.querySelector('#oneColumnStoryModule .rich-text-toolbar button[data-command="editLink"]');
        if (editLinkButton) {
            // Remove existing listeners to prevent duplicates
            editLinkButton.replaceWith(editLinkButton.cloneNode(true));
            const newEditLinkButton = document.querySelector('#oneColumnStoryModule .rich-text-toolbar button[data-command="editLink"]');
            newEditLinkButton.addEventListener('click', function() {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const anchor = range.startContainer.parentElement;
                    if (anchor && anchor.tagName === 'A') {
                        const url = prompt('Edit the URL', anchor.href);
                        if (url && url.startsWith('https://')) {
                            anchor.href = url;
                            handleFormFieldChange('oneColumnStory', 'description', descriptionEditor.innerHTML);
                        } else {
                            alert('Please enter a valid URL that starts with https://');
                        }
                    }
                }
            });
        }

        const removeLinkButton = document.querySelector('#oneColumnStoryModule .rich-text-toolbar button[data-command="removeLink"]');
        if (removeLinkButton) {
            // Remove existing listeners to prevent duplicates
            removeLinkButton.replaceWith(removeLinkButton.cloneNode(true));
            const newRemoveLinkButton = document.querySelector('#oneColumnStoryModule .rich-text-toolbar button[data-command="removeLink"]');
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
                        handleFormFieldChange('oneColumnStory', 'description', descriptionEditor.innerHTML);
                    }
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

        const titleSuperscriptButton = document.querySelector('#oneColumnStoryModule .rich-text-toolbar button[data-command="superscript"]');
        if (titleSuperscriptButton) {
            titleSuperscriptButton.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('oneColumnStory', 'title', document.getElementById('oneColumnTitle').value);
            });
        }

        const setupAlignmentButtonListeners = (id, field) => {
            const buttons = document.querySelectorAll(`#${id} .alignment-button`);
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const alignment = button.getAttribute('data-alignment');
                    handleFormFieldChange('oneColumnStory', field, alignment);
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        };

        setupAlignmentButtonListeners('oneColumnTitleAlignmentDesktop', 'titleAlignmentDesktop');
        setupAlignmentButtonListeners('oneColumnTitleAlignmentMobile', 'titleAlignmentMobile');
        setupAlignmentButtonListeners('oneColumnDescriptionAlignmentDesktop', 'descriptionAlignmentDesktop');
        setupAlignmentButtonListeners('oneColumnDescriptionAlignmentMobile', 'descriptionAlignmentMobile');
    }
};

moduleRegistry.register('oneColumnStory', oneColumnStoryModule);

export default oneColumnStoryModule;
