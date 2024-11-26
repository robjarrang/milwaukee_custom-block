import moduleRegistry from './moduleRegistry.js';

const gridModule = {
    setup() {
        console.log('Grid module setup');
    },

    getPlaceholderData() {
        return {
            gridImage1: 'https://fakeimg.pl/280x280/000000/383838',
            gridImage2: 'https://fakeimg.pl/280x280/000000/383838',
            title1: 'Title 1 goes here',
            title2: 'Title 2 goes here',
            buttonText1: 'Find Out More',
            buttonText2: 'Find Out More',
            buttonLink1: 'https://www.milwaukeetool.eu/',
            buttonLink2: 'https://www.milwaukeetool.eu/',
            backgroundColor: 'red'
        };
    },

    updateHtml(html, formData) {
        console.log('Updating Grid HTML with form data:', formData);
        if (!formData) {
            console.warn('Form data is undefined, using placeholder data');
            formData = this.getPlaceholderData();
        }
        const backgroundColor = formData.backgroundColor === 'red' ? '#DB021D' : '#000000';

        return `
        <!-- START .story-2col -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: ${backgroundColor}; width: 620px;">
            <tr>
                <td class="side" style="width: 20px;">&nbsp;</td>
                <td align="center" class="content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            ${this.getGridColumnHtml(formData, 1)}
                            <td class="gap block" style="width: 20px;">&nbsp;</td>
                            ${this.getGridColumnHtml(formData, 2)}
                        </tr>
                    </table>
                </td>
                <td class="side" style="width: 20px;">&nbsp;</td>
            </tr>
        </table>
        <!-- END .story-2col -->
        <!-- START .fw-spacer -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="content-outer" role="presentation" style="background-color: ${backgroundColor}; width: 620px;">
            <tr>
                <td align="center" class="content-inner" style="width: 580px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td class="block" style="width: 100%;">
                                <div style="clear: both; display: block; font-size: 8px; height: 8px; line-height: 8px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- END .fw-text -->
        `;
    },

    getGridColumnHtml(formData, columnNumber) {
        const imageUrl = formData[`gridImage${columnNumber}`];
        const title = formData[`title${columnNumber}`];
        const buttonText = formData[`buttonText${columnNumber}`];
        const buttonLink = formData[`buttonLink${columnNumber}`];

        return `
        <td align="center" class="block" style="width: 280px;" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td background="${imageUrl}" bgcolor="#000000" style="background-size: cover;" valign="top">
                        <!--[if gte mso 9]>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:280px;">
                        <v:fill type="frame" src="${imageUrl}" color="#ffffff" />
                        <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                        <![endif]-->
                        <div>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                                <tr>
                                    <td align="center" style="padding-bottom: 8px; padding-top: 8px;">
                                        <table border="0" cellpadding="0" cellspacing="0" class="sect" style="width: 100%;">
                                            <tr>
                                                <td>
                                                    <div style="clear: both; display: block; font-size: 80px; height: 80px; line-height: 80px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="mobile-text-center" style="text-align: center;">
                                                    <h3 style="color: #ffffff; font-family: 'HelveticaNeue-CondensedBold', Arial, sans-serif, 'Open-Sans'; font-size: 32px; font-stretch: condensed; font-weight: bold; line-height: 32px; margin: 0; margin-bottom: 0; margin-top: 0; text-transform: uppercase;">
                                                        ${title}
                                                    </h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div style="clear: both; display: block; font-size: 24px; height: 24px; line-height: 24px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                                                        <tr>
                                                            <td align="center" class="block" style="width: 100%;" valign="top">
                                                                <table border="0" cellpadding="0" cellspacing="0" class="button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px;">
                                                                    <tr>
                                                                        <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%; mso-text-raise: 6px;">
                                                                            <a href="${buttonLink}" style="color: #ffffff; text-decoration: none;" target="_blank">${buttonText}</a>
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
                                                    <div style="clear: both; display: block; font-size: 80px; height: 80px; line-height: 80px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if gte mso 9]>
                        </v:textbox>
                        </v:rect>
                        <![endif]-->
                    </td>
                </tr>
            </table>
        </td>
        `;
    },

    populateForm(formData) {
        console.log('Populating Grid form with data:', formData);
        document.getElementById('gridImage1').value = formData.gridImage1 || '';
        document.getElementById('gridImage2').value = formData.gridImage2 || '';
        document.getElementById('gridTitle1').value = formData.title1 || '';
        document.getElementById('gridTitle2').value = formData.title2 || '';
        document.getElementById('gridButtonText1').value = formData.buttonText1 || '';
        document.getElementById('gridButtonText2').value = formData.buttonText2 || '';
        document.getElementById('gridButtonLink1').value = formData.buttonLink1 || '';
        document.getElementById('gridButtonLink2').value = formData.buttonLink2 || '';
        
        const backgroundColorRadios = document.querySelectorAll('input[name="gridBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            radio.checked = radio.value === formData.backgroundColor;
        });
    },

    setupEventListeners(handleFormFieldChange) {
        ['gridImage1', 'gridImage2', 'gridTitle1', 'gridTitle2', 'gridButtonText1', 'gridButtonText2', 'gridButtonLink1', 'gridButtonLink2'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function(event) {
                    let key = id;
                    if (id.startsWith('gridImage')) {
                        key = id; // Keep 'gridImage1' and 'gridImage2' as is
                    } else if (id.startsWith('gridTitle')) {
                        key = 'title' + id.slice(-1); // 'gridTitle1' becomes 'title1'
                    } else if (id.startsWith('gridButtonText')) {
                        key = 'buttonText' + id.slice(-1); // 'gridButtonText1' becomes 'buttonText1'
                    } else if (id.startsWith('gridButtonLink')) {
                        key = 'buttonLink' + id.slice(-1); // 'gridButtonLink1' becomes 'buttonLink1'
                    }
                    handleFormFieldChange('grid', key, event.target.value);
                });
            } else {
                console.warn(`Element with id ${id} not found`);
            }
        });

        const backgroundColorRadios = document.querySelectorAll('input[name="gridBackgroundColor"]');
        backgroundColorRadios.forEach(radio => {
            radio.addEventListener('change', function(event) {
                handleFormFieldChange('grid', 'backgroundColor', event.target.value);
            });
        });
    }
};

moduleRegistry.register('grid', gridModule);

export default gridModule;