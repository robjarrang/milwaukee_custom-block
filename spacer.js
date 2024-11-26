import moduleRegistry from './moduleRegistry.js';

const spacerModule = {
    setup() {
        console.log('Spacer module setup');
    },

    getPlaceholderData() {
        return {
            height: 20
        };
    },

    parseHtml(html) {
        console.log('Parsing Spacer HTML:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        try {
            const divElement = doc.querySelector('.block div');
            const style = divElement.getAttribute('style');
            const heightMatch = style.match(/font-size:\s*(\d+)px/);
            const parsedData = {
                height: heightMatch ? parseInt(heightMatch[1], 10) : 20
            };
            console.log('Parsed Spacer data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Spacer HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating Spacer HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        const height = formData.height || 20;
        return `
        <!-- START .fw-spacer -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #DB021D; width: 620px;">
            <tr>
                <td align="center" class="content-inner" style="width: 580px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td class="block" style="width: 100%;">
                                <div style="clear: both; display: block; font-size: ${height}px; height: ${height}px; line-height: ${height}px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- END .fw-spacer -->
        `;
    },

    populateForm(formData) {
        console.log('Populating Spacer form with data:', formData);
        const slider = document.getElementById('spacerHeight');
        if (slider) {
            slider.value = formData.height || 20;
            const output = document.getElementById('spacerHeightValue');
            if (output) {
                output.textContent = formData.height || 20;
            }
        }
    },

    setupEventListeners(handleFormFieldChange) {
        const slider = document.getElementById('spacerHeight');
        if (slider) {
            slider.addEventListener('input', function(event) {
                const height = parseInt(event.target.value, 10);
                handleFormFieldChange('spacer', 'height', height);
                const output = document.getElementById('spacerHeightValue');
                if (output) {
                    output.textContent = height;
                }
            });
        }
    }
};

moduleRegistry.register('spacer', spacerModule);

export default spacerModule;