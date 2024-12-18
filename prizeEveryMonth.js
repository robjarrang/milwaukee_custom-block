import moduleRegistry from './moduleRegistry.js';

const prizeEveryMonthModule = {
    setup() {
        console.log('Prize Every Month module setup');
    },

    getPlaceholderData() {
        return {
            imageUrl: 'https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/ad565199-35bb-48ee-ab67-877c5c614355.png',
            imageLink: 'https://www.milwaukeetool.eu/',
            logoUrl: 'https://files.jarrang.com/Milwaukee/zTemplate/images/images-assets/pem-logo.png',
            title: 'THIS MONTHS PRIZE: M18™ PROMO POWERPACK',
            description: 'Enter into our draw to win one of our newest tools every month!',
            buttonText: 'Enter now',
            buttonLink: 'https://www.milwaukeetool.eu/',
            imagePosition: 'right',
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left',
            altText: 'Milwaukee'
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
                imagePosition: doc.querySelector('.sect[dir="rtl"]') ? 'right' : 'left',
                titleAlignmentDesktop: doc.querySelector('h3').style.textAlign || 'left',
                titleAlignmentMobile: doc.querySelector('h3').classList.contains('mobile-text-center') ? 'center' : 'left',
                descriptionAlignmentDesktop: doc.querySelector('.story-intro').style.textAlign || 'left',
                descriptionAlignmentMobile: doc.querySelector('.story-intro').classList.contains('mobile-text-center') ? 'center' : 'left',
                altText: doc.querySelector('.fill.absolute')?.alt || 'Milwaukee'
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

        const imageFirst = formData.imagePosition !== 'right';
        const sectionDir = imageFirst ? 'ltr' : 'rtl';
        const titleAlignmentDesktopClass = `desktop-text-${formData.titleAlignmentDesktop}`;
        const titleAlignmentMobileClass = `mobile-text-${formData.titleAlignmentMobile}`;
        const descriptionAlignmentDesktopClass = `desktop-text-${formData.descriptionAlignmentDesktop}`;
        const descriptionAlignmentMobileClass = `mobile-text-${formData.descriptionAlignmentMobile}`;

        return `
        <!-- START .story-pem -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="imp content-outer story-1col banner" role="presentation" style="background-color: #DB021D; width: 620px;">
            <tr>
                <td class="imp side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="imp content-inner" style="background-color: #DB021D; border-radius: 0; padding-bottom: 30px; width: 580px;" valign="middle">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="imp sect" dir="${sectionDir}" role="presentation" style="background-color: #B50018; width: 100%;">
                        <tr height="320" style="height: 320px">
                            ${this.getImageColumn(formData)}
                            ${this.getContentColumn(formData, titleAlignmentDesktopClass, titleAlignmentMobileClass, descriptionAlignmentDesktopClass, descriptionAlignmentMobileClass)}
                        </tr>
                    </table>
                </td>
                <td class="imp side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        <!-- END .story-pem -->
        `;
    },

    getImageColumn(formData) {
        return `
        <td class="imp block image" dir="ltr" style="width: 280px;" valign="middle">
            <div class="imp image">
                <a href="${formData.imageLink}" target="_blank" style="color: #ffffff;">
                    <img align="top" alt="${formData.altText || 'Milwaukee'}" class="imp fill absolute" src="${formData.imageUrl}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="270">
                </a>
            </div>
        </td>
        `;
    },

    getContentColumn(formData, titleAlignmentDesktopClass, titleAlignmentMobileClass, descriptionAlignmentDesktopClass, descriptionAlignmentMobileClass) {
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
                                <td class="imp ${titleAlignmentDesktopClass} ${titleAlignmentMobileClass}" style="text-align: ${formData.titleAlignmentDesktop};">
                                    <h3 class="imp" style="color: #ffffff; font-family: 'HelveticaNeue-CondensedBold', Arial, sans-serif, 'Open-Sans'; font-size: 22px; font-stretch: condensed; font-weight: bold; line-height: 26px; margin: 0; margin-bottom: 4px; margin-top: 0; text-transform: uppercase;">
                                        ${formData.title}
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <td class="imp story-intro mobile-text-center ${descriptionAlignmentDesktopClass} ${descriptionAlignmentMobileClass}" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; padding-bottom: 10px; text-align: ${formData.descriptionAlignmentDesktop};">
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
        document.getElementById('pemImageUrl').value = formData.imageUrl || '';
        document.getElementById('pemImageLink').value = formData.imageLink || '';
        document.getElementById('pemLogoUrl').value = formData.logoUrl || '';
        document.getElementById('pemTitle').value = formData.title || '';
        
        const descriptionEditor = document.getElementById('pemDescription');
        if (descriptionEditor) {
            descriptionEditor.innerHTML = formData.description || '';
        }
        
        document.getElementById('pemButtonText').value = formData.buttonText || '';
        document.getElementById('pemButtonLink').value = formData.buttonLink || '';
        
        const imagePositionRadios = document.querySelectorAll('input[name="pemImagePosition"]');
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

        setAlignmentIfExists('pemTitleAlignmentDesktop', formData.titleAlignmentDesktop);
        setAlignmentIfExists('pemTitleAlignmentMobile', formData.titleAlignmentMobile);
        setAlignmentIfExists('pemDescriptionAlignmentDesktop', formData.descriptionAlignmentDesktop);
        setAlignmentIfExists('pemDescriptionAlignmentMobile', formData.descriptionAlignmentMobile);
        document.getElementById('pemAltText').value = formData.altText || 'Milwaukee';
    },

    setupEventListeners(handleFormFieldChange) {
        ['pemImageUrl', 'pemImageLink', 'pemLogoUrl', 'pemTitle', 'pemButtonText', 'pemButtonLink', 'pemAltText'].forEach(id => {
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

        const editLinkButton = document.querySelector('#prizeEveryMonthModule .rich-text-toolbar button[data-command="editLink"]');
        if (editLinkButton) {
            // Remove existing listeners to prevent duplicates
            editLinkButton.replaceWith(editLinkButton.cloneNode(true));
            const newEditLinkButton = document.querySelector('#prizeEveryMonthModule .rich-text-toolbar button[data-command="editLink"]');
            newEditLinkButton.addEventListener('click', function() {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const anchor = range.startContainer.parentElement;
                    if (anchor && anchor.tagName === 'A') {
                        const url = prompt('Edit the URL', anchor.href);
                        if (url) {
                            anchor.href = url;
                            handleFormFieldChange('prizeEveryMonth', 'description', descriptionEditor.innerHTML);
                        }
                    }
                }
            });
        }

        const removeLinkButton = document.querySelector('#prizeEveryMonthModule .rich-text-toolbar button[data-command="removeLink"]');
        if (removeLinkButton) {
            // Remove existing listeners to prevent duplicates
            removeLinkButton.replaceWith(removeLinkButton.cloneNode(true));
            const newRemoveLinkButton = document.querySelector('#prizeEveryMonthModule .rich-text-toolbar button[data-command="removeLink"]');
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
                        handleFormFieldChange('prizeEveryMonth', 'description', descriptionEditor.innerHTML);
                    }
                }
            });
        }

        const imagePositionRadios = document.querySelectorAll('input[name="pemImagePosition"]');
        imagePositionRadios.forEach(radio => {
            radio.addEventListener('change', function(event) {
                handleFormFieldChange('prizeEveryMonth', 'imagePosition', event.target.value);
            });
        });

        const titleEditor = document.getElementById('pemTitle');
        if (titleEditor) {
            const titleSuperscriptButton = document.querySelector('#prizeEveryMonthModule .rich-text-toolbar button[data-command="superscript"]');
            if (titleSuperscriptButton) {
                titleSuperscriptButton.addEventListener('click', function() {
                    document.execCommand('superscript');
                    handleFormFieldChange('prizeEveryMonth', 'title', titleEditor.innerHTML);
                });
            }
        }

        const setupAlignmentButtonListeners = (id, field) => {
            const buttons = document.querySelectorAll(`#${id} .alignment-button`);
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const alignment = button.getAttribute('data-alignment');
                    handleFormFieldChange('prizeEveryMonth', field, alignment);
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        };

        setupAlignmentButtonListeners('pemTitleAlignmentDesktop', 'titleAlignmentDesktop');
        setupAlignmentButtonListeners('pemTitleAlignmentMobile', 'titleAlignmentMobile');
        setupAlignmentButtonListeners('pemDescriptionAlignmentDesktop', 'descriptionAlignmentDesktop');
        setupAlignmentButtonListeners('pemDescriptionAlignmentMobile', 'descriptionAlignmentMobile');
    }
};

moduleRegistry.register('prizeEveryMonth', prizeEveryMonthModule);

export default prizeEveryMonthModule;
