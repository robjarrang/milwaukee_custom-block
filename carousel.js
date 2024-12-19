import moduleRegistry from './moduleRegistry.js';

const carouselModule = {
    setup() {
        console.log('Carousel module setup');
        this.setupAddRemoveButtons();
    },

    setupAddRemoveButtons() {
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Slide';
        addButton.className = 'btn btn-add';
        addButton.onclick = (e) => {
            e.preventDefault(); // Prevent form submission
            this.addSlide();
            return false;
        };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Last Slide';
        removeButton.className = 'btn btn-remove';
        removeButton.onclick = (e) => {
            e.preventDefault(); // Prevent form submission
            this.removeSlide();
            return false;
        };

        const container = document.querySelector('#carouselModule');
        container.insertBefore(addButton, container.firstChild);
        container.insertBefore(removeButton, container.firstChild);
    },

    addSlide() {
        const currentData = this.getFormData();
        const slideCount = currentData.slides.length;
        if (slideCount >= 10) return; // Maximum 10 slides

        const slideNum = slideCount + 1;
        const slideHTML = this.createSlideHTML(slideNum);
        
        // Insert before the fallback details section
        const fallbackDetails = document.querySelector('#carouselModule details:last-child');
        fallbackDetails.insertAdjacentHTML('beforebegin', slideHTML);
        
        // Add new slide data
        currentData.slides.push({
            imageUrl: 'https://fakeimg.pl/620x350/dddddd/ffffff',
            imageAltText: 'Milwaukee Tool Product Image',
            title: 'Product Title',
            buttonText: 'View More',
            buttonUrl: '#'
        });

        // Update form with new data
        this.populateForm(currentData);
        
        // Notify parent about data change
        if (this._handleFormFieldChange) {
            this._handleFormFieldChange('carousel', 'slides', currentData.slides);
        }
    },

    removeSlide() {
        const currentData = this.getFormData();
        if (currentData.slides.length <= 1) return; // Keep at least 1 slide

        const slides = document.querySelectorAll('#carouselModule details:not(:last-child)');
        slides[slides.length - 1].remove();
        
        // Remove last slide from data
        currentData.slides.pop();
        
        // Update form with new data
        this.populateForm(currentData);
        
        // Notify parent about data change
        if (this._handleFormFieldChange) {
            this._handleFormFieldChange('carousel', 'slides', currentData.slides);
        }
    },

    createSlideHTML(slideNum) {
        return `
            <details>
                <summary>Slide ${slideNum}</summary>
                <div class="form-group">
                    <label for="carouselSlide${slideNum}ImageUrl">Image URL</label>
                    <input type="text" id="carouselSlide${slideNum}ImageUrl" name="carouselSlide${slideNum}ImageUrl">
                </div>
                <div class="form-group">
                    <label for="carouselSlide${slideNum}AltText">Image Alt Text</label>
                    <input type="text" id="carouselSlide${slideNum}AltText" name="carouselSlide${slideNum}AltText">
                </div>
                <div class="form-group">
                    <label for="carouselSlide${slideNum}Title">Title</label>
                    <input type="text" id="carouselSlide${slideNum}Title" name="carouselSlide${slideNum}Title">
                </div>
                <div class="form-group">
                    <label for="carouselSlide${slideNum}ButtonText">Button Text</label>
                    <input type="text" id="carouselSlide${slideNum}ButtonText" name="carouselSlide${slideNum}ButtonText">
                </div>
                <div class="form-group">
                    <label for="carouselSlide${slideNum}ButtonUrl">Button URL</label>
                    <input type="text" id="carouselSlide${slideNum}ButtonUrl" name="carouselSlide${slideNum}ButtonUrl">
                </div>
            </details>`;
    },

    getPlaceholderData() {
        return {
            slides: Array(5).fill({
                imageUrl: 'https://fakeimg.pl/620x350/dddddd/ffffff',
                imageAltText: 'Milwaukee Tool Product Image',
                title: 'Product Title',
                buttonText: 'View More',
                buttonUrl: '#'
            }),
            fallbackImageUrl: 'https://fakeimg.pl/620x350/dddddd/ffffff',
            fallbackAltText: 'Milwaukee Tool Product Image',
            fallbackLink: '#',
            backgroundImage: 'https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/20c03164-65c7-40d7-b0e9-0e1375c507a6.jpg'
        };
    },

    updateHtml(html, formData) {
        const slides = formData.slides || [];
        const totalSlides = slides.length;
        const slideWidth = 620; // Base slide width
        const carouselWidth = slideWidth * totalSlides;
        const slideTransition = 100 / totalSlides;
        const mobileSlidesWidth = totalSlides * 100;

        const dynamicStyles = `
            @media only screen and (max-width: 480px) {
                #carousel .frames {
                    min-width: ${mobileSlidesWidth}% !important;
                }
                #carousel .frames .frame {
                    width: ${slideTransition}% !important;
                }
            }
            @media screen and (-webkit-min-device-pixel-ratio: 0) {
                #carousel .frames {
                    min-width: ${carouselWidth}px;
                }
                ${slides.map((_, i) => `
                    #carousel #arrow_${i + 1}:checked ~ .frames {
                        -webkit-transform: translateX(-${i * slideTransition}%);
                        transform: translateX(-${i * slideTransition}%);
                    }
                `).join('\n')}
            }`;

        const fallback = {
            imageUrl: formData.fallbackImageUrl || this.getPlaceholderData().fallbackImageUrl,
            altText: formData.fallbackAltText || this.getPlaceholderData().fallbackAltText,
            link: formData.fallbackLink || this.getPlaceholderData().fallbackLink
        };
        const bgImage = formData.backgroundImage || this.getPlaceholderData().backgroundImage;

        return `
        <style type="text/css">
            /* Email client specific styles */
            *,
            *:after,
            *:before {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }

            * {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }

            html,
            body,
            .document {
                width: 100% !important;
                height: 100% !important;
                margin: 0;
                padding: 0;
            }

            body {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
            }

            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }

            .ExternalClass * {
                line-height: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            table {
                border-spacing: 0;
                border-collapse: collapse;
                margin: 0 auto;
            }

            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
            }

            *[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
            }

            .x-gmail-data-detectors,
            .x-gmail-data-detectors *,
            .aBn {
                border-bottom: 0 !important;
                cursor: default !important;
            }

            .outlookNone {
                display: none;
            }

            input[type="radio"] {
                display: none;
                display: none !important;
                opacity: 0;
                max-height: 0;
                visibility: hidden;
            }

            @media only screen and (max-width: 480px) {
                .desktop {
                    display: none !important;
                }

                .mobile {
                    display: block !important;
                    width: auto !important;
                    max-height: inherit !important;
                }

                .outlookNone {
                    display: inline-block !important;
                }

                .fullWidth {
                    width: 100% !important;
                    min-width: 0px !important
                }

                .fullWidthAuto {
                    height: auto !important;
                    width: 100% !important
                }
            }
        </style><!--[if !mso]><!-- -->
        <style type="text/css">
            @media screen and (-webkit-min-device-pixel-ratio: 0) {

                #cbox:checked+.fallback {
                    display: none !important;
                }

                #cbox:checked+.interactive {
                    display: block !important;
                    max-height: none !important;
                    position: relative;
                    overflow: visible !important;
                }

                /* Carousel */
                #carousel {
                    width: 100vw;
                    max-width: 620px;
                    height: 100%;
                    display: block;
                    margin: auto;
                    position: relative;
                    overflow: hidden;
                    background-image: url('https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/20c03164-65c7-40d7-b0e9-0e1375c507a6.jpg');
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                #carousel .controls {
                    margin-left: auto;
                    margin-right: auto;
                    max-height: 0;
                    overflow: visible;
                }

                #carousel .frames {
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                    margin: 0 auto;
                    -webkit-transform: translateX(0);
                    transform: translateX(0);
                    -webkit-transition: -webkit-transform .8s cubic-bezier(0.77, 0, 0.175, 1);
                    transition: transform .8s cubic-bezier(0.77, 0, 0.175, 1);
                }

                #carousel .frames .frame {
                    float: left;
                    position: relative;
                }

                #carousel .frames .frame a {
                    display: block;
                }

                #carousel .frames .frame img {
                    width: 100%;
                    height: auto;
                }

                #carousel .frames .frame .carTitle {
                    Margin: 0 0 10px 0;
                    font-family: 'HelveticaNeue-CondensedBold', Arial, sans-serif, 'Open-Sans';
                    font-size: 26px;
                    font-weight: bold;
                    line-height: 32px;
                    color: #ffffff;
                    text-align: center;
                    text-transform: uppercase;
                }

                #carousel .arrows {
                    display: none;
                    margin-left: 0;
                    position: relative;
                    cursor: pointer;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    -webkit-tap-highlight-color: transparent;
                    font-size: 0px;
                }

                #carousel .progressBar {
                    margin-top: 30px;
                    margin-bottom: 30px;
                    transition: all 500ms ease-in-out;
                }

                #carousel .progress {
                    background: #ffffff;
                    opacity: 0.5;
                    border-radius: 50%;
                    width: 8px;
                    height: 8px;
                    display: inline-block;
                    margin: 0 4px;
                }

                /* Control the horisontal postition of arrows with 'width' */
                #carousel .controls {
                    width: 90%;
                }

                /* Control the vertical postition of arrows with margin top / Update size and look of arrows */
                #carousel .arrows {
                    margin-top: -58px;
                    height: 40px;
                    width: 40px;
                    background-image: url('https://image.mail.milwaukeetool.eu/lib/fe2f11717564047a761c78/m/1/0df10d87-1c98-4868-9fdf-0a71e8caaefd.png');
                }

                #carousel .frames {
                    min-width: 3100px;
                }

                /* Desktop email width multiply by number of frames' */
                #carousel .frames .frame {
                    width: 620px;
                }

                /* Desktop email width */

                #carousel #arrow_1:checked~.frames {
                    -webkit-transform: translateX(0);
                    transform: translateX(0);
                }

                #carousel #arrow_2:checked~.frames {
                    -webkit-transform: translateX(-20%);
                    transform: translateX(-20%);
                }

                #carousel #arrow_3:checked~.frames {
                    -webkit-transform: translateX(-40%);
                    transform: translateX(-40%);
                }

                #carousel #arrow_4:checked~.frames {
                    -webkit-transform: translateX(-60%);
                    transform: translateX(-60%);
                }

                #carousel #arrow_5:checked~.frames {
                    -webkit-transform: translateX(-80%);
                    transform: translateX(-80%);
                }
            }

            /* Show starting arrows */
            .controls label:nth-child(2) {
                display: inline-block !important;
                float: right;
            }

            .controls label:nth-child(5) {
                display: inline-block !important;
                float: left;
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
            }

            /* Show right arrow */
            #carousel #arrow_1:checked~.controls label:nth-child(2),
            #carousel #arrow_2:checked~.controls label:nth-child(3),
            #carousel #arrow_3:checked~.controls label:nth-child(4),
            #carousel #arrow_4:checked~.controls label:nth-child(5),
            #carousel #arrow_5:checked~.controls label:nth-child(1) {
                display: inline-block;
                float: right !important;
                -webkit-transform: rotate(0deg);
                transform: rotate(0);
                z-index: 1;
            }

            /* Show left arrow */
            #carousel #arrow_1:checked~.controls label:nth-child(5),
            #carousel #arrow_2:checked~.controls label:nth-child(1),
            #carousel #arrow_3:checked~.controls label:nth-child(2),
            #carousel #arrow_4:checked~.controls label:nth-child(3),
            #carousel #arrow_5:checked~.controls label:nth-child(4) {
                display: inline-block;
                float: left !important;
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
                z-index: 1;
            }

            /* Show and hide starting progress */
            .progressBar .progress:nth-child(1) {
                opacity: 1 !important;
            }

            #carousel input[name="controls"]:checked~.progressBar .progress {
                opacity: 0.5 !important;
            }

            /* Show progress */
            #carousel #arrow_1:checked~.progressBar .progress:nth-child(1),
            #carousel #arrow_2:checked~.progressBar .progress:nth-child(2),
            #carousel #arrow_3:checked~.progressBar .progress:nth-child(3),
            #carousel #arrow_4:checked~.progressBar .progress:nth-child(4),
            #carousel #arrow_5:checked~.progressBar .progress:nth-child(5) {
                opacity: 1 !important;
            }

            /* Carousel  mobile styles */
            @media only screen and (max-width: 480px) {
                #carousel .frames {
                    min-width: 500%;
                }

                /* Replace 'width' with the number of carousel slides. e.g. 5 slides = width: 500%; */
                #carousel .frames .frame {
                    width: 20%;
                }

                #carousel .frames .frame .carTitle {
                    font-size: 4vw !important;
                    line-height: 5vw !important;
                    padding: 0 10% !important;
                }

                /* Replace 'width' with 100 divided by the number of carousel slides e.g. 5 slides = width: 20%; */
            }
            }
        </style><!--<![endif]-->
        <style type="text/css">
            /* Hide interactivity on Samsung mobile mail client */
            #MessageViewBody #cbox:checked+.fallback {
                display: block !important;
                max-height: none !important;
                position: relative;
                overflow: visible !important;
            }

            #MessageViewBody #cbox:checked+.interactive {
                display: none !important;
            }

            /* Hide interactivity on Outlook App */
            body[data-outlook-cycle] .fallback,
            body[data-outlook-cycle] #cbox:checked+.fallback {
                display: block !important;
                max-height: none !important;
                position: relative;
            }

            body[data-outlook-cycle] .interactive,
            body[data-outlook-cycle] #cbox:checked+.interactive {
                display: none !important;
            }

            /* Hide interactivity on Yahoo */
            @media screen yahoo {
                .fallback {
                    display: block;
                    max-height: none !important;
                }

                .interactive {
                    display: none;
                    display: none !important;
                    max-height: 0;
                    overflow: hidden;
                }
            }
        </style>
        <style type="text/css">
            @media screen yahoo {
                .fallback {
                    display: block;
                    max-height: none !important;
                }

                .interactive {
                    display: none;
                    display: none !important;
                    max-height: 0;
                    overflow: hidden;
                }
            }
        </style>
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
            <tr>
                <td align="center" class="content-inner" style="width: 580px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="sect" role="presentation" style="width: 100%;">
                        <tr>
                            <td align="center" class="block" style="width: 100%;" valign="top">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;" width="100%">
                                    <tr>
                                        <td id="car" style="text-align: center;">
                                            <!--[if !mso]><!-- -->
                                            <input checked="checked" id="cbox" name="cbox" style="display: none; max-height: 0; visibility: hidden;" type="checkbox">
                                            <div class="interactive" style="display: none; max-height: 0; overflow: hidden;">
                                                <div id="carousel">
                                                    ${slides.map((_, index) => `<input id="arrow_${index + 1}" name="controls" type="radio"${index === 0 ? ' checked' : ''}>`).join(' ')}
                                                    <div class="frames">
                                                        ${slides.map((slide, index) => `
                                                            <div class="frame">
                                                                <a href="${slide.buttonUrl}" target="_blank">
                                                                    <img alt="${slide.imageAltText}" class="fill no-hover" src="${slide.imageUrl}" style="border: none; display: block; height: auto; outline: none; text-decoration: none;" width="620">
                                                                </a>
                                                                <p class="carTitle">${slide.title}</p>
                                                                <button align="center" style="color: #ffffff; background-color: transparent; border: 2px solid #ffffff; font-family: 'Helvetica-Neue', sans-serif, 'Open-Sans'; font-size: 16px; font-weight: bold; line-height: 24px; text-align: center; text-transform: uppercase; padding: 8px 20px;">${slide.buttonText}</button>
                                                            </div>
                                                        `).join('')}
                                                    </div>
                                                    <div class="progressBar">
                                                        ${slides.map(() => '<div class="progress"></div>').join('\n')}
                                                    </div>
                                                    <div class="controls">
                                                        ${slides.map((_, index) => `<label class="arrows" for="arrow_${index + 1}">&nbsp;</label>`).join(' ')}
                                                    </div>
                                                </div>
                                            </div> <!--<![endif]--> <!--[if !mso]><!-- --> <input checked="checked" id="cbox"
                                                name="cbox" style="display: none; max-height: 0; visibility: hidden;"
                                                type="checkbox"> <!--<![endif]-->
                                            <div class="fallback">
                                                <a href="${fallback.link}" target="_blank">
                                                    <img align="top" alt="${fallback.altText}" class="fill no-hover" src="${fallback.imageUrl}" style="display: block; height: auto; outline: none; text-decoration: none; border: none; padding: 0px; text-align: center; width: 100%;" width="620">
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`;
    },

    populateForm(formData) {
        const data = formData || this.getPlaceholderData();
        
        // Add background image population
        document.getElementById('carouselBackgroundImage').value = data.backgroundImage;

        // Remove existing slides
        const existingSlides = document.querySelectorAll('#carouselModule details:not(:last-child)');
        existingSlides.forEach(slide => slide.remove());
        
        // Create and populate slides
        data.slides.forEach((slide, index) => {
            const slideNum = index + 1;
            const slideHTML = this.createSlideHTML(slideNum);
            
            // Insert before the fallback details section
            const fallbackDetails = document.querySelector('#carouselModule details:last-child');
            fallbackDetails.insertAdjacentHTML('beforebegin', slideHTML);
            
            // Now populate the newly created fields
            document.getElementById(`carouselSlide${slideNum}ImageUrl`).value = slide.imageUrl;
            document.getElementById(`carouselSlide${slideNum}AltText`).value = slide.imageAltText;
            document.getElementById(`carouselSlide${slideNum}Title`).value = slide.title;
            document.getElementById(`carouselSlide${slideNum}ButtonText`).value = slide.buttonText;
            document.getElementById(`carouselSlide${slideNum}ButtonUrl`).value = slide.buttonUrl;
        });

        // Populate fallback fields
        document.getElementById('carouselFallbackImageUrl').value = data.fallbackImageUrl;
        document.getElementById('carouselFallbackAltText').value = data.fallbackAltText;
        document.getElementById('carouselFallbackLink').value = data.fallbackLink;
        
        // Re-setup event listeners
        this.setupEventListeners(() => this.handleFormFieldChange());
    },

    setupEventListeners(handleFormFieldChange) {
        this._handleFormFieldChange = handleFormFieldChange; // Store for later use

        // Add background image listener
        const backgroundImage = document.getElementById('carouselBackgroundImage');
        if (backgroundImage) {
            backgroundImage.addEventListener('input', function(event) {
                handleFormFieldChange('carousel', 'backgroundImage', event.target.value);
            });
        }

        const slideFields = ['ImageUrl', 'AltText', 'Title', 'ButtonText', 'ButtonUrl'];
        const numSlides = 5;

        for (let i = 1; i <= numSlides; i++) {
            slideFields.forEach(field => {
                const elementId = `carouselSlide${i}${field}`;
                const element = document.getElementById(elementId);
                if (element) {
                    element.addEventListener('input', function(event) {
                        const currentData = moduleRegistry.get('carousel').getFormData();
                        currentData.slides[i - 1][field.charAt(0).toLowerCase() + field.slice(1)] = event.target.value;
                        handleFormFieldChange('carousel', 'slides', currentData.slides);
                    });
                }
            });
        }

        ['ImageUrl', 'AltText', 'Link'].forEach(field => {
            const element = document.getElementById(`carouselFallback${field}`);
            if (element) {
                element.addEventListener('input', function(event) {
                    handleFormFieldChange('carousel', `fallback${field}`, event.target.value);
                });
            }
        });
    },

    getFormData() {
        const formData = {
            slides: [],
            fallbackImageUrl: document.getElementById('carouselFallbackImageUrl').value,
            fallbackAltText: document.getElementById('carouselFallbackAltText').value,
            fallbackLink: document.getElementById('carouselFallbackLink').value,
            backgroundImage: document.getElementById('carouselBackgroundImage').value
        };

        for (let i = 1; i <= 5; i++) {
            formData.slides.push({
                imageUrl: document.getElementById(`carouselSlide${i}ImageUrl`).value,
                imageAltText: document.getElementById(`carouselSlide${i}AltText`).value,
                title: document.getElementById(`carouselSlide${i}Title`).value,
                buttonText: document.getElementById(`carouselSlide${i}ButtonText`).value,
                buttonUrl: document.getElementById(`carouselSlide${i}ButtonUrl`).value
            });
        }

        return formData;
    }
};

moduleRegistry.register('carousel', carouselModule);

export default carouselModule;