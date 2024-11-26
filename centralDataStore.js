let state = {
    moduleType: 'leadStory',
    formData: {
        leadStory: {},
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