let state = {
    moduleType: 'leadStory',
    formData: {
        leadStory: {
            imageAltText: 'Milwaukee Tool Product Image',
            titleAlignment: 'left',
            descriptionAlignment: 'left',
            buttonAlignment: 'center',
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left'
        },
        introStory: {
            imageAltText: 'Milwaukee Tool Product Image',
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left'
        },
        oneColumnStory: {
            imageAltText: 'Milwaukee Tool Product Image',
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left'
        },
        twoColumnStory: {
            leftImageAltText: 'Milwaukee Tool Product Image',
            rightImageAltText: 'Milwaukee Tool Product Image',
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left'
        },
        prizeEveryMonth: {
            imageAltText: 'Milwaukee Tool Prize Image',
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left'
        },
        fullWidthTitle: {
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left'
        },
        threeColumnStory: {
            leftImageAltText: 'Milwaukee Tool Product Image',
            centerImageAltText: 'Milwaukee Tool Product Image',
            rightImageAltText: 'Milwaukee Tool Product Image',
            leftTitleAlignmentDesktop: 'left',
            leftTitleAlignmentMobile: 'left',
            leftDescriptionAlignmentDesktop: 'left',
            leftDescriptionAlignmentMobile: 'left',
            centerTitleAlignmentDesktop: 'left',
            centerTitleAlignmentMobile: 'left',
            centerDescriptionAlignmentDesktop: 'left',
            centerDescriptionAlignmentMobile: 'left',
            rightTitleAlignmentDesktop: 'left',
            rightTitleAlignmentMobile: 'left',
            rightDescriptionAlignmentDesktop: 'left',
            rightDescriptionAlignmentMobile: 'left'
        },
        fwImage: {
            imageAltText: 'Milwaukee Tool Product Image'
        },
        gallery: {
            image1AltText: 'Milwaukee Tool Product Image',
            image2AltText: 'Milwaukee Tool Product Image',
            image3AltText: 'Milwaukee Tool Product Image',
            image4AltText: 'Milwaukee Tool Product Image'
        },
        divider: {},
        spacer: {},
        tabs: {
            tab1: {
                name: 'Softshell Hooded',
                subtext: 'Jacket',
                imageUrl: '',
                imageAltText: 'Tab 1 Image',
                title: '',
                buttonText: '',
                buttonLink: '',
                features: ['', '', '']
            },
            tab2: {
                name: 'Work',
                subtext: 'Jacket',
                imageUrl: '',
                imageAltText: 'Tab 2 Image',
                title: '',
                buttonText: '',
                buttonLink: '',
                features: ['', '', '']
            }
        }
    },
    fullHtml: ''
};

export function updateFormData(newData) {
    if (newData.moduleType) {
        state.moduleType = newData.moduleType;
    }
    
    // Handle all module types dynamically
    Object.keys(newData).forEach(moduleType => {
        if (moduleType !== 'moduleType' && typeof newData[moduleType] === 'object') {
            state.formData[moduleType] = { ...state.formData[moduleType], ...newData[moduleType] };
        }
    });

    // Update alignment properties for leadStory
    if (newData.leadStory) {
        const leadStory = state.formData.leadStory;
        leadStory.titleAlignmentDesktop = newData.leadStory.titleAlignmentDesktop || leadStory.titleAlignmentDesktop;
        leadStory.titleAlignmentMobile = newData.leadStory.titleAlignmentMobile || leadStory.titleAlignmentMobile;
        leadStory.descriptionAlignmentDesktop = newData.leadStory.descriptionAlignmentDesktop || leadStory.descriptionAlignmentDesktop;
        leadStory.descriptionAlignmentMobile = newData.leadStory.descriptionAlignmentMobile || leadStory.descriptionAlignmentMobile;
    }

    // Update alignment properties for introStory
    if (newData.introStory) {
        const introStory = state.formData.introStory;
        introStory.titleAlignmentDesktop = newData.introStory.titleAlignmentDesktop || introStory.titleAlignmentDesktop;
        introStory.titleAlignmentMobile = newData.introStory.titleAlignmentMobile || introStory.titleAlignmentMobile;
        introStory.descriptionAlignmentDesktop = newData.introStory.descriptionAlignmentDesktop || introStory.descriptionAlignmentDesktop;
        introStory.descriptionAlignmentMobile = newData.introStory.descriptionAlignmentMobile || introStory.descriptionAlignmentMobile;
    }

    // Update alignment properties for oneColumnStory
    if (newData.oneColumnStory) {
        const oneColumnStory = state.formData.oneColumnStory;
        oneColumnStory.titleAlignmentDesktop = newData.oneColumnStory.titleAlignmentDesktop || oneColumnStory.titleAlignmentDesktop;
        oneColumnStory.titleAlignmentMobile = newData.oneColumnStory.titleAlignmentMobile || oneColumnStory.titleAlignmentMobile;
        oneColumnStory.descriptionAlignmentDesktop = newData.oneColumnStory.descriptionAlignmentDesktop || oneColumnStory.descriptionAlignmentDesktop;
        oneColumnStory.descriptionAlignmentMobile = newData.oneColumnStory.descriptionAlignmentMobile || oneColumnStory.descriptionAlignmentMobile;
    }

    // Update alignment properties for twoColumnStory
    if (newData.twoColumnStory) {
        const twoColumnStory = state.formData.twoColumnStory;
        twoColumnStory.titleAlignmentDesktop = newData.twoColumnStory.titleAlignmentDesktop || twoColumnStory.titleAlignmentDesktop;
        twoColumnStory.titleAlignmentMobile = newData.twoColumnStory.titleAlignmentMobile || twoColumnStory.titleAlignmentMobile;
        twoColumnStory.descriptionAlignmentDesktop = newData.twoColumnStory.descriptionAlignmentDesktop || twoColumnStory.descriptionAlignmentDesktop;
        twoColumnStory.descriptionAlignmentMobile = newData.twoColumnStory.descriptionAlignmentMobile || twoColumnStory.descriptionAlignmentMobile;
    }

    // Update alignment properties for prizeEveryMonth
    if (newData.prizeEveryMonth) {
        const prizeEveryMonth = state.formData.prizeEveryMonth;
        prizeEveryMonth.titleAlignmentDesktop = newData.prizeEveryMonth.titleAlignmentDesktop || prizeEveryMonth.titleAlignmentDesktop;
        prizeEveryMonth.titleAlignmentMobile = newData.prizeEveryMonth.titleAlignmentMobile || prizeEveryMonth.titleAlignmentMobile;
        prizeEveryMonth.descriptionAlignmentDesktop = newData.prizeEveryMonth.descriptionAlignmentDesktop || prizeEveryMonth.descriptionAlignmentDesktop;
        prizeEveryMonth.descriptionAlignmentMobile = newData.prizeEveryMonth.descriptionAlignmentMobile || prizeEveryMonth.descriptionAlignmentMobile;
    }

    // Update alignment properties for fullWidthTitle
    if (newData.fullWidthTitle) {
        const fullWidthTitle = state.formData.fullWidthTitle;
        fullWidthTitle.titleAlignmentDesktop = newData.fullWidthTitle.titleAlignmentDesktop || fullWidthTitle.titleAlignmentDesktop;
        fullWidthTitle.titleAlignmentMobile = newData.fullWidthTitle.titleAlignmentMobile || fullWidthTitle.titleAlignmentMobile;
    }

    // Update alignment properties for threeColumnStory
    if (newData.threeColumnStory) {
        const threeColumnStory = state.formData.threeColumnStory;
        threeColumnStory.leftTitleAlignmentDesktop = newData.threeColumnStory.leftTitleAlignmentDesktop || threeColumnStory.leftTitleAlignmentDesktop;
        threeColumnStory.leftTitleAlignmentMobile = newData.threeColumnStory.leftTitleAlignmentMobile || threeColumnStory.leftTitleAlignmentMobile;
        threeColumnStory.leftDescriptionAlignmentDesktop = newData.threeColumnStory.leftDescriptionAlignmentDesktop || threeColumnStory.leftDescriptionAlignmentDesktop;
        threeColumnStory.leftDescriptionAlignmentMobile = newData.threeColumnStory.leftDescriptionAlignmentMobile || threeColumnStory.leftDescriptionAlignmentMobile;
        threeColumnStory.centerTitleAlignmentDesktop = newData.threeColumnStory.centerTitleAlignmentDesktop || threeColumnStory.centerTitleAlignmentDesktop;
        threeColumnStory.centerTitleAlignmentMobile = newData.threeColumnStory.centerTitleAlignmentMobile || threeColumnStory.centerTitleAlignmentMobile;
        threeColumnStory.centerDescriptionAlignmentDesktop = newData.threeColumnStory.centerDescriptionAlignmentDesktop || threeColumnStory.centerDescriptionAlignmentDesktop;
        threeColumnStory.centerDescriptionAlignmentMobile = newData.threeColumnStory.centerDescriptionAlignmentMobile || threeColumnStory.centerDescriptionAlignmentMobile;
        threeColumnStory.rightTitleAlignmentDesktop = newData.threeColumnStory.rightTitleAlignmentDesktop || threeColumnStory.rightTitleAlignmentDesktop;
        threeColumnStory.rightTitleAlignmentMobile = newData.threeColumnStory.rightTitleAlignmentMobile || threeColumnStory.rightTitleAlignmentMobile;
        threeColumnStory.rightDescriptionAlignmentDesktop = newData.threeColumnStory.rightDescriptionAlignmentDesktop || threeColumnStory.rightDescriptionAlignmentDesktop;
        threeColumnStory.rightDescriptionAlignmentMobile = newData.threeColumnStory.rightDescriptionAlignmentMobile || threeColumnStory.rightDescriptionAlignmentMobile;
    }

    console.log('Form data updated:', state.formData);
}

export function updateFullHtml(html) {
    state.fullHtml = html;
    console.log('Full HTML updated');
}

export function getState() {
    return { ...state };
}

export function setInitialState(initialData) {
    state = { ...state, ...initialData };
    console.log('Initial state set:', state);
}

export function getFullHtml() {
    return state.fullHtml;
}

export function resetFullHtml() {
    state.fullHtml = '';
    console.log('Full HTML reset');
}
