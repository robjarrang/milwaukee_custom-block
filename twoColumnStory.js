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
            leftTitleAlignment: 'left',
            leftDescriptionAlignment: 'left',
            leftButtonAlignment: 'left',
            rightTitleAlignment: 'left',
            rightDescriptionAlignment: 'left',
            rightButtonAlignment: 'left'
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
                leftImageLink: columns[0].querySelector('.fill.no-hover')?.closest('a')?.href || '',
                leftTitle: columns[0].querySelector('h3')?.textContent?.trim() || '',
                leftDescription: columns[0].querySelector('.story-intro')?.textContent?.trim() || '',
                leftButtonText: columns[0].querySelector('.button-1 a')?.textContent?.trim() || '',
                leftButtonLink: columns[0].querySelector('.button-1 a')?.href || '',
                rightImageUrl: columns[2].querySelector('.fill.no-hover')?.src || '',
                rightImageLink: columns[2].querySelector('.fill.no-hover')?.closest('a')?.href || '',
                rightTitle: columns[2].querySelector('h3')?.textContent?.trim() || '',
                rightDescription: columns[2].querySelector('.story-intro')?.textContent?.trim() || '',
                rightButtonText: columns[2].querySelector('.button-1 a')?.textContent?.trim() || '',
                rightButtonLink: columns[2].querySelector('.button-1 a')?.href || '',
                backgroundColor: doc.querySelector('.content-outer').style.backgroundColor === '#DB021D' ? 'red' : 'black',
                leftTitleAlignment: columns[0].querySelector('h3').style.textAlign || 'left',
                leftDescriptionAlignment: columns[0].querySelector('.story-intro').style.textAlign || 'left',
                leftButtonAlignment: columns[0].querySelector('.button-1').parentElement.style.textAlign || 'left',
                rightTitleAlignment: columns[2].querySelector('h3').style.textAlign || 'left',
                rightDescriptionAlignment: columns[2].querySelector('.story-intro').style.textAlign || 'left',
                rightButtonAlignment: columns[2].querySelector('.button-1').parentElement.style.textAlign || 'left'
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

        return `
        <!-- START .story-2col -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: ${backgroundColor}; width: 620px;">
            <tr>
                <td class="side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            ${this.getColumnHtml(formData, 'left', titleBgImage)}
                            <td class="gap block" style="width: 20px;">&nbsp;</td>
                            ${this.getColumnHtml(formData, 'right', titleBgImage)}
                        </tr>
                    </table>
                </td>
                <td class="side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        <!-- END .story-2col -->
        `;
    },

    getColumnHtml(formData, side, titleBgImage) {
        return `
        <td align="center" class="block" style="width: 280px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                <tr>
                    <td>
                        <div class="image">
                            <a href="${formData[side + 'ImageLink']}" target="_blank" style="color: #ffffff;">
                                <img align="top" alt="Milwaukee" class="fill no-hover" src="${formData[side + 'ImageUrl']}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="280">
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
                                <td background="https://files.jarrang.com/Milwaukee/zTemplate/images/images-assets/${titleBgImage}" bgcolor="#B50317" class="mobile-text-left title-bg" style="text-align: ${formData[side + 'TitleAlignment']};" valign="top">
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
                                <td class="story-intro mobile-text-center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; text-align: ${formData[side + 'DescriptionAlignment']};">
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
                                    <table align="${formData[side + 'ButtonAlignment']}" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
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
                const element = document.querySelector(`#${id} .alignment-buttons button[data-align="${value}"]`);
                if (element) {
                    element.classList.add('active');
                } else {
                    console.warn(`Alignment button for ${id} with value ${value} not found`);
                }
            };

            setAlignmentIfExists(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}Title`, formData[side + 'TitleAlignment']);
            setAlignmentIfExists(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}Description`, formData[side + 'DescriptionAlignment']);
            setAlignmentIfExists(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}ButtonText`, formData[side + 'ButtonAlignment']);
        });
        
        const backgroundColorRadios = document.querySelectorAll('input[name="twoColumnBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            if (radio) {
                radio.checked = radio.value === formData.backgroundColor;
            } else {
                console.warn(`Radio button for background color not found`);
            }
        });
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

            const addAlignmentEventListeners = (id, field) => {
                const buttons = document.querySelectorAll(`#${id} .alignment-buttons button`);
                buttons.forEach(button => {
                    button.addEventListener('click', function() {
                        buttons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        const alignment = button.getAttribute('data-align');
                        handleFormFieldChange('twoColumnStory', field, alignment);
                    });
                });
            };

            addAlignmentEventListeners(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}Title`, `${side}TitleAlignment`);
            addAlignmentEventListeners(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}Description`, `${side}DescriptionAlignment`);
            addAlignmentEventListeners(`twoColumn${side.charAt(0).toUpperCase() + side.slice(1)}ButtonText`, `${side}ButtonAlignment`);
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
    }
};

moduleRegistry.register('twoColumnStory', twoColumnStoryModule);

export default twoColumnStoryModule;
