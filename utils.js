export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function logAction(action, details = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Action: ${action}`, details);
}

export function logError(message, error) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Error: ${message}`, error);
    if (error instanceof Error) {
        console.error('Stack trace:', error.stack);
    }
}

export function logWarning(message, details = {}) {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] Warning: ${message}`, details);
}

export function logInfo(message, details = {}) {
    const timestamp = new Date().toISOString();
    console.info(`[${timestamp}] Info: ${message}`, details);
}