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
            descriptionAlignmentMobile: 'left'
        },
        introStory: {},
        oneColumnStory: {},
        twoColumnStory: {},
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
