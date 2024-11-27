
export function setupLinkButton(moduleId, handleFormFieldChange, descriptionEditorId, fieldName) {
    const linkButton = document.querySelector(`#${moduleId} .rich-text-toolbar button[data-command="link"]`);
    const descriptionEditor = document.getElementById(descriptionEditorId);

    if (linkButton && descriptionEditor) {
        // Remove existing listeners to prevent duplicates
        linkButton.replaceWith(linkButton.cloneNode(true));
        const newLinkButton = document.querySelector(`#${moduleId} .rich-text-toolbar button[data-command="link"]`);
        newLinkButton.addEventListener('click', function() {
            const url = prompt('Enter the URL');
            if (url) {
                document.execCommand('createLink', false, url);
                // Apply the style to the newly created link
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const anchor = range.startContainer.parentElement;
                    if (anchor && anchor.tagName === 'A') {
                        anchor.style.color = '#ffffff';
                        anchor.setAttribute('target', '_blank');
                    }
                }
                handleFormFieldChange(fieldName, 'description', descriptionEditor.innerHTML);
            }
        });
    } else {
        console.warn(`Link button or description editor not found in module ${moduleId}`);
    }
}