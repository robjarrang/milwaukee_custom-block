export function diffAndMergeHtml(oldHtml, newHtml, generatedHtml) {
    const changes = Diff.diffWords(oldHtml, newHtml);
    let mergedHtml = generatedHtml;

    changes.forEach(change => {
        if (change.added) {
            const insertionPoint = findInsertionPoint(mergedHtml, change.value);
            mergedHtml = mergedHtml.slice(0, insertionPoint) + change.value + mergedHtml.slice(insertionPoint);
        } else if (change.removed) {
            mergedHtml = mergedHtml.replace(change.value, '');
        }
    });

    return mergedHtml;
}

function findInsertionPoint(html, snippet) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const bodyContent = doc.body.innerHTML;

    const snippetDoc = parser.parseFromString(snippet, 'text/html');
    const snippetContent = snippetDoc.body.innerHTML;

    const index = bodyContent.indexOf(snippetContent);
    return index !== -1 ? index : bodyContent.length;
}