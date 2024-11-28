import moduleRegistry from './moduleRegistry.js';

const checklistModule = {
    setup() {
        console.log('Checklist module setup');
    },

    getPlaceholderData() {
        return {
            backgroundColor: 'red',
            items: [
                { text: 'Intro text goes here' },
                { text: 'Intro text goes here' },
                { text: 'Intro text goes here' }
            ]
        };
    },

    parseHtml(html) {
        console.log('Parsing Checklist HTML:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        try {
            const items = Array.from(doc.querySelectorAll('.story-intro.mobile-text-left')).map(item => ({
                text: item.textContent.trim()
            }));
            const parsedData = {
                backgroundColor: doc.querySelector('.content-outer').style.backgroundColor === '#DB021D' ? 'red' : 'black',
                items: items
            };
            console.log('Parsed Checklist data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Checklist HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating Checklist HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        const backgroundColor = formData.backgroundColor === 'red' ? '#DB021D' : '#000000';

        const itemsHtml = formData.items.map(item => `
            <tr>
                <td valign="top">
                    <img src="https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/06914a54-6462-4ecd-a8bf-74c46518351d.png" style="display: block; height: auto; outline: none; text-decoration: none;" width="20">
                </td>
                <td class="gap" style="width: 20px;">&nbsp;</td>
                <td class="story-intro mobile-text-left" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; mso-line-height-rule: exactly; text-align: left;">
                    ${item.text}
                </td>
            </tr>
        `).join('');

        return `
        <!-- START .fw-text -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: ${backgroundColor}; width: 620px;">
            <tr>
                <td class="side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="content-inner" style="width: 580px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="left" class="block" style="width: 100%;">
                                <table border="0" cellpadding="0" cellspacing="0" class="sect" style="width: 100%;">
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 20px; height: 20px; line-height: 20px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="story-intro mobile-text-left" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; mso-line-height-rule: exactly; text-align: left;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                ${itemsHtml}
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style="clear: both; display: block; font-size: 20px; height: 20px; line-height: 20px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
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
        <!-- END .fw-text -->
        `;
    },

    populateForm(formData) {
        console.log('Populating Checklist form with data:', formData);
        const container = document.getElementById('checklistItems');
        if (container) {
            container.innerHTML = '';
            formData.items.forEach((item) => {
                this.addChecklistItem(container, item.text);
            });
        }

        const backgroundColorRadios = document.querySelectorAll('input[name="checklistBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            radio.checked = radio.value === formData.backgroundColor;
        });
    },

    setupEventListeners(handleFormFieldChange) {
        const addButton = document.getElementById('addChecklistItem');
        const container = document.getElementById('checklistItems');

        if (addButton) {
            // Remove any existing event listeners
            addButton.removeEventListener('click', this.handleAddItem);
            // Create a bound event handler
            this.handleAddItem = this.handleAddItem.bind(this, container, handleFormFieldChange);
            // Add new event listener
            addButton.addEventListener('click', this.handleAddItem);
        }

        if (container) {
            container.addEventListener('input', (event) => {
                if (event.target.classList.contains('checklist-item-input')) {
                    this.updateFormData(handleFormFieldChange);
                }
            });

            container.addEventListener('click', (event) => {
                if (event.target.classList.contains('remove-checklist-item')) {
                    const item = event.target.parentElement;
                    if (item && item.classList.contains('checklist-item')) {
                        item.remove();
                        this.updateFormData(handleFormFieldChange);
                    }
                }
            });

            container.addEventListener('click', (event) => {
                if (event.target.classList.contains('edit-checklist-item')) {
                    const item = event.target.parentElement;
                    if (item && item.classList.contains('checklist-item')) {
                        this.editChecklistItem(item);
                    }
                }
            });
        }

        const backgroundColorRadios = document.querySelectorAll('input[name="checklistBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateFormData(handleFormFieldChange);
            });
        });
    },

    handleAddItem(container, handleFormFieldChange, event) {
        console.log('Adding new item');
        if (container) {
            this.addChecklistItem(container, '');
            this.updateFormData(handleFormFieldChange);
        }
    },

    addChecklistItem(container, text) {
        const item = document.createElement('div');
        item.classList.add('checklist-item');
        item.innerHTML = `
            <input type="text" class="checklist-item-input" value="${text}" placeholder="Enter checklist item">
            <button type="button" class="btn btn-edit edit-checklist-item">Edit</button>
            <button type="button" class="btn btn-remove remove-checklist-item">Remove</button>
        `;
        container.appendChild(item);
    },

    updateFormData(handleFormFieldChange) {
        const items = Array.from(document.querySelectorAll('.checklist-item-input')).map(input => ({
            text: input.value
        }));
        const backgroundColorRadio = document.querySelector('input[name="checklistBackgroundColor"]:checked');
        const backgroundColor = backgroundColorRadio ? backgroundColorRadio.value : 'red';
        handleFormFieldChange('checklist', 'items', items);
        handleFormFieldChange('checklist', 'backgroundColor', backgroundColor);
    },

    editChecklistItem(item) {
        const input = item.querySelector('.checklist-item-input');
        if (input) {
            input.focus();
        }
    },

    removeChecklistItem(item) {
        item.remove();
    }
};

moduleRegistry.register('checklist', checklistModule);

export default checklistModule;
