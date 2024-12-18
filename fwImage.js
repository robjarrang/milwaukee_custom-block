import moduleRegistry from './moduleRegistry.js';

const fwImageModule = {
    setup() {
        console.log('Full Width Image module setup');
    },

    getPlaceholderData() {
        return {
            imageUrl: 'https://fakeimg.pl/620x350/dddddd/ffffff',
            imageLink: 'https://milwaukeetool.eu/',
            altText: 'Milwaukee'
        };
    },

    parseHtml(html) {
        console.log('Parsing Full Width Image HTML:', html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        try {
            const parsedData = {
                imageUrl: doc.querySelector('.fill.no-hover')?.src || '',
                imageLink: doc.querySelector('.fill.no-hover')?.closest('a')?.href || '',
                altText: doc.querySelector('.fill.no-hover')?.alt || 'Milwaukee'
            };
            console.log('Parsed Full Width Image data:', parsedData);
            return parsedData;
        } catch (error) {
            console.error('Error parsing Full Width Image HTML', error);
            return this.getPlaceholderData();
        }
    },

    updateHtml(html, formData) {
        console.log('Updating Full Width Image HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        if (!html) {
            return this.getDefaultHtml(formData);
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const imageElement = doc.querySelector('.fill.no-hover');
        if (imageElement) {
            const newImageUrl = formData.imageUrl || formData.imageurl || '';
            imageElement.src = newImageUrl;
            imageElement.setAttribute('src', newImageUrl);
            imageElement.alt = formData.altText || 'Milwaukee';
            imageElement.setAttribute('alt', formData.altText || 'Milwaukee');
            const imageLink = imageElement.closest('a');
            if (imageLink) {
                imageLink.href = formData.imageLink || '#';
            }
        }

        return doc.body.innerHTML;
    },

    populateForm(formData) {
        console.log('Populating Full Width Image form with data:', formData);
        document.getElementById('fwImageUrl').value = formData.imageUrl || formData.imageurl || '';
        document.getElementById('fwImageLink').value = formData.imageLink || '';
        document.getElementById('fwAltText').value = formData.altText || 'Milwaukee';
    },

    setupEventListeners(handleFormFieldChange) {
        ['fwImageUrl', 'fwImageLink', 'fwAltText'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function(event) {
                    const key = id.replace('fw', '').toLowerCase();
                    const formKey = key === 'imageurl' ? 'imageUrl' : key;
                    handleFormFieldChange('fwImage', formKey, event.target.value);
                });
            } else {
                console.warn(`Element with id ${id} not found`);
            }
        });
    },

    getDefaultHtml(formData) {
        return `
        <!-- START .fw-image -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: #DB021D; width: 620px;">
            <tr>
                <td align="center" class="content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="center" class="block" style="width: 100%;" valign="top">
                                <div>
                                    <a href="${formData.imageLink || '#'}" target="_blank">
                                        <img align="top" alt="${formData.altText || 'Milwaukee'}" class="fill no-hover" src="${formData.imageUrl || formData.imageurl || ''}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="620">
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- END .fw-image -->
        `;
    }
};

moduleRegistry.register('fwImage', fwImageModule);

export default fwImageModule;
