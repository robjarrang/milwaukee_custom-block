import moduleRegistry from './moduleRegistry.js';

const fwButtonModule = {
    setup() {
        console.log('Full Width Button module setup');
    },

    getPlaceholderData() {
        return {
            buttonTitle: 'Button title',
            buttonLink: 'https://www.milwaukeetool.eu/',
            backgroundColor: 'black'
        };
    },

    parseHtml(html) {
        console.log('Parsing Full Width Button HTML:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        try {
            const parsedData = {
                buttonTitle: doc.querySelector('.button-1 a').textContent.trim(),
                buttonLink: doc.querySelector('.button-1 a').href,
                backgroundColor: doc.querySelector('.content-outer').style.backgroundColor === '#DB021D' ? 'red' : 'black'
            };
            console.log('Parsed Full Width Button data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Full Width Button HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating Full Width Button HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        const backgroundColor = formData.backgroundColor === 'red' ? '#DB021D' : '#000000';
        const spacerHeight = formData.backgroundColor === 'red' ? '8px' : '10px';

        return `
        <!-- START .fw-button -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: ${backgroundColor}; width: 620px;">
            <tr>
                <td class="side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                        <tr>
                            <td>
                                <div style="clear: both; display: block; font-size: ${spacerHeight}; height: ${spacerHeight}; line-height: ${spacerHeight}; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                                    <tr>
                                        <td align="center" class="block" style="width: 100%;" valign="middle">
                                            <table border="0" cellpadding="0" cellspacing="0" class="button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px;">
                                                <tr>
                                                    <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%; mso-text-raise: 6px;">
                                                        <a href="${formData.buttonLink}" style="color: #ffffff; text-decoration: none;" target="_blank">${formData.buttonTitle}</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="clear: both; display: block; font-size: ${spacerHeight}; height: ${spacerHeight}; line-height: ${spacerHeight}; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        <!-- END .fw-button -->
        `;
    },

    populateForm(formData) {
        console.log('Populating Full Width Button form with data:', formData);
        document.getElementById('fwButtonTitle').value = formData.buttonTitle || '';
        document.getElementById('fwButtonLink').value = formData.buttonLink || '';
        const radioButtons = document.querySelectorAll('input[name="fwButtonBackground"]');
        radioButtons.forEach(radio => {
            radio.checked = radio.value === formData.backgroundColor;
        });
    },

    setupEventListeners(handleFormFieldChange) {
        ['fwButtonTitle', 'fwButtonLink'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function(event) {
                    const key = id.replace('fwButton', '').toLowerCase();
                    handleFormFieldChange('fwButton', key, event.target.value);
                });
            } else {
                console.warn(`Element with id ${id} not found`);
            }
        });

        const radioButtons = document.querySelectorAll('input[name="fwButtonBackground"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function(event) {
                handleFormFieldChange('fwButton', 'backgroundColor', event.target.value);
            });
        });
    }
};

moduleRegistry.register('fwButton', fwButtonModule);

export default fwButtonModule;