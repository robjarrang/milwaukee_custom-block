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
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }

        const imagePosition = formData.imagePosition === 'right' ? 'rtl' : 'ltr';
        const buttonStyle = formData.showButton !== false ? '' : 'display: none;';

        return `
        <!-- START .story-1col -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #DB021D; width: 620px;">
            <tr>
                <td style="background-color: #000000; width: 20px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td class="color-bg-1" height="40" style="background-color: #DB021D; width: 20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="width: 20px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
                <td align="center" class="content-inner" style="background-color: #000000; width: 580px;" valign="middle">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" dir="${imagePosition}" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="center" class="block" dir="ltr" style="width: 290px;" valign="top">
                                <div>
                                    <a href="${formData.imageLink}" target="_blank" style="color: #ffffff;">
                                        <img align="top" alt="Milwaukee" class="fill no-hover" src="${formData.imageUrl}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="290">
                                    </a>
                                </div>
                            </td>
                            <td class="block" dir="ltr" style="width: 290px;" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" class="sect color-bg-1" style="background-color: #DB021D; width: 100%;">
                                    <tr>
                                        <td class="mobile-hide" height="40" style="margin: 0; padding: 20px; padding-bottom: 0; padding-left: 0; padding-right: 0; padding-top: 0;">&nbsp;</td>
                                    </tr>
                                </table>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;" valign="middle">
                                    <tr>
                                        <td style="padding: 20px;" valign="middle">
                                            <table border="0" cellpadding="0" cellspacing="0" class="sect" style="width: 100%;">
                                                <tr>
                                                    <td class="mobile-hide">
                                                        <div style="clear: both; display: block; font-size: 20px; height: 20px; line-height: 20px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="mobile-text-center" style="text-align: center;">
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
                                                    <td class="story-intro mobile-text-center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; text-align: center;">
                                                        ${formData.description}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style="clear: both; display: block; font-size: 16px; height: 16px; line-height: 16px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                                    </td>
                                                </tr>
                                                <tr style="${buttonStyle}">
                                                    <td>
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                                                            <tr>
                                                                <td align="center" class="block" style="width: 100%;" valign="top">
                                                                    <table border="0" cellpadding="0" cellspacing="0" class="button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px;">
                                                                        <tr>
                                                                            <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%; mso-text-raise: 6px;">
                                                                                <a href="${formData.buttonLink || '#'}" style="color: #ffffff; text-decoration: none;" target="_blank">${formData.buttonText}</a>
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
                        </tr>
                    </table>
                </td>
                <td style="background-color: #000000; width: 20px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td class="color-bg-1" height="40" style="background-color: #DB021D; width: 20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="width: 20px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- END .story-1col -->
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
