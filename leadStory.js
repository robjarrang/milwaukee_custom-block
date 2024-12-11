import moduleRegistry from './moduleRegistry.js';
import { logWarning, logError } from './utils.js';

const leadStoryModule = {
    setup() {
        console.log('Lead Story module setup');
    },

    getPlaceholderData() {
        return {
            imageUrl: 'https://fakeimg.pl/620x350/dddddd/ffffff',
            imageLink: 'https://milwaukeetool.eu/',
            leadTitle: 'Lorem ipsum dolor sit amet',
            leadDescription: 'Consectetur elit. Integer fermentum scelerisque urna, at lacinia purus sagittis non. Aenean nisl risus, consequat eu diam sit amet, consectetur pulvinar nisi. Nunc nec est non mi faucibus finibus.',
            buttonText: 'Button title',
            buttonLink: 'https://milwaukeetool.eu/',
            showButton: true,
            titleAlignment: 'left',
            descriptionAlignment: 'left'
        };
    },

    updateHtml(html, formData) {
        console.log('Updating Lead Story HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }

        const titleAlignmentClass = `mobile-text-${formData.titleAlignment}`;
        const descriptionAlignmentClass = `mobile-text-${formData.descriptionAlignment}`;

        return `
        <!-- START .fw-image -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #DB021D; width: 620px;">
            <tr>
                <td align="center" class="content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="center" class="block" style="width: 100%;" valign="top">
                                <div>
                                    <a href="${formData.imageLink || '#'}" target="_blank">
                                        <img align="top" alt="Milwaukee" class="fill no-hover" src="${formData.imageUrl || ''}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="620">
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- END .fw-image -->
        <!-- START .fw-lead -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #DB021D; width: 620px;">
            <tr>
                <td class="side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="content-inner" style="width: 580px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="left" class="block" style="width: 100%;">
                                <table border="0" cellpadding="0" cellspacing="0" class="sect" style="width: 100%;">
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 32px; height: 32px; line-height: 32px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="${titleAlignmentClass}" style="text-align: ${formData.titleAlignment};">
                                            <h1 style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 28px; font-weight: bold; line-height: 48px; margin: 0; margin-bottom: 0; margin-top: 0; padding-bottom: 0px !important; text-transform: uppercase;">
                                                ${formData.leadTitle}
                                            </h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 8px; height: 8px; line-height: 8px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="story-intro ${descriptionAlignmentClass}" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; text-align: ${formData.descriptionAlignment};">
                                            ${formData.leadDescription}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 20px; height: 20px; line-height: 20px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                    ${formData.showButton ? `
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                                                <tr>
                                                    <td align="center" class="block" style="width: 100%;" valign="middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" class="button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px;">
                                                            <tr>
                                                                <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%; mso-text-raise: 6px;">
                                                                    <a href="${formData.buttonLink}" style="color: #ffffff; text-decoration: none;" target="_blank">${formData.buttonText}</a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 32px; height: 32px; line-height: 32px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        <!-- END .fw-lead -->
        `;
    },

    populateForm(formData) {
        console.log('Populating Lead Story form with data:', formData);
        
        const setValueIfExists = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                console.log(`Setting ${id} to:`, value);
                element.value = value || '';
            } else {
                console.warn(`Element with id ${id} not found`);
            }
        };

        const setAlignmentIfExists = (id, value) => {
            const button = document.querySelector(`#${id} .alignment-button[data-alignment="${value}"]`);
            if (button) {
                button.classList.add('active');
            } else {
                console.warn(`Alignment button for ${id} with value ${value} not found`);
            }
        };

        setValueIfExists('imageUrl', formData.imageUrl);
        setValueIfExists('imageLink', formData.imageLink);
        setValueIfExists('leadTitle', formData.leadTitle);
        const leadDescriptionEditor = document.getElementById('leadDescription');
        if (leadDescriptionEditor) {
            console.log(`Setting leadDescription to:`, formData.leadDescription);
            leadDescriptionEditor.innerHTML = formData.leadDescription || '';
        } else {
            console.warn(`Element with id leadDescription not found`);
        }
        setValueIfExists('buttonText', formData.buttonText);
        setValueIfExists('buttonLink', formData.buttonLink);

        const showButtonElement = document.getElementById('showButton');
        if (showButtonElement) {
            showButtonElement.checked = formData.showButton;
        } else {
            console.warn(`Element with id showButton not found`);
        }

        setAlignmentIfExists('leadTitleAlignment', formData.titleAlignment);
        setAlignmentIfExists('leadDescriptionAlignment', formData.descriptionAlignment);
    },

    setupEventListeners(handleFormFieldChange) {
        ['imageUrl', 'imageLink', 'leadTitle', 'leadDescription', 'buttonText', 'buttonLink'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                console.log(`Setting up event listener for ${id}`);
                if (id === 'leadDescription') {
                    element.addEventListener('input', function(event) {
                        console.log(`${id} changed:`, event.target.innerHTML);
                        handleFormFieldChange('leadStory', 'leadDescription', event.target.innerHTML);
                    });
                } else {
                    element.addEventListener('input', function(event) {
                        console.log(`${id} changed:`, event.target.value);
                        handleFormFieldChange('leadStory', id, event.target.value);
                    });
                }
            } else {
                console.warn(`Element with id ${id} not found`);
            }
        });

        const element = document.getElementById('showButton');
        if (element) {
            console.log(`Setting up event listener for showButton`);
            element.addEventListener('change', function(event) {
                console.log(`showButton changed:`, event.target.checked);
                handleFormFieldChange('leadStory', 'showButton', event.target.checked);
            });
        } else {
            console.warn(`Element with id showButton not found`);
        }

        const setupAlignmentButtonListeners = (id, field) => {
            const buttons = document.querySelectorAll(`#${id} .alignment-button`);
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const alignment = button.getAttribute('data-alignment');
                    handleFormFieldChange('leadStory', field, alignment);
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        };

        setupAlignmentButtonListeners('leadTitleAlignment', 'titleAlignment');

        // Reference the Lead Description Editor
        const leadDescriptionEditor = document.getElementById('leadDescription');

        // Attach event listener to the link button in leadStoryModule
        const linkButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="link"]');
        if (linkButton) {
            // Remove existing listeners to prevent duplicates
            linkButton.replaceWith(linkButton.cloneNode(true));
            const newLinkButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="link"]');
            newLinkButton.addEventListener('click', function() {
                const url = prompt('Enter the URL');
                if (url && url.startsWith('https://')) {
                    document.execCommand('createLink', false, url);
                    // Apply the desired styles to the new link
                    const selection = window.getSelection();
                    if (selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        const anchor = range.startContainer.parentElement;
                        if (anchor && anchor.tagName === 'A') {
                            anchor.style.color = '#ffffff'; // Apply white color
                            anchor.setAttribute('target', '_blank'); // Open link in new tab
                        }
                    }
                    // Update the form field with the new HTML content
                    if (leadDescriptionEditor) {
                        handleFormFieldChange('leadStory', 'leadDescription', leadDescriptionEditor.innerHTML);
                    }
                } else {
                    alert('Please enter a valid URL that starts with https://');
                }
            });
        }

        // Attach event listener to the edit link button in leadStoryModule
        const editLinkButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="editLink"]');
        if (editLinkButton) {
            // Remove existing listeners to prevent duplicates
            editLinkButton.replaceWith(editLinkButton.cloneNode(true));
            const newEditLinkButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="editLink"]');
            newEditLinkButton.addEventListener('click', function() {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const anchor = range.startContainer.parentElement;
                    if (anchor && anchor.tagName === 'A') {
                        const url = prompt('Edit the URL', anchor.href);
                        if (url && url.startsWith('https://')) {
                            anchor.href = url;
                            handleFormFieldChange('leadStory', 'leadDescription', leadDescriptionEditor.innerHTML);
                        } else {
                            alert('Please enter a valid URL that starts with https://');
                        }
                    }
                }
            });
        }

        // Attach event listener to the remove link button in leadStoryModule
        const removeLinkButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="removeLink"]');
        if (removeLinkButton) {
            // Remove existing listeners to prevent duplicates
            removeLinkButton.replaceWith(removeLinkButton.cloneNode(true));
            const newRemoveLinkButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="removeLink"]');
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
                        handleFormFieldChange('leadStory', 'leadDescription', leadDescriptionEditor.innerHTML);
                    }
                }
            });
        }

        // Attach event listener to the superscript button in leadStoryModule
        const superscriptButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="superscript"]');
        if (superscriptButton) {
            superscriptButton.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('leadStory', 'leadDescription', leadDescriptionEditor.innerHTML);
            });
        }

        // Attach event listeners to the alignment buttons in the rich text editor toolbar
        const alignLeftButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="align-left"]');
        const alignCenterButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="align-center"]');
        const alignRightButton = document.querySelector('#leadStoryModule .rich-text-toolbar button[data-command="align-right"]');

        if (alignLeftButton) {
            alignLeftButton.addEventListener('click', function() {
                document.execCommand('justifyLeft');
                handleFormFieldChange('leadStory', 'descriptionAlignment', 'left');
            });
        }

        if (alignCenterButton) {
            alignCenterButton.addEventListener('click', function() {
                document.execCommand('justifyCenter');
                handleFormFieldChange('leadStory', 'descriptionAlignment', 'center');
            });
        }

        if (alignRightButton) {
            alignRightButton.addEventListener('click', function() {
                document.execCommand('justifyRight');
                handleFormFieldChange('leadStory', 'descriptionAlignment', 'right');
            });
        }
    }
};

moduleRegistry.register('leadStory', leadStoryModule);

export default leadStoryModule;
