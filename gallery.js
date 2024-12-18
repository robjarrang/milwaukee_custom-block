import moduleRegistry from './moduleRegistry.js';

const galleryModule = {
    setup() {
        console.log('Gallery module setup');
    },

    getPlaceholderData() {
        return {
            image1: {
                url: 'https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/de10c143-e369-451a-adb6-28266a1961b8.jpg',
                link: 'https://www.instagram.com/milwaukeetooleu/?hl=en'
            },
            image2: {
                url: 'https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/6107f5b9-a91d-4cc0-87ab-3c278659874c.jpg',
                link: 'https://www.instagram.com/milwaukeetooleu/?hl=en'
            },
            image3: {
                url: 'https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/c0c19357-3886-4d09-893a-e0d1011d8828.jpg',
                link: 'https://www.instagram.com/milwaukeetooleu/?hl=en'
            },
            image4: {
                url: 'https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/d1d5fe5a-b14f-4a31-8ab1-32b97ed6ff14.jpg',
                link: 'https://www.instagram.com/milwaukeetooleu/?hl=en'
            },
            image1AltText: 'Milwaukee Tool Product Image',
            image2AltText: 'Milwaukee Tool Product Image',
            image3AltText: 'Milwaukee Tool Product Image',
            image4AltText: 'Milwaukee Tool Product Image'
        };
    },

    updateHtml(html, formData) {
        console.log('Updating Gallery HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }

        return `
        <!-- START .gallery-02 -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="imp content-outer" role="presentation" style="background-color: #DB021D; color: #ffffff; width: 620px;">
            <tr>
                <td class="imp side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="imp content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="imp sect" role="presentation" style="width: 580px;">
                        <tr>
                            <td align="left" class="imp block story-intro" style="background-color: #B50018; margin: 0; width: 180px;" valign="top">
                                <div class="imp image">
                                    <a href="${formData.image1.link}" target="_blank">
                                        <img align="top" alt="${formData.image1AltText || 'Milwaukee Tool Product Image'}" class="imp fill no-hover" src="${formData.image1.url}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="186">
                                    </a>
                                </div>
                            </td>
                            <td class="imp gap block" style="width: 10px;">&nbsp;</td>
                            <td align="left" class="imp block" style="width: 370px;" valign="top">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" class="imp sect" role="presentation" style="width: 100%;">
                                    <tr>
                                        <td align="left" class="imp block" style="width: 100%;" valign="top">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="imp sect" role="presentation" style="width: 100%;">
                                                <tr>
                                                    <td align="left" class="imp block story-intro" style="background-color: #B50018; margin: 0;" valign="top">
                                                        <div class="imp image">
                                                            <a href="${formData.image2.link}" target="_blank">
                                                                <img align="top" alt="${formData.image2AltText || 'Milwaukee Tool Product Image'}" class="imp fill no-hover" src="${formData.image2.url}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="186">
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td class="imp gap block" style="width: 10px;">&nbsp;</td>
                                                    <td align="left" class="imp block story-intro" style="background-color: #B50018; margin: 0;" valign="top">
                                                        <div class="imp image">
                                                            <a href="${formData.image3.link}" target="_blank">
                                                                <img align="top" alt="${formData.image3AltText || 'Milwaukee Tool Product Image'}" class="imp fill no-hover" src="${formData.image3.url}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="186">
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="imp" style="clear: both; display: block; font-size: 10px; height: 10px; line-height: 10px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td align="left" class="imp block story-intro" style="background-color: #B50018; margin: 0; width: 100%;" valign="top">
                                            <div class="imp image">
                                                <a href="${formData.image4.link}" target="_blank">
                                                    <img align="top" alt="${formData.image4AltText || 'Milwaukee Tool Product Image'}" class="imp fill no-hover" src="${formData.image4.url}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="382">
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="imp side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        <!-- END .gallery-02 -->
        `;
    },

    populateForm(formData) {
        console.log('Populating Gallery form with data:', formData);
        for (let i = 1; i <= 4; i++) {
            const urlInput = document.getElementById(`galleryImage${i}Url`);
            const linkInput = document.getElementById(`galleryImage${i}Link`);
            const altTextInput = document.getElementById(`galleryImage${i}AltText`);
            
            if (urlInput && formData[`image${i}`]) {
                urlInput.value = formData[`image${i}`].url || '';
            }
            if (linkInput && formData[`image${i}`]) {
                linkInput.value = formData[`image${i}`].link || '';
            }
            if (altTextInput) {
                altTextInput.value = formData[`image${i}AltText`] || 'Milwaukee Tool Product Image';
            }
        }
    },

    setupEventListeners(handleFormFieldChange) {
        for (let i = 1; i <= 4; i++) {
            const urlInput = document.getElementById(`galleryImage${i}Url`);
            const linkInput = document.getElementById(`galleryImage${i}Link`);
            const altTextInput = document.getElementById(`galleryImage${i}AltText`);
    
            if (urlInput) {
                urlInput.addEventListener('input', function(event) {
                    handleFormFieldChange('gallery', `image${i}`, {
                        url: event.target.value,
                        link: linkInput ? linkInput.value : '',
                        altText: altTextInput ? altTextInput.value : 'Milwaukee Tool Product Image'
                    });
                });
            }
    
            if (linkInput) {
                linkInput.addEventListener('input', function(event) {
                    handleFormFieldChange('gallery', `image${i}`, {
                        url: urlInput ? urlInput.value : '',
                        link: event.target.value,
                        altText: altTextInput ? altTextInput.value : 'Milwaukee Tool Product Image'
                    });
                });
            }
    
            if (altTextInput) {
                altTextInput.addEventListener('input', function(event) {
                    handleFormFieldChange('gallery', `image${i}AltText`, event.target.value);
                });
            }
        }
    }
};

moduleRegistry.register('gallery', galleryModule);

export default galleryModule;