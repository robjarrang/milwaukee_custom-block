import moduleRegistry from './moduleRegistry.js';

const fullWidthTitleModule = {
    setup() {
        console.log('Full Width Title module setup');
    },

    getPlaceholderData() {
        return {
            title: 'Lorem ipsum',
            backgroundColor: 'red',
            titleAlignment: 'center'
        };
    },

    parseHtml(html) {
        console.log('Parsing Full Width Title HTML:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        try {
            const parsedData = {
                title: doc.querySelector('h1')?.textContent?.trim() || '',
                backgroundColor: doc.querySelector('.content-outer').style.backgroundColor === '#DB021D' ? 'red' : 'black',
                titleAlignment: doc.querySelector('td').style.textAlign || 'center'
            };
            console.log('Parsed Full Width Title data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Full Width Title HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating Full Width Title HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        const backgroundColor = formData.backgroundColor === 'red' ? '#DB021D' : '#000000';

        return `
        <!-- START .fw-title -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: ${backgroundColor}; width: 620px;">
            <tr>
                <td class="side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="content-inner" style="width: 580px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="center" class="block" style="width: 100%;">
                                <table border="0" cellpadding="0" cellspacing="0" class="sect" style="width: 100%;">
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 24px; height: 24px; line-height: 24px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="mobile-text-center" style="text-align: ${formData.titleAlignment};">
                                            <h1 style="color: #ffffff; font-family: 'HelveticaNeue-CondensedBold', Arial, sans-serif, 'Open-Sans'; font-size: 36px; font-weight: bold; line-height: 42px; margin: 0; margin-bottom: 0; margin-top: 0; padding-bottom: 0px !important; text-transform: uppercase;">
                                                ${formData.title}
                                            </h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 8px; height: 8px; line-height: 8px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
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
        <!-- END .fw-title -->
        `;
    },

    populateForm(formData) {
        console.log('Populating Full Width Title form with data:', formData);
        document.getElementById('fwTitleText').value = formData.title || '';
        
        const backgroundColorRadios = document.querySelectorAll('input[name="fwTitleBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            radio.checked = radio.value === formData.backgroundColor;
        });

        const setAlignmentIfExists = (id, value) => {
            const element = document.querySelector(`#${id} .alignment-buttons button[data-align="${value}"]`);
            if (element) {
                element.classList.add('active');
            } else {
                console.warn(`Alignment button for ${id} with value ${value} not found`);
            }
        };

        setAlignmentIfExists('fwTitleText', formData.titleAlignment);
    },

    setupEventListeners(handleFormFieldChange) {
        const titleInput = document.getElementById('fwTitleText');
        if (titleInput) {
            titleInput.addEventListener('input', function(event) {
                handleFormFieldChange('fullWidthTitle', 'title', event.target.value);
            });
        } else {
            console.warn('Element with id fwTitleText not found');
        }

        const backgroundColorRadios = document.querySelectorAll('input[name="fwTitleBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            radio.addEventListener('change', function(event) {
                handleFormFieldChange('fullWidthTitle', 'backgroundColor', event.target.value);
            });
        });

        const superscriptButton = document.querySelector('#fullWidthTitleModule .rich-text-toolbar button[data-command="superscript"]');
        if (superscriptButton) {
            superscriptButton.addEventListener('click', function() {
                document.execCommand('superscript');
                handleFormFieldChange('fullWidthTitle', 'title', titleInput.innerHTML);
            });
        }

        const addAlignmentEventListeners = (id, field) => {
            const buttons = document.querySelectorAll(`#${id} .alignment-buttons button`);
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const alignment = button.getAttribute('data-align');
                    handleFormFieldChange('fullWidthTitle', field, alignment);
                });
            });
        };

        addAlignmentEventListeners('fwTitleText', 'titleAlignment');
    }
};

moduleRegistry.register('fullWidthTitle', fullWidthTitleModule);

export default fullWidthTitleModule;
