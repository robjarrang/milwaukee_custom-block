import moduleRegistry from './moduleRegistry.js';

const oneColumnStoryModule = {
    setup() {
        console.log('1 Column Story module setup');
    },

    getPlaceholderData() {
        return {
            imageUrl: 'https://fakeimg.pl/400x400/dddddd/ffffff',
            imageLink: 'https://milwaukeetool.eu/',
            title: 'Single Column Story',
            description: 'This is a single column story description. Participate to learn more.',
            buttonText: 'Learn More',
            buttonLink: 'https://milwaukeetool.eu/learn',
            backgroundColor: 'red',
            imagePosition: 'left',
            showButton: true
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

        return `
        <!-- START .one-column-image -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #123456; width: 620px;">
            <tr>
                <td align="center" class="content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="center" class="block" style="width: 100%;" valign="top">
                                <div>
                                    <a href="${formData.imageLink || '#'}" target="_blank" style="color: #ffffff;">
                                        <img align="top" alt="1 Column Story" class="fill no-hover" src="${formData.imageUrl || ''}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="620">
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- END .one-column-image -->
        <!-- START .one-column-description -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #123456; width: 620px;">
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
                                        <td class="story-intro mobile-text-center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; text-align: left;">
                                            ${formData.description}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 32px; height: 32px; line-height: 32px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
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
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        <!-- END .one-column-description -->
        `;
    },

    getImageColumn(formData) {
        return `
        <td class="block" style="width: 290px;" valign="middle">
            <div>
                <a href="${formData.imageLink}" target="_blank" style="color: #ffffff;">
                    <img align="top" alt="Milwaukee" class="fill no-hover" src="${formData.imageUrl}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="290">
                </a>
            </div>
        </td>
        `;
    },

    getContentColumn(formData) {
        return `
        <td class="block" style="width: 290px;" valign="middle">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                <tr>
                    <td style="padding: 20px;" valign="middle">
                        <table border="0" cellpadding="0" cellspacing="0" class="sect" style="width: 100%;">
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
        console.log('Populating 1 Column Story form with data:', formData);
        
        const setValueIfExists = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = value || '';
            }
        };

        setValueIfExists('oneColumnImageUrl', formData.imageUrl);
        setValueIfExists('oneColumnImageLink', formData.imageLink);
        setValueIfExists('oneColumnTitle', formData.title);
        setValueIfExists('oneColumnDescription', formData.description);
        setValueIfExists('oneColumnButtonText', formData.buttonText);
        setValueIfExists('oneColumnButtonLink', formData.buttonLink);

        const descriptionEditor = document.getElementById('oneColumnDescription');
        if (descriptionEditor) {
            descriptionEditor.innerHTML = formData.description || '';
        }

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