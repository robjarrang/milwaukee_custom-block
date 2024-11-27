import moduleRegistry from './moduleRegistry.js';

const threeColumnStoryModule = {
    setup() {
        console.log('3 Column Story module setup');
    },

    getPlaceholderData() {
        return {
            leftImageUrl: 'https://fakeimg.pl/290x290/dddddd/ffffff',
            leftImageLink: 'https://milwaukeetool.eu/',
            leftTitle: 'Left Column Title',
            leftDescription: 'Description for the left column.',
            leftButtonText: 'Left Button',
            leftButtonLink: 'https://milwaukeetool.eu/left',
            centerImageUrl: 'https://fakeimg.pl/290x290/dddddd/ffffff',
            centerImageLink: 'https://milwaukeetool.eu/',
            centerTitle: 'Center Column Title',
            centerDescription: 'Description for the center column.',
            centerButtonText: 'Center Button',
            centerButtonLink: 'https://milwaukeetool.eu/center',
            rightImageUrl: 'https://fakeimg.pl/290x290/dddddd/ffffff',
            rightImageLink: 'https://milwaukeetool.eu/',
            rightTitle: 'Right Column Title',
            rightDescription: 'Description for the right column.',
            rightButtonText: 'Right Button',
            rightButtonLink: 'https://milwaukeetool.eu/right',
            backgroundColor: 'red'
        };
    },

    parseHtml(html) {
        console.log('Parsing Three Column Story HTML:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        try {
            const columns = doc.querySelectorAll('.block');
            const parsedData = {
                leftImageUrl: columns[0].querySelector('.fill.no-hover')?.src || '',
                leftImageLink: columns[0].querySelector('.fill.no-hover')?.closest('a')?.href || '',
                leftTitle: columns[0].querySelector('h3')?.textContent?.trim() || '',
                leftDescription: columns[0].querySelector('.story-intro')?.textContent?.trim() || '',
                leftButtonText: columns[0].querySelector('.button-1 a')?.textContent?.trim() || '',
                leftButtonLink: columns[0].querySelector('.button-1 a')?.href || '',
                centerImageUrl: columns[2].querySelector('.fill.no-hover')?.src || '',
                centerImageLink: columns[2].querySelector('.fill.no-hover')?.closest('a')?.href || '',
                centerTitle: columns[2].querySelector('h3')?.textContent?.trim() || '',
                centerDescription: columns[2].querySelector('.story-intro')?.textContent?.trim() || '',
                centerButtonText: columns[2].querySelector('.button-1 a')?.textContent?.trim() || '',
                centerButtonLink: columns[2].querySelector('.button-1 a')?.href || '',
                rightImageUrl: columns[4].querySelector('.fill.no-hover')?.src || '',
                rightImageLink: columns[4].querySelector('.fill.no-hover')?.closest('a')?.href || '',
                rightTitle: columns[4].querySelector('h3')?.textContent?.trim() || '',
                rightDescription: columns[4].querySelector('.story-intro')?.textContent?.trim() || '',
                rightButtonText: columns[4].querySelector('.button-1 a')?.textContent?.trim() || '',
                rightButtonLink: columns[4].querySelector('.button-1 a')?.href || '',
                backgroundColor: doc.querySelector('.content-outer').style.backgroundColor === '#DB021D' ? 'red' : 'black'
            };
            console.log('Parsed Three Column Story data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Three Column Story HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating 3 Column Story HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        const backgroundColor = formData.backgroundColor === 'red' ? '#DB021D' : '#000000';

        return `
        <!-- START .three-column-left-image -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #123456; width: 200px;">
            <tr>
                <td align="center" class="content-inner" style="width: 180px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="center" class="block" style="width: 100%;" valign="top">
                                <div>
                                    <a href="${formData.leftImageLink || '#'}" target="_blank" style="color: #ffffff;">
                                        <img align="top" alt="Left Column" class="fill no-hover" src="${formData.leftImageUrl || ''}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="180">
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- END .three-column-left-image -->
        <!-- START .three-column-left-description -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #123456; width: 200px;">
            <tr>
                <td class="side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="content-inner" style="width: 160px;">
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
                                            ${formData.leftDescription}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 32px; height: 32px; line-height: 32px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                    ${formData.leftButtonText ? `
                                    <tr>
                                        <td>
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                                                <tr>
                                                    <td align="center" class="block" style="width: 100%;" valign="middle">
                                                        <table border="0" cellpadding="0" cellspacing="0" class="button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px;">
                                                            <tr>
                                                                <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%; mso-text-raise: 6px;">
                                                                    <a href="${formData.leftButtonLink}" style="color: #ffffff; text-decoration: none;" target="_blank">${formData.leftButtonText}</a>
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
        <!-- END .three-column-left-description -->

        <!-- Repeat similar blocks for Center and Right Columns -->
        <!-- START .three-column-center-image -->
        // ...existing center column image code...
        <!-- END .three-column-center-image -->
        <!-- START .three-column-center-description -->
        // ...existing center column description code with style="color: #ffffff;"...
        <!-- END .three-column-center-description -->

        <!-- START .three-column-right-image -->
        // ...existing right column image code...
        <!-- END .three-column-right-image -->
        <!-- START .three-column-right-description -->
        // ...existing right column description code with style="color: #ffffff;"...
        <!-- END .three-column-right-description -->
        `;
    },

    getColumnHtml(formData, position) {
        return `
        <td class="block" style="width: 180px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                <tr>
                    <td>
                        <div>
                            <a href="${formData[position + 'ImageLink']}" target="_blank" style="color: #ffffff;">
                                <img align="top" alt="Milwaukee" class="fill no-hover" src="${formData[position + 'ImageUrl']}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="180">
                            </a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding-bottom: 8px; padding-top: 8px;">
                        <table border="0" cellpadding="0" cellspacing="0" class="sect" style="width: 100%;">
                            <tr>
                                <td>
                                    <div style="clear: both; display: block; font-size: 4px; height: 4px; line-height: 4px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="mobile-text-center" style="text-align: left;">
                                    <h3 style="color: #ffffff; font-family: 'HelveticaNeue-CondensedBold', Arial, sans-serif, 'Open-Sans'; font-size: 28px; font-stretch: condensed; font-weight: bold; line-height: 32px; margin: 0; margin-bottom: 0; margin-top: 0; text-transform: uppercase;">
                                        ${formData[position + 'Title']}
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="clear: both; display: block; font-size: 4px; height: 4px; line-height: 4px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="story-intro mobile-text-center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; text-align: left;">
                                    ${formData[position + 'Description']}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="clear: both; display: block; font-size: 16px; height: 16px; line-height: 16px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                                        <tr>
                                            <td align="left" class="block" style="width: 100%;" valign="top">
                                                <table border="0" cellpadding="0" cellspacing="0" class="button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px; mso-text-raise: 6px;">
                                                    <tr>
                                                        <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%;">
                                                            <a href="${formData[position + 'ButtonLink']}" style="color: #ffffff; text-decoration: none;" target="_blank">${formData[position + 'ButtonText']}</a>
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
        console.log('Populating 3 Column Story form with data:', formData);
        
        const setValueIfExists = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = value || '';
            } else {
                console.warn(`Element with id ${id} not found`);
            }
        };

        setValueIfExists('threeColumnLeftImageUrl', formData.leftImageUrl);
        setValueIfExists('threeColumnLeftImageLink', formData.leftImageLink);
        setValueIfExists('threeColumnLeftTitle', formData.leftTitle);
        setValueIfExists('threeColumnLeftDescription', formData.leftDescription);
        setValueIfExists('threeColumnLeftButtonText', formData.leftButtonText);
        setValueIfExists('threeColumnLeftButtonLink', formData.leftButtonLink);
        setValueIfExists('threeColumnCenterImageUrl', formData.centerImageUrl);
        setValueIfExists('threeColumnCenterImageLink', formData.centerImageLink);
        setValueIfExists('threeColumnCenterTitle', formData.centerTitle);
        setValueIfExists('threeColumnCenterDescription', formData.centerDescription);
        setValueIfExists('threeColumnCenterButtonText', formData.centerButtonText);
        setValueIfExists('threeColumnCenterButtonLink', formData.centerButtonLink);
        setValueIfExists('threeColumnRightImageUrl', formData.rightImageUrl);
        setValueIfExists('threeColumnRightImageLink', formData.rightImageLink);
        setValueIfExists('threeColumnRightTitle', formData.rightTitle);
        setValueIfExists('threeColumnRightDescription', formData.rightDescription);
        setValueIfExists('threeColumnRightButtonText', formData.rightButtonText);
        setValueIfExists('threeColumnRightButtonLink', formData.rightButtonLink);
        
        const backgroundColorRadios = document.querySelectorAll('input[name="threeColumnBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            if (radio) {
                radio.checked = radio.value === formData.backgroundColor;
            } else {
                console.warn(`Radio button for background color not found`);
            }
        });
    },

    setupEventListeners(handleFormFieldChange) {
        ['left', 'center', 'right'].forEach(position => {
            ['ImageUrl', 'ImageLink', 'Title', 'ButtonText', 'ButtonLink'].forEach(field => {
                const id = `threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}${field}`;
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('input', function(event) {
                        const key = position + field;
                        handleFormFieldChange('threeColumnStory', key, event.target.value);
                    });
                } else {
                    console.warn(`Element with id ${id} not found for event listener`);
                }
            });
    
            const descriptionId = `threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}Description`;
            const descriptionElement = document.getElementById(descriptionId);
            if (descriptionElement) {
                descriptionElement.addEventListener('input', function(event) {
                    handleFormFieldChange('threeColumnStory', position + 'Description', event.target.innerHTML);
                });
            } else {
                console.warn(`Rich text editor with id ${descriptionId} not found for event listener`);
            }
        });
    
        const backgroundColorRadios = document.querySelectorAll('input[name="threeColumnBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            if (radio) {
                radio.addEventListener('change', function(event) {
                    handleFormFieldChange('threeColumnStory', 'backgroundColor', event.target.value);
                });
            } else {
                console.warn(`Radio button for background color not found for event listener`);
            }
        });

        const leftDescriptionEditor = document.getElementById('threeColumnLeftDescription');
        if (leftDescriptionEditor) {
            leftDescriptionEditor.addEventListener('input', function(event) {
                handleFormFieldChange('threeColumnStory', 'leftDescription', event.target.innerHTML);
            });
        }

        const centerDescriptionEditor = document.getElementById('threeColumnCenterDescription');
        if (centerDescriptionEditor) {
            centerDescriptionEditor.addEventListener('input', function(event) {
                handleFormFieldChange('threeColumnStory', 'centerDescription', event.target.innerHTML);
            });
        }

        const rightDescriptionEditor = document.getElementById('threeColumnRightDescription');
        if (rightDescriptionEditor) {
            rightDescriptionEditor.addEventListener('input', function(event) {
                handleFormFieldChange('threeColumnStory', 'rightDescription', event.target.innerHTML);
            });
        }

        const superscriptButtons = document.querySelectorAll('#threeColumnStoryModule .rich-text-toolbar button[data-command="superscript"]');
        superscriptButtons.forEach(button => {
            button.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('threeColumnStory', 'leftDescription', leftDescriptionEditor.innerHTML);
                handleFormFieldChange('threeColumnStory', 'centerDescription', centerDescriptionEditor.innerHTML);
                handleFormFieldChange('threeColumnStory', 'rightDescription', rightDescriptionEditor.innerHTML);
            });
        });

        // Select all link buttons within the threeColumnStoryModule
        const linkButtons = document.querySelectorAll('#threeColumnStoryModule .rich-text-toolbar button[data-command="link"]');

        linkButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            button.replaceWith(button.cloneNode(true));
        });

        const updatedLinkButtons = document.querySelectorAll('#threeColumnStoryModule .rich-text-toolbar button[data-command="link"]');

        updatedLinkButtons.forEach(button => {
            button.addEventListener('click', function() {
                const url = prompt('Enter the URL');
                if (url) {
                    document.execCommand('createLink', false, url);
                    // Apply styles to the newly created link
                    const selection = window.getSelection();
                    if (selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        const anchor = range.startContainer.parentElement;
                        if (anchor && anchor.tagName === 'A') {
                            anchor.style.color = '#ffffff';
                            anchor.setAttribute('target', '_blank');
                        }
                    }
                    handleFormFieldChange('threeColumnStory', 'leftDescription', leftDescriptionEditor.innerHTML);
                    handleFormFieldChange('threeColumnStory', 'centerDescription', centerDescriptionEditor.innerHTML);
                    handleFormFieldChange('threeColumnStory', 'rightDescription', rightDescriptionEditor.innerHTML);
                }
            });
        });
    }
};

moduleRegistry.register('threeColumnStory', threeColumnStoryModule);

export default threeColumnStoryModule;