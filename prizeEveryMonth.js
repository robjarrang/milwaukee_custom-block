import moduleRegistry from './moduleRegistry.js';

const prizeEveryMonthModule = {
    setup() {
        console.log('Prize Every Month module setup');
    },

    getPlaceholderData() {
        return {
            imageUrl: 'https://fakeimg.pl/300x300/dddddd/ffffff',
            imageLink: 'https://milwaukeetool.eu/',
            logoUrl: 'https://milwaukeetool.eu/logo.png',
            title: 'Monthly Prize',
            description: 'Win amazing prizes every month by participating in our exclusive events.',
            buttonText: 'Join Now',
            buttonLink: 'https://milwaukeetool.eu/join',
            imagePosition: 'left',
            showButton: true
        };
    },

    parseHtml(html) {
        console.log('Parsing Prize Every Month HTML:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        try {
            const parsedData = {
                imageUrl: doc.querySelector('.fill.absolute')?.src || '',
                imageLink: doc.querySelector('.image a')?.href || '',
                logoUrl: doc.querySelector('img[alt="Prize Every Month"]')?.src || '',
                title: doc.querySelector('h3')?.textContent?.trim() || '',
                description: doc.querySelector('.story-intro')?.innerHTML || '',
                buttonText: doc.querySelector('.button-1 a')?.textContent?.trim() || '',
                buttonLink: doc.querySelector('.button-1 a')?.href || '',
                imagePosition: doc.querySelector('.sect[dir="rtl"]') ? 'right' : 'left'
            };
            console.log('Parsed Prize Every Month data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Prize Every Month HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating Prize Every Month HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }

        return `
        <!-- START .pem-image -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #123456; width: 620px;">
            <tr>
                <td align="center" class="content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="center" class="block" style="width: 100%;" valign="top">
                                <div>
                                    <a href="${formData.imageLink || '#'}" target="_blank" style="color: #ffffff;">
                                        <img align="top" alt="Prize Every Month" class="fill no-hover" src="${formData.imageUrl || ''}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="620">
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- END .pem-image -->
        <!-- START .pem-description -->
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
        <!-- END .pem-description -->
        `;
    },

    getImageColumn(formData) {
        return `
        <td class="imp block image" dir="ltr" style="width: 280px;" valign="middle">
            <div class="imp image">
                <a href="${formData.imageLink}" target="_blank" style="color: #ffffff;">
                    <img align="top" alt="Milwaukee" class="imp fill absolute" src="${formData.imageUrl}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="270">
                </a>
            </div>
        </td>
        `;
    },

    getContentColumn(formData) {
        return `
        <td class="imp block" dir="ltr" style="width: 300px;" valign="middle">
            <table align="left" border="0" cellpadding="0" cellspacing="0" class="imp sect" role="presentation" style="width: 100%;">
                <tr>
                    <td class="sect-content-inner" style="padding: 20px 0px 20px 20px;" valign="middle">
                        <table border="0" cellpadding="0" cellspacing="0" class="imp sect" role="presentation" style="width: 100%;">
                            <tr>
                                <td class="imp mobile-text-center" style="text-align: left;">
                                    <img alt="Prize Every Month" src="${formData.logoUrl}" style="display: inline-block; height: auto; outline: none; text-decoration: none;" width="240">
                                </td>
                            </tr>
                            <tr>
                                <td class="imp mobile-text-center" style="text-align: left;">
                                    <h3 class="imp" style="color: #ffffff; font-family: 'HelveticaNeue-CondensedBold', Arial, sans-serif, 'Open-Sans'; font-size: 22px; font-stretch: condensed; font-weight: bold; line-height: 26px; margin: 0; margin-bottom: 4px; margin-top: 0; text-transform: uppercase;">
                                        ${formData.title}
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <td class="imp story-intro mobile-text-center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; padding-bottom: 10px; text-align: left;">
                                    ${formData.description}
                                </td>
                            </tr>
                            <!--[if mso]>
                            <tr>
                                <td class="imp" style="clear: both; display: block; font-size: 6px; height: 6px; line-height: 6px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</td>
                            </tr>
                            <![endif]-->
                            <tr>
                                <td>
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="imp sect" role="presentation" style="width: 100%;">
                                        <tr>
                                            <td align="left" class="imp block" valign="top">
                                                <table border="0" cellpadding="0" cellspacing="0" class="imp button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px; mso-text-raise: 6px;">
                                                    <tr>
                                                        <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%;">
                                                            <a href="${formData.buttonLink}" target="_blank" style="color: #ffffff; text-decoration: none;" target="_blank">${formData.buttonText}</a>
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
        console.log('Populating Prize Every Month form with data:', formData);
        
        const setValueIfExists = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = value || '';
            }
        };

        setValueIfExists('pemImageUrl', formData.imageUrl);
        setValueIfExists('pemImageLink', formData.imageLink);
        setValueIfExists('pemLogoUrl', formData.logoUrl);
        setValueIfExists('pemTitle', formData.title);
        setValueIfExists('pemDescription', formData.description);
        setValueIfExists('pemButtonText', formData.buttonText);
        setValueIfExists('pemButtonLink', formData.buttonLink);
        
        const descriptionEditor = document.getElementById('pemDescription');
        if (descriptionEditor) {
            descriptionEditor.innerHTML = formData.description || '';
        }
        
        const imagePositionRadios = document.querySelectorAll('input[name="pemImagePosition"]');
        imagePositionRadios.forEach(radio => {
            radio.checked = radio.value === formData.imagePosition;
        });
    },

    setupEventListeners(handleFormFieldChange) {
        ['pemImageUrl', 'pemImageLink', 'pemLogoUrl', 'pemTitle', 'pemButtonText', 'pemButtonLink'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function(event) {
                    const key = id.replace('pem', '').toLowerCase();
                    handleFormFieldChange('prizeEveryMonth', key, event.target.value);
                });
            } else {
                console.warn(`Element with id ${id} not found`);
            }
        });

        const descriptionEditor = document.getElementById('pemDescription');
        if (descriptionEditor) {
            descriptionEditor.addEventListener('input', function(event) {
                handleFormFieldChange('prizeEveryMonth', 'description', descriptionEditor.innerHTML);
            });
        }

        const superscriptButton = document.querySelector('#prizeEveryMonthModule .rich-text-toolbar button[data-command="superscript"]');
        if (superscriptButton) {
            superscriptButton.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('prizeEveryMonth', 'description', descriptionEditor.innerHTML);
            });
        }

        const linkButton = document.querySelector('#prizeEveryMonthModule .rich-text-toolbar button[data-command="link"]');
        if (linkButton) {
            // Remove existing listeners to prevent duplicates
            linkButton.replaceWith(linkButton.cloneNode(true));
            const newLinkButton = document.querySelector('#prizeEveryMonthModule .rich-text-toolbar button[data-command="link"]');
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
                    handleFormFieldChange('prizeEveryMonth', 'description', descriptionEditor.innerHTML);
                }
            });
        }

        const imagePositionRadios = document.querySelectorAll('input[name="pemImagePosition"]');
        imagePositionRadios.forEach(radio => {
            radio.addEventListener('change', function(event) {
                handleFormFieldChange('prizeEveryMonth', 'imagePosition', event.target.value);
            });
        });
    }
};

moduleRegistry.register('prizeEveryMonth', prizeEveryMonthModule);

export default prizeEveryMonthModule;