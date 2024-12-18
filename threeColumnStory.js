import moduleRegistry from './moduleRegistry.js';

const threeColumnStoryModule = {
    setup() {
        console.log('Three Column Story module setup');
    },

    getPlaceholderData() {
        return {
            leftImageUrl: 'https://fakeimg.pl/180x180/dddddd/ffffff',
            leftImageLink: 'https://milwaukeetool.eu/',
            leftTitle: 'Title goes here',
            leftDescription: 'Intro text goes here',
            leftButtonText: 'Button title',
            leftButtonLink: 'https://milwaukeetool.eu/',
            centerImageUrl: 'https://fakeimg.pl/180x180/dddddd/ffffff',
            centerImageLink: 'https://milwaukeetool.eu/',
            centerTitle: 'Title goes here',
            centerDescription: 'Intro text goes here',
            centerButtonText: 'Button title',
            centerButtonLink: 'https://milwaukeetool.eu/',
            rightImageUrl: 'https://fakeimg.pl/180x180/dddddd/ffffff',
            rightImageLink: 'https://milwaukeetool.eu/',
            rightTitle: 'Title goes here',
            rightDescription: 'Intro text goes here',
            rightButtonText: 'Button title',
            rightButtonLink: 'https://milwaukeetool.eu/',
            backgroundColor: 'red',
            leftTitleAlignmentDesktop: 'left',
            leftTitleAlignmentMobile: 'left',
            leftDescriptionAlignmentDesktop: 'left',
            leftDescriptionAlignmentMobile: 'left',
            centerTitleAlignmentDesktop: 'left',
            centerTitleAlignmentMobile: 'left',
            centerDescriptionAlignmentDesktop: 'left',
            centerDescriptionAlignmentMobile: 'left',
            rightTitleAlignmentDesktop: 'left',
            rightTitleAlignmentMobile: 'left',
            rightDescriptionAlignmentDesktop: 'left',
            rightDescriptionAlignmentMobile: 'left',
            leftImageAltText: 'Milwaukee Tool Product Image',
            centerImageAltText: 'Milwaukee Tool Product Image',
            rightImageAltText: 'Milwaukee Tool Product Image'
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
                backgroundColor: doc.querySelector('.content-outer').style.backgroundColor === '#DB021D' ? 'red' : 'black',
                leftTitleAlignmentDesktop: columns[0].querySelector('h3').style.textAlign || 'left',
                leftTitleAlignmentMobile: columns[0].querySelector('h3').classList.contains('mobile-text-center') ? 'center' : 'left',
                leftDescriptionAlignmentDesktop: columns[0].querySelector('.story-intro').style.textAlign || 'left',
                leftDescriptionAlignmentMobile: columns[0].querySelector('.story-intro').classList.contains('mobile-text-center') ? 'center' : 'left',
                centerTitleAlignmentDesktop: columns[2].querySelector('h3').style.textAlign || 'left',
                centerTitleAlignmentMobile: columns[2].querySelector('h3').classList.contains('mobile-text-center') ? 'center' : 'left',
                centerDescriptionAlignmentDesktop: columns[2].querySelector('.story-intro').style.textAlign || 'left',
                centerDescriptionAlignmentMobile: columns[2].querySelector('.story-intro').classList.contains('mobile-text-center') ? 'center' : 'left',
                rightTitleAlignmentDesktop: columns[4].querySelector('h3').style.textAlign || 'left',
                rightTitleAlignmentMobile: columns[4].querySelector('h3').classList.contains('mobile-text-center') ? 'center' : 'left',
                rightDescriptionAlignmentDesktop: columns[4].querySelector('.story-intro').style.textAlign || 'left',
                rightDescriptionAlignmentMobile: columns[4].querySelector('.story-intro').classList.contains('mobile-text-center') ? 'center' : 'left'
            };
            console.log('Parsed Three Column Story data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Three Column Story HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating Three Column Story HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        const backgroundColor = formData.backgroundColor === 'red' ? '#DB021D' : '#000000';

        return `
        <!-- START .story-3col -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: ${backgroundColor}; width: 620px;">
            <tr>
                <td class="side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            ${this.getColumnHtml(formData, 'left')}
                            <td class="gap block" style="width: 20px;">&nbsp;</td>
                            ${this.getColumnHtml(formData, 'center')}
                            <td class="gap block" style="width: 20px;">&nbsp;</td>
                            ${this.getColumnHtml(formData, 'right')}
                        </tr>
                    </table>
                </td>
                <td class="side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        <!-- END .story-3col -->
        `;
    },

    getColumnHtml(formData, position) {
        const titleAlignmentDesktopClass = `desktop-text-${formData[position + 'TitleAlignmentDesktop']}`;
        const titleAlignmentMobileClass = `mobile-text-${formData[position + 'TitleAlignmentMobile']}`;
        const descriptionAlignmentDesktopClass = `desktop-text-${formData[position + 'DescriptionAlignmentDesktop']}`;
        const descriptionAlignmentMobileClass = `mobile-text-${formData[position + 'DescriptionAlignmentMobile']}`;

        return `
        <td class="block" style="width: 180px;" valign="top">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                <tr>
                    <td>
                        <div>
                            <a href="${formData[position + 'ImageLink']}" target="_blank" style="color: #ffffff;">
                                <img align="top" alt="${formData[position + 'ImageAltText'] || 'Milwaukee Tool Product Image'}" class="fill no-hover" src="${formData[position + 'ImageUrl']}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="180">
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
                                <td class="${titleAlignmentDesktopClass} ${titleAlignmentMobileClass}" style="text-align: ${formData[position + 'TitleAlignmentDesktop']};">
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
                                <td class="story-intro ${descriptionAlignmentDesktopClass} ${descriptionAlignmentMobileClass}" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; text-align: ${formData[position + 'DescriptionAlignmentDesktop']};">
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
        console.log('Populating Three Column Story form with data:', formData);
        ['left', 'center', 'right'].forEach(position => {
            ['ImageUrl', 'ImageLink', 'Title', 'ButtonText', 'ButtonLink'].forEach(field => {
                const id = `threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}${field}`;
                const element = document.getElementById(id);
                if (element) {
                    element.value = formData[position + field] || '';
                } else {
                    console.warn(`Element with id ${id} not found`);
                }
            });
            
            const descriptionId = `threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}Description`;
            const descriptionElement = document.getElementById(descriptionId);
            if (descriptionElement) {
                descriptionElement.innerHTML = formData[position + 'Description'] || '';
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

            setAlignmentIfExists(`threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}TitleAlignmentDesktop`, formData[position + 'TitleAlignmentDesktop']);
            setAlignmentIfExists(`threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}TitleAlignmentMobile`, formData[position + 'TitleAlignmentMobile']);
            setAlignmentIfExists(`threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}DescriptionAlignmentDesktop`, formData[position + 'DescriptionAlignmentDesktop']);
            setAlignmentIfExists(`threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}DescriptionAlignmentMobile`, formData[position + 'DescriptionAlignmentMobile']);
        });
        
        const backgroundColorRadios = document.querySelectorAll('input[name="threeColumnBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            if (radio) {
                radio.checked = radio.value === formData.backgroundColor;
            } else {
                console.warn(`Radio button for background color not found`);
            }
        });

        document.getElementById('threeColumnLeftImageAltText').value = formData.leftImageAltText || '';
        document.getElementById('threeColumnCenterImageAltText').value = formData.centerImageAltText || '';
        document.getElementById('threeColumnRightImageAltText').value = formData.rightImageAltText || '';
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

            const setupAlignmentButtonListeners = (id, field) => {
                const buttons = document.querySelectorAll(`#${id} .alignment-button`);
                buttons.forEach(button => {
                    button.addEventListener('click', function() {
                        const alignment = button.getAttribute('data-alignment');
                        handleFormFieldChange('threeColumnStory', field, alignment);
                        buttons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                    });
                });
            };

            setupAlignmentButtonListeners(`threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}TitleAlignmentDesktop`, `${position}TitleAlignmentDesktop`);
            setupAlignmentButtonListeners(`threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}TitleAlignmentMobile`, `${position}TitleAlignmentMobile`);
            setupAlignmentButtonListeners(`threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}DescriptionAlignmentDesktop`, `${position}DescriptionAlignmentDesktop`);
            setupAlignmentButtonListeners(`threeColumn${position.charAt(0).toUpperCase() + position.slice(1)}DescriptionAlignmentMobile`, `${position}DescriptionAlignmentMobile`);
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
                    handleFormFieldChange('threeColumnStory', 'leftDescription', leftDescriptionEditor.innerHTML);
                    handleFormFieldChange('threeColumnStory', 'centerDescription', centerDescriptionEditor.innerHTML);
                    handleFormFieldChange('threeColumnStory', 'rightDescription', rightDescriptionEditor.innerHTML);
                } else {
                    alert('Please enter a valid URL that starts with https://');
                }
            });
        });

        const editLinkButtons = document.querySelectorAll('#threeColumnStoryModule .rich-text-toolbar button[data-command="editLink"]');
        editLinkButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            button.replaceWith(button.cloneNode(true));
        });

        const updatedEditLinkButtons = document.querySelectorAll('#threeColumnStoryModule .rich-text-toolbar button[data-command="editLink"]');

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
                            handleFormFieldChange('threeColumnStory', 'leftDescription', leftDescriptionEditor.innerHTML);
                            handleFormFieldChange('threeColumnStory', 'centerDescription', centerDescriptionEditor.innerHTML);
                            handleFormFieldChange('threeColumnStory', 'rightDescription', rightDescriptionEditor.innerHTML);
                        } else {
                            alert('Please enter a valid URL that starts with https://');
                        }
                    }
                }
            });
        });

        const removeLinkButtons = document.querySelectorAll('#threeColumnStoryModule .rich-text-toolbar button[data-command="removeLink"]');
        removeLinkButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            button.replaceWith(button.cloneNode(true));
        });

        const updatedRemoveLinkButtons = document.querySelectorAll('#threeColumnStoryModule .rich-text-toolbar button[data-command="removeLink"]');

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
                        handleFormFieldChange('threeColumnStory', 'leftDescription', leftDescriptionEditor.innerHTML);
                        handleFormFieldChange('threeColumnStory', 'centerDescription', centerDescriptionEditor.innerHTML);
                        handleFormFieldChange('threeColumnStory', 'rightDescription', rightDescriptionEditor.innerHTML);
                    }
                }
            });
        });

        const titleSuperscriptButton = document.querySelector('#threeColumnStoryModule .rich-text-toolbar button[data-command="superscript"]');
        if (titleSuperscriptButton) {
            titleSuperscriptButton.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('threeColumnStory', 'title', document.getElementById('threeColumnLeftTitle').value);
                handleFormFieldChange('threeColumnStory', 'title', document.getElementById('threeColumnCenterTitle').value);
                handleFormFieldChange('threeColumnStory', 'title', document.getElementById('threeColumnRightTitle').value);
            });
        }

        ['Left', 'Center', 'Right'].forEach(position => {
            const element = document.getElementById(`threeColumn${position}ImageAltText`);
            if (element) {
                element.addEventListener('input', function(event) {
                    handleFormFieldChange('threeColumnStory', `${position.toLowerCase()}ImageAltText`, event.target.value);
                });
            }
        });
    }
};

moduleRegistry.register('threeColumnStory', threeColumnStoryModule);

export default threeColumnStoryModule;
