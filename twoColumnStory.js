import moduleRegistry from './moduleRegistry.js';

const twoColumnStoryModule = {
    setup() {
        console.log('Two Column Story module setup');
    },

    getPlaceholderData() {
        return {
            leftImageUrl: 'https://fakeimg.pl/280x200/dddddd/ffffff',
            leftImageLink: 'https://milwaukeetool.eu/',
            leftTitle: 'Pellentesque habitant',
            leftDescription: 'Sed vitae aliquet neque.',
            leftButtonText: 'Button title',
            leftButtonLink: 'https://milwaukeetool.eu/',
            rightImageUrl: 'https://fakeimg.pl/280x200/dddddd/ffffff',
            rightImageLink: 'https://milwaukeetool.eu/',
            rightTitle: 'Pellentesque habitant',
            rightDescription: 'Morbi id risus eleifend, viverra.',
            rightButtonText: 'Button title',
            rightButtonLink: 'https://milwaukeetool.eu/',
            backgroundColor: 'red',
            leftTitleAlignmentDesktop: 'left',
            leftTitleAlignmentMobile: 'left',
            leftDescriptionAlignmentDesktop: 'left',
            leftDescriptionAlignmentMobile: 'left',
            rightTitleAlignmentDesktop: 'left',
            rightTitleAlignmentMobile: 'left',
            rightDescriptionAlignmentDesktop: 'left',
            rightDescriptionAlignmentMobile: 'left',
            leftImageAltText: 'Milwaukee Tool Left Column Image', // Add default alt text
            rightImageAltText: 'Milwaukee Tool Right Column Image', // Add default alt text
            twoColumnLeftImageAltText: 'Placeholder for Left Image Alt Text',
            twoColumnRightImageAltText: 'Placeholder for Right Image Alt Text',
        };
    },

    parseHtml(html) {
        console.log('Parsing Two Column Story HTML:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        try {
            const columns = doc.querySelectorAll('.block');
            const parsedData = {
                leftImageUrl: columns[0].querySelector('.fill.no-hover')?.src || '',
                leftImageAltText: columns[0].querySelector('.fill.no-hover')?.alt || 'Milwaukee Tool Left Column Image',
                leftImageLink: columns[0].querySelector('.fill.no-hover')?.closest('a')?.href || '',
                leftTitle: columns[0].querySelector('h3')?.textContent?.trim() || '',
                leftDescription: columns[0].querySelector('.story-intro')?.textContent?.trim() || '',
                leftButtonText: columns[0].querySelector('.button-1 a')?.textContent?.trim() || '',
                leftButtonLink: columns[0].querySelector('.button-1 a')?.href || '',
                rightImageUrl: columns[2].querySelector('.fill.no-hover')?.src || '',
                rightImageAltText: columns[2].querySelector('.fill.no-hover')?.alt || 'Milwaukee Tool Right Column Image',
                rightImageLink: columns[2].querySelector('.fill.no-hover')?.closest('a')?.href || '',
                rightTitle: columns[2].querySelector('h3')?.textContent?.trim() || '',
                rightDescription: columns[2].querySelector('.story-intro')?.textContent?.trim() || '',
                rightButtonText: columns[2].querySelector('.button-1 a')?.textContent?.trim() || '',
                rightButtonLink: columns[2].querySelector('.button-1 a')?.href || '',
                backgroundColor: doc.querySelector('.content-outer').style.backgroundColor === '#DB021D' ? 'red' : 'black',
                leftTitleAlignmentDesktop: columns[0].querySelector('h3').style.textAlign || 'left',
                leftTitleAlignmentMobile: columns[0].querySelector('h3').classList.contains('mobile-text-center') ? 'center' : 'left',
                leftDescriptionAlignmentDesktop: columns[0].querySelector('.story-intro').style.textAlign || 'left',
                leftDescriptionAlignmentMobile: columns[0].querySelector('.story-intro').classList.contains('mobile-text-center') ? 'center' : 'left',
                rightTitleAlignmentDesktop: columns[2].querySelector('h3').style.textAlign || 'left',
                rightTitleAlignmentMobile: columns[2].querySelector('h3').classList.contains('mobile-text-center') ? 'center' : 'left',
                rightDescriptionAlignmentDesktop: columns[2].querySelector('.story-intro').style.textAlign || 'left',
                rightDescriptionAlignmentMobile: columns[2].querySelector('.story-intro').classList.contains('mobile-text-center') ? 'center' : 'left'
            };
            console.log('Parsed Two Column Story data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Two Column Story HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating Two Column Story HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        const backgroundColor = formData.backgroundColor === 'red' ? '#DB021D' : '#000000';
        const titleBgImage = formData.backgroundColor === 'red' ? 'title-bg.jpg' : 'title-bg-red.jpg';
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
                            ${imageFirst ? this.getImageColumn(formData, 'left') : this.getContentColumn(formData, titleAlignmentDesktopClass, titleAlignmentMobileClass, descriptionAlignmentDesktopClass, descriptionAlignmentMobileClass)}
                            ${imageFirst ? this.getContentColumn(formData, titleAlignmentDesktopClass, titleAlignmentMobileClass, descriptionAlignmentDesktopClass, descriptionAlignmentMobileClass) : this.getImageColumn(formData, 'right')}
                        </tr>
                    </table>
                </td>
                <td class="side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        `;
    },

    getImageColumn(formData, side) {
        const altText = side === 'left' ? formData.twoColumnLeftImageAltText : formData.twoColumnRightImageAltText;
        const imageUrl = side === 'left' ? formData.leftImageUrl : formData.rightImageUrl;
        const imageLink = side === 'left' ? formData.leftImageLink : formData.rightImageLink;

        return `
        <td class="block" style="width: 280px;" valign="middle">
            <div>
                <a href="${imageLink || '#'}" target="_blank" style="color: #ffffff;">
                    <img align="top" alt="${altText || 'Milwaukee Tool 2 Column Image'}" class="fill no-hover" src="${imageUrl || ''}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="280">
                </a>
            </div>
        </td>
        `;
    },

    getColumnHtml(formData, side, titleBgImage) {
        const titleAlignmentDesktopClass = `desktop-text-${formData[side + 'TitleAlignmentDesktop']}`;
        const titleAlignmentMobileClass = `mobile-text-${formData[side + 'TitleAlignmentMobile']}`;
        const descriptionAlignmentDesktopClass = `desktop-text-${formData[side + 'DescriptionAlignmentDesktop']}`;
        const descriptionAlignmentMobileClass = `mobile-text-${formData[side + 'DescriptionAlignmentMobile']}`;

        return `
        <td align="center" class="block" style="width: 280px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                <tr>
                    <td>
                        <div class="image">
                            <a href="${formData[side + 'ImageLink']}" target="_blank" style="color: #ffffff;">
                                <img align="top" alt="${formData[side + 'ImageAltText'] || 'Milwaukee Tool Left Column Image'}" class="fill no-hover" src="${formData[side + 'ImageUrl']}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="280">
                            </a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding-bottom: 10px; padding-top: 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" class="sect" style="width: 100%;">
                            <tr>
                                <td>
                                    <div style="clear: both; display: block; font-size: 8px; height: 8px; line-height: 8px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td background="https://files.jarrang.com/Milwaukee/zTemplate/images/images-assets/${titleBgImage}" bgcolor="#B50317" class="mobile-text-left title-bg ${titleAlignmentDesktopClass} ${titleAlignmentMobileClass}" style="text-align: ${formData[side + 'TitleAlignmentDesktop']};" valign="top">
                                    <!--[if gte mso 9]>
                                    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:280px;">
                                    <v:fill type="tile" src="https://files.jarrang.com/Milwaukee/zTemplate/images/images-assets/${titleBgImage}" color="#B50317" size="100%,100%" aspect="atleast" />
                                    <v:textbox style="mso-fit-shape-to-text:true" inset="10px,10px,10px,10px">
                                    <![endif]-->
                                    <div>
                                        <h3 style="color: #ffffff; font-family: 'HelveticaNeue-CondensedBold', Arial, sans-serif, 'Open-Sans'; font-size: 26px; font-stretch: condensed; font-weight: bold; line-height: 32px; margin: 0; margin-bottom: 0; margin-top: 0; text-transform: uppercase;">
                                            <strong style="font-weight: bold;">${formData[side + 'Title']}</strong>
                                        </h3>
                                    </div>
                                    <!--[if gte mso 9]>
                                    </v:textbox>
                                    </v:rect>
                                    <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="clear: both; display: block; font-size: 8px; height: 8px; line-height: 8px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td class="story-intro mobile-text-center ${descriptionAlignmentDesktopClass} ${descriptionAlignmentMobileClass}" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; text-align: ${formData[side + 'DescriptionAlignmentDesktop']};">
                                    ${formData[side + 'Description']}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="clear: both; display: block; font-size: 20px; height: 20px; line-height: 20px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                                        <tr>
                                            <td align="left" class="block" style="width: 100%;" valign="top">
                                                <table border="0" cellpadding="0" cellspacing="0" class="button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px; mso-text-raise: 6px;">
                                                    <tr>
                                                        <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; mso-text-raise: 2px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%;">
                                                            <a href="${formData[side + 'ButtonLink']}" style="color: #ffffff; text-decoration: none;" target="_blank">${formData[side + 'ButtonText']}</a>
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
        console.log('Populating Two Column Story form with data:', formData);
        ['left', 'right'].forEach(side => {
            ['ImageUrl', 'ImageLink', 'Title', 'ButtonText', 'ButtonLink'].forEach(field => {
                const id = `twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}${field}`;
                const element = document.getElementById(id);
                if (element) {
                    element.value = formData[side + field] || '';
                } else {
                    console.warn(`Element with id ${id} not found`);
                }
            });
            
            // Handle rich text editor for description
            const descriptionId = `twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}Description`;
            const descriptionElement = document.getElementById(descriptionId);
            if (descriptionElement) {
                descriptionElement.innerHTML = formData[side + 'Description'] || '';
            } else {
                console.warn(`Rich text editor with id ${descriptionId} not found`);
            }

            const setAlignmentIfExists = (id, value) => {
                const button = document.querySelector(`#${id} .alignment-button[data-alignment="${value}"]`);
                if (button) {
                    button.classList.add('active');
                } else {
                    console.warn(`Alignment button for ${id} with value ${value} not found`);
                }
            };

            setAlignmentIfExists(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}TitleAlignmentDesktop`, formData[side + 'TitleAlignmentDesktop']);
            setAlignmentIfExists(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}TitleAlignmentMobile`, formData[side + 'TitleAlignmentMobile']);
            setAlignmentIfExists(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}DescriptionAlignmentDesktop`, formData[side + 'DescriptionAlignmentDesktop']);
            setAlignmentIfExists(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}DescriptionAlignmentMobile`, formData[side + 'DescriptionAlignmentMobile']);
        });
        
        const backgroundColorRadios = document.querySelectorAll('input[name="twoColumnBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            if (radio) {
                radio.checked = radio.value === formData.backgroundColor;
            } else {
                console.warn(`Radio button for background color not found`);
            }
        });

        document.getElementById('twoColumnLeftImageAltText').value = formData.twoColumnLeftImageAltText || '';
        document.getElementById('twoColumnRightImageAltText').value = formData.twoColumnRightImageAltText || '';
    },

    setupEventListeners(handleFormFieldChange) {
        ['left', 'right'].forEach(side => {
            ['ImageUrl', 'ImageLink', 'Title', 'ButtonText', 'ButtonLink'].forEach(field => {
                const id = `twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}${field}`;
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('input', function(event) {
                        const key = side + field;
                        handleFormFieldChange('twoColumnStory', key, event.target.value);
                    });
                } else {
                    console.warn(`Element with id ${id} not found for event listener`);
                }
            });
    
            // Handle rich text editor for description
            const descriptionId = `twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}Description`;
            const descriptionElement = document.getElementById(descriptionId);
            if (descriptionElement) {
                descriptionElement.addEventListener('input', function(event) {
                    handleFormFieldChange('twoColumnStory', side + 'Description', event.target.innerHTML);
                });
            } else {
                console.warn(`Rich text editor with id ${descriptionId} not found for event listener`);
            }

            const setupAlignmentButtonListeners = (id, field) => {
                const buttons = document.querySelectorAll(`#${id} .alignment-button`);
                buttons.forEach(button => {
                    button.addEventListener('click', function() {
                        const alignment = button.getAttribute('data-alignment');
                        handleFormFieldChange('twoColumnStory', field, alignment);
                        buttons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                    });
                });
            };

            setupAlignmentButtonListeners(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}TitleAlignmentDesktop`, `${side}TitleAlignmentDesktop`);
            setupAlignmentButtonListeners(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}TitleAlignmentMobile`, `${side}TitleAlignmentMobile`);
            setupAlignmentButtonListeners(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}DescriptionAlignmentDesktop`, `${side}DescriptionAlignmentDesktop`);
            setupAlignmentButtonListeners(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}DescriptionAlignmentMobile`, `${side}DescriptionAlignmentMobile`);
        });
    
        const backgroundColorRadios = document.querySelectorAll('input[name="twoColumnBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            if (radio) {
                radio.addEventListener('change', function(event) {
                    handleFormFieldChange('twoColumnStory', 'backgroundColor', event.target.value);
                });
            } else {
                console.warn(`Radio button for background color not found for event listener`);
            }
        });

        const leftDescriptionEditor = document.getElementById('twoColumnLeftDescription');
        if (leftDescriptionEditor) {
            leftDescriptionEditor.addEventListener('input', function(event) {
                handleFormFieldChange('twoColumnStory', 'leftDescription', event.target.innerHTML);
            });
        }

        const rightDescriptionEditor = document.getElementById('twoColumnRightDescription');
        if (rightDescriptionEditor) {
            rightDescriptionEditor.addEventListener('input', function(event) {
                handleFormFieldChange('twoColumnStory', 'rightDescription', event.target.innerHTML);
            });
        }

        const superscriptButtons = document.querySelectorAll('#twoColumnStoryModule .rich-text-toolbar button[data-command="superscript"]');
        superscriptButtons.forEach(button => {
            button.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('twoColumnStory', 'description', leftDescriptionEditor.innerHTML);
                handleFormFieldChange('twoColumnStory', 'description', rightDescriptionEditor.innerHTML);
            });
        });

        // Select all link buttons within the twoColumnStoryModule
        const linkButtons = document.querySelectorAll('#twoColumnStoryModule .rich-text-toolbar button[data-command="link"]');

        linkButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            button.replaceWith(button.cloneNode(true));
        });

        const updatedLinkButtons = document.querySelectorAll('#twoColumnStoryModule .rich-text-toolbar button[data-command="link"]');

        updatedLinkButtons.forEach(button => {
            button.addEventListener('click', function() {
                const url = prompt('Enter the URL');
                if (url && url.startsWith('https://')) {
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
                    handleFormFieldChange('twoColumnStory', 'leftDescription', leftDescriptionEditor.innerHTML);
                    handleFormFieldChange('twoColumnStory', 'rightDescription', rightDescriptionEditor.innerHTML);
                } else {
                    alert('Please enter a valid URL that starts with https://');
                }
            });
        });

        const editLinkButtons = document.querySelectorAll('#twoColumnStoryModule .rich-text-toolbar button[data-command="editLink"]');
        editLinkButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            button.replaceWith(button.cloneNode(true));
        });

        const updatedEditLinkButtons = document.querySelectorAll('#twoColumnStoryModule .rich-text-toolbar button[data-command="editLink"]');

        updatedEditLinkButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const anchor = range.startContainer.parentElement;
                    if (anchor && anchor.tagName === 'A') {
                        const url = prompt('Edit the URL', anchor.href);
                        if (url && url.startsWith('https://')) {
                            anchor.href = url;
                            handleFormFieldChange('twoColumnStory', 'leftDescription', leftDescriptionEditor.innerHTML);
                            handleFormFieldChange('twoColumnStory', 'rightDescription', rightDescriptionEditor.innerHTML);
                        } else {
                            alert('Please enter a valid URL that starts with https://');
                        }
                    }
                }
            });
        });

        const removeLinkButtons = document.querySelectorAll('#twoColumnStoryModule .rich-text-toolbar button[data-command="removeLink"]');
        removeLinkButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            button.replaceWith(button.cloneNode(true));
        });

        const updatedRemoveLinkButtons = document.querySelectorAll('#twoColumnStoryModule .rich-text-toolbar button[data-command="removeLink"]');

        updatedRemoveLinkButtons.forEach(button => {
            button.addEventListener('click', function() {
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
                        handleFormFieldChange('twoColumnStory', 'leftDescription', leftDescriptionEditor.innerHTML);
                        handleFormFieldChange('twoColumnStory', 'rightDescription', rightDescriptionEditor.innerHTML);
                    }
                }
            });
        });

        const titleSuperscriptButton = document.querySelector('#twoColumnStoryModule .rich-text-toolbar button[data-command="superscript"]');
        if (titleSuperscriptButton) {
            titleSuperscriptButton.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('twoColumnStory', 'title', document.getElementById('twoColumnLeftTitle').value);
                handleFormFieldChange('twoColumnStory', 'title', document.getElementById('twoColumnRightTitle').value);
            });
        }

        const fields = [
            'twoColumnLeftImageUrl',
            'twoColumnLeftImageAltText',
            'twoColumnLeftImageLink',
            'twoColumnRightImageUrl',
            'twoColumnRightImageAltText',
            'twoColumnRightImageLink'
        ];

        fields.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function(event) {
                    const key = id;
                    handleFormFieldChange('twoColumnStory', key, event.target.value);
                    console.log(`Changed ${key} to ${event.target.value}`);
                });
            } else {
                console.warn(`Element with id ${id} not found`);
            }
        });
    }
};

moduleRegistry.register('twoColumnStory', twoColumnStoryModule);

export default twoColumnStoryModule;
