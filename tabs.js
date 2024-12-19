import moduleRegistry from './moduleRegistry.js';

const tabsModule = {
    setup() {
        console.log('Tabs module setup');
    },

    getPlaceholderData() {
        return {
            tab1: {
                name: 'Softshell Hooded',
                subtext: 'Jacket',
                imageUrl: 'https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/56e7bae0-4fdc-49b5-b6ee-b9999bf6263e.png',
                imageAltText: 'Softshell Hooded Jacket',
                title: 'FREEFLEX™ Softshell Hooded Jacket Black',
                buttonText: 'VIEW IT NOW',
                buttonLink: 'https://uk.milwaukeetool.eu/en-gb/freeflex-softshell-hooded-jacket-black/sj-bl/',
                features: [
                    '2-way stretch fabric',
                    'Brushed fleece lining',
                    'Reinforced 3-Pocket Design'
                ]
            },
            tab2: {
                name: 'Work',
                subtext: 'Jacket',
                imageUrl: 'https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/71a27bea-dbb6-4c28-9aeb-f0a4c33dab19.png',
                imageAltText: 'FREEFLEX Work Jacket',
                title: 'FREEFLEX™ Work Jacket Black',
                buttonText: 'VIEW IT NOW',
                buttonLink: 'https://uk.milwaukeetool.eu/en-gb/freeflex-work-jacket-black/wj-bl/',
                features: [
                    'Custom action back design for added movement',
                    'Insulated quilted lining',
                    'Reinforced 6-pocket design'
                ]
            }
        };
    },

    updateHtml(html, formData) {
        if (!formData) {
            formData = this.getPlaceholderData();
        }
        
        const { tab1, tab2 } = formData;

        return `
        <style type="text/css">
            @media screen and (-webkit-min-device-pixel-ratio: 0) {
                #cbox:checked + .fallback {display:none!important;}
                #cbox:checked + .interactive {display:block!important; max-height:none!important; position: relative; overflow: visible!important;}

                /* Tabs */
                label {display: inline-block; -webkit-tap-highlight-color: transparent; cursor: pointer;}
                .tab2content {display: none!important;}
                #tab2:checked ~ .interactive tr td .tab1content {display: none!important;}
                #tab1:checked ~ .interactive tr td .tab1content,
                #tab2:checked ~ .interactive tr td .tab2content {display: block!important;}
                #tab2:checked ~ .interactive tr td.tab1 {background-image: url('https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/d3450965-eae4-4076-bb1d-efb789db0cf9.png')!important;}
                #tab2:checked ~ .interactive tr td.tab2 {background-image: url('https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/85f919b7-8ecd-4318-ac2e-e1e0e693008a.png')!important;}
            }
        </style>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
            <tr>
                <td align="center" style="font-size:20px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
                        <tr>
                            <td bgcolor="#db011c" id="tabs" style="text-align: center; padding: 0 0 0 0;">
                                <!--[if !mso]><!-- -->
                                <input id="tab1" name="tabs" style="display: none; max-height: 0; overflow: hidden;" type="radio" checked>
                                <input id="tab2" name="tabs" style="display: none; max-height: 0; overflow: hidden;" type="radio">
                                <input checked="checked" id="cbox" name="cbox" style="display: none; max-height: 0; visibility: hidden;" type="checkbox">
                                <div class="interactive" style="display: none; max-height: 0; overflow: hidden;">
                                    ${this.getTabContent(tab1, tab2)}
                                </div>
                                <!--<![endif]-->
                                <div class="fallback">
                                    ${this.getFallbackContent(tab1)}
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`;
    },

    getTabContent(tab1, tab2) {
        return `
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="fullWidthAuto" role="presentation" style="width: 620px; margin: 0 auto;" width="620">
                <tr>
                    <td valign="bottom" width="50%">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto;" width="100%">
                            <tr>
                                <td align="center" class="tab1" style="background-image:url('https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/fa48467a-6e12-46fa-b911-7a53bc4edbdf.png'); background-size: cover; background-repeat:no-repeat; background-position:center;">
                                    <label for="tab1" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 20px; margin: 0; margin-bottom: 0; margin-top: 0; padding: 20px 0; text-transform: uppercase; width: 100%;">${tab1.name}<br class="mobile-hide">${tab1.subtext}</label>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td valign="bottom" width="50%">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto;" width="100%">
                            <tr>
                                <td align="center" class="tab2" style="background-image:url('https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/0dbb9e2d-fb9f-4730-af41-660665e48ea0.png'); background-size: cover; background-repeat:no-repeat; background-position:center;">
                                    <label for="tab2" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 20px; margin: 0; margin-bottom: 0; margin-top: 0; padding: 20px 0; text-transform: uppercase; width: 100%;">${tab2.name}<br>${tab2.subtext}</label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="tabscontent" colspan="2" valign="top" width="100%">
                        <div class="tab1content">
                            ${this.getTabItemContent(tab1)}
                        </div>
                        <div class="tab2content">
                            ${this.getTabItemContent(tab2)}
                        </div>
                    </td>
                </tr>
            </table>`;
    },

    getTabItemContent(tab) {
        return `
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
                <tr>
                    <td align="left" style="font-size:1px; line-height:0; -webkit-text-size-adjust:none; padding:0px 0px 0px 0px" width="100%">
                        <a href="${tab.buttonLink}" target="_blank">
                            <img border="0" class="fill" height="400" src="${tab.imageUrl}" style="display:block;" width="620" alt="${tab.imageAltText}">
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div style="clear: both; display: block; font-size: 24px; height: 24px; line-height: 32px; margin: 0px; mso-line-height-rule: exactly; padding: 0px;">&nbsp;</div>
                    </td>
                </tr>
                <tr>
                    <td class="mobile-text-center" style="text-align: left;">
                        <h2 style="color: rgb(255, 255, 255); font-family: Helvetica-Neue, sans-serif, Open-Sans; font-size: 28px; font-weight: bold; line-height: 32px; margin: 0px; text-transform: uppercase; padding-bottom: 0px !important; text-align: center;">
                            ${tab.title}
                        </h2>
                    </td>
                </tr>
                <tr>
                    <td align="left" class="story-intro mobile-text-left" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0; mso-line-height-rule: exactly; text-align: left; padding: 0 70px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            ${this.getFeaturesList(tab.features)}
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px 0">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="button button-1 button-mobile-center" role="presentation" style="background-color: transparent; border: 2px solid #ffffff; border-radius: 0; line-height: 100%; margin-bottom: 0; mso-para-margin-bottom: 0px;">
                            <tr>
                                <td align="center" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; padding: 6px 20px; text-align: center; text-transform: uppercase; width: 100%; mso-text-raise: 6px;">
                                    <a href="${tab.buttonLink}" style="color:#ffffff;text-decoration:none;" target="_blank">${tab.buttonText}</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>`;
    },

    getFallbackContent(tab) {
        // Return fallback content for non-interactive email clients
        return `
            <a href="${tab.buttonLink}" target="_blank">
                <img alt="${tab.imageAltText}" src="${tab.imageUrl}" style="display:block;" width="620">
            </a>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                <tr>
                    <td style="padding: 32px 20px;">
                        <h2 style="color: #ffffff; font-family: Helvetica-Neue, sans-serif, Open-Sans; font-size: 28px; font-weight: bold; line-height: 32px; margin: 0; text-transform: uppercase; text-align: center;">${tab.title}</h2>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 20px auto;">
                            ${this.getFeaturesList(tab.features)}
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="button button-1" role="presentation" style="margin: 20px auto; background-color: transparent; border: 2px solid #ffffff;">
                            <tr>
                                <td align="center" style="padding: 8px 20px;">
                                    <a href="${tab.buttonLink}" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif; font-size: 16px; font-weight: bold; line-height: 24px; text-decoration: none; text-transform: uppercase;" target="_blank">${tab.buttonText}</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>`;
    },

    getFeaturesList(features) {
        return features.map(feature => `
            <tr>
                <td valign="top">
                    <img src="https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/06914a54-6462-4ecd-a8bf-74c46518351d.png" style="display: block; height: auto; outline: none; text-decoration: none;" width="20">
                </td>
                <td class="gap" style="width: 20px;">&nbsp;</td>
                <td class="story-intro mobile-text-left" style="color: #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 20px; font-weight: normal; line-height: 24px; margin: 0; text-align: left;">
                    ${feature}
                </td>
            </tr>
        `).join('');
    },

    populateForm(formData) {
        const data = formData || this.getPlaceholderData();
        
        ['1', '2'].forEach(tabNum => {
            const tab = data[`tab${tabNum}`];
            document.getElementById(`tabName${tabNum}`).value = tab.name;
            document.getElementById(`tabSubtext${tabNum}`).value = tab.subtext;
            document.getElementById(`tabImageUrl${tabNum}`).value = tab.imageUrl;
            document.getElementById(`tabImageAltText${tabNum}`).value = tab.imageAltText;
            document.getElementById(`tabTitle${tabNum}`).value = tab.title;
            document.getElementById(`tabButtonText${tabNum}`).value = tab.buttonText;
            document.getElementById(`tabButtonLink${tabNum}`).value = tab.buttonLink;
            
            tab.features.forEach((feature, index) => {
                document.getElementById(`tabFeature${tabNum}_${index + 1}`).value = feature;
            });
        });
    },

    setupEventListeners(handleFormFieldChange) {
        const fields = ['Name', 'Subtext', 'ImageUrl', 'ImageAltText', 'Title', 'ButtonText', 'ButtonLink'];
        
        ['1', '2'].forEach(tabNum => {
            fields.forEach(field => {
                const element = document.getElementById(`tab${field}${tabNum}`);
                if (element) {
                    element.addEventListener('input', (event) => {
                        const currentData = this.getFormData();
                        currentData[`tab${tabNum}`][field.toLowerCase()] = event.target.value;
                        handleFormFieldChange('tabs', `tab${tabNum}`, currentData[`tab${tabNum}`]);
                    });
                }
            });

            // Handle features
            [1, 2, 3].forEach(featureNum => {
                const element = document.getElementById(`tabFeature${tabNum}_${featureNum}`);
                if (element) {
                    element.addEventListener('input', (event) => {
                        const currentData = this.getFormData();
                        currentData[`tab${tabNum}`].features[featureNum - 1] = event.target.value;
                        handleFormFieldChange('tabs', `tab${tabNum}`, currentData[`tab${tabNum}`]);
                    });
                }
            });
        });
    },

    getFormData() {
        const data = {
            tab1: { features: [] },
            tab2: { features: [] }
        };

        ['1', '2'].forEach(tabNum => {
            const tab = data[`tab${tabNum}`];
            tab.name = document.getElementById(`tabName${tabNum}`).value;
            tab.subtext = document.getElementById(`tabSubtext${tabNum}`).value;
            tab.imageUrl = document.getElementById(`tabImageUrl${tabNum}`).value;
            tab.imageAltText = document.getElementById(`tabImageAltText${tabNum}`).value;
            tab.title = document.getElementById(`tabTitle${tabNum}`).value;
            tab.buttonText = document.getElementById(`tabButtonText${tabNum}`).value;
            tab.buttonLink = document.getElementById(`tabButtonLink${tabNum}`).value;
            
            [1, 2, 3].forEach(featureNum => {
                tab.features.push(document.getElementById(`tabFeature${tabNum}_${featureNum}`).value);
            });
        });

        return data;
    }
};

moduleRegistry.register('tabs', tabsModule);

export default tabsModule;
