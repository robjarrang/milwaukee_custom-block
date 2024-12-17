let state = {
    moduleType: 'leadStory',
    formData: {
        leadStory: {
            titleAlignment: 'left',
            descriptionAlignment: 'left',
            buttonAlignment: 'center',
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left',
            altText: '',
            leadAltText: '' // P7553
        },
        introStory: {
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left',
            altText: ''
        },
        oneColumnStory: {
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left',
            altText: ''
        },
        twoColumnStory: {
            titleAlignmentDesktop: 'left',
            titleAlignmentMobile: 'left',
            descriptionAlignmentDesktop: 'left',
            descriptionAlignmentMobile: 'left',
            altText: ''
        },
        prizeEveryMonth: {
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
            rightDescriptionAlignmentMobile: 'left',
            leftAltText: '',
            centerAltText: '',
            rightAltText: ''
        },
        fwImage: {},
        fwButton: {},
        divider: {},
        spacer: {}
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
        leadStory.altText = newData.leadStory.altText || leadStory.altText;
        leadStory.leadAltText = newData.leadStory.leadAltText || leadStory.leadAltText; // Pfde9
    }

    // Update alignment properties for introStory
    if (newData.introStory) {
        const introStory = state.formData.introStory;
        introStory.titleAlignmentDesktop = newData.introStory.titleAlignmentDesktop || introStory.titleAlignmentDesktop;
        introStory.titleAlignmentMobile = newData.introStory.titleAlignmentMobile || introStory.titleAlignmentMobile;
        introStory.descriptionAlignmentDesktop = newData.introStory.descriptionAlignmentDesktop || introStory.descriptionAlignmentDesktop;
        introStory.descriptionAlignmentMobile = newData.introStory.descriptionAlignmentMobile || introStory.descriptionAlignmentMobile;
        introStory.altText = newData.introStory.altText || introStory.altText;
    }

    // Update alignment properties for oneColumnStory
    if (newData.oneColumnStory) {
        const oneColumnStory = state.formData.oneColumnStory;
        oneColumnStory.titleAlignmentDesktop = newData.oneColumnStory.titleAlignmentDesktop || oneColumnStory.titleAlignmentDesktop;
        oneColumnStory.titleAlignmentMobile = newData.oneColumnStory.titleAlignmentMobile || oneColumnStory.titleAlignmentMobile;
        oneColumnStory.descriptionAlignmentDesktop = newData.oneColumnStory.descriptionAlignmentDesktop || oneColumnStory.descriptionAlignmentDesktop;
        oneColumnStory.descriptionAlignmentMobile = newData.oneColumnStory.descriptionAlignmentMobile || oneColumnStory.descriptionAlignmentMobile;
        oneColumnStory.altText = newData.oneColumnStory.altText || oneColumnStory.altText;
    }

    // Update alignment properties for twoColumnStory
    if (newData.twoColumnStory) {
        const twoColumnStory = state.formData.twoColumnStory;
        twoColumnStory.titleAlignmentDesktop = newData.twoColumnStory.titleAlignmentDesktop || twoColumnStory.titleAlignmentDesktop;
        twoColumnStory.titleAlignmentMobile = newData.twoColumnStory.titleAlignmentMobile || twoColumnStory.titleAlignmentMobile;
        twoColumnStory.descriptionAlignmentDesktop = newData.twoColumnStory.descriptionAlignmentDesktop || twoColumnStory.descriptionAlignmentDesktop;
        twoColumnStory.descriptionAlignmentMobile = newData.twoColumnStory.descriptionAlignmentMobile || twoColumnStory.descriptionAlignmentMobile;
        twoColumnStory.altText = newData.twoColumnStory.altText || twoColumnStory.altText;
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
        threeColumnStory.leftAltText = newData.threeColumnStory.leftAltText || threeColumnStory.leftAltText;
        threeColumnStory.centerAltText = newData.threeColumnStory.centerAltText || threeColumnStory.centerAltText;
        threeColumnStory.rightAltText = newData.threeColumnStory.rightAltText || threeColumnStory.rightAltText;
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
