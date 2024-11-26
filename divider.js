import moduleRegistry from './moduleRegistry.js';

const dividerModule = {
    setup() {
        console.log('Divider module setup');
    },

    getPlaceholderData() {
        return {
            type: 'redToBlack'
        };
    },

    parseHtml(html) {
        console.log('Parsing Divider HTML:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        try {
            const parsedData = {
                type: doc.querySelector('.content-outer').style.backgroundColor === '#DB021D' ? 'redToBlack' : 'blackToRed'
            };
            console.log('Parsed Divider data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Divider HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating Divider HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        return this.getHtmlForType(formData.type);
    },

    populateForm(formData) {
        console.log('Populating Divider form with data:', formData);
        const radioButtons = document.querySelectorAll('input[name="dividerType"]');
        radioButtons.forEach(radio => {
            radio.checked = radio.value === formData.type;
        });
    },

    setupEventListeners(handleFormFieldChange) {
        const radioButtons = document.querySelectorAll('input[name="dividerType"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function(event) {
                handleFormFieldChange('divider', 'type', event.target.value);
            });
        });
    },

    getHtmlForType(type) {
        if (type === 'redToBlack') {
            return `
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #DB021D; width: 620px;">
                <tr>
                    <td align="center" class="content-inner" style="width: 580px;" valign="top">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                            <tr class="dark-hide">
                                <td align="center" class="block" style="width: 100%; " valign="top">
                                    <img alt="" class="fill" src="https://files.jarrang.com/Milwaukee/zTemplate/images/images-assets/separator-1.jpg" style="display: block; height: auto; outline: none; text-decoration: none; padding: 0px; text-align: center; width: 100%;" width="620">
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="block" style="width: 100%; background-color:#000000" valign="top">
                                    <div style="clear: both; display: block; font-size: 32px; height: 32px; line-height: 32px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            `;
        } else if (type === 'blackToRed') {
            return `
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #000000; width: 620px;">
                <tr>
                    <td align="center" class="content-inner" style="width: 580px;" valign="top">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                            <tr>
                                <td align="center" class="block" style="width: 100%;" valign="top">
                                    <div style="clear: both; display: block; font-size: 32px; height: 32px; line-height: 32px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr class="dark-hide">
                                <td align="center" class="block" style="width: 100%;" valign="top">
                                    <img class="fill" src="https://files.jarrang.com/Milwaukee/zTemplate/images/images-assets/separator-2.jpg" style="display: block; height: auto; outline: none; text-decoration: none;" width="620">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            `;
        }
    }
};

moduleRegistry.register('divider', dividerModule);

export default dividerModule;