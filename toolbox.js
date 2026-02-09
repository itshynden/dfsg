Object.defineProperty(window, 'popupsOk', {
    get: function() {
        const win = window.open('', '_blank', 'width=1,height=1');
            try {
                if (win) {
                    win.close();
                }
                return true;
            } catch {
                return false; 
            };
        },
    configurable: false,
    enumerable: true});

Object.defineProperty(document, 'isIframe', {
    get: function() {
        if (window.location.ancestorOrigins) {
            return window.location.ancestorOrigins.length > 0;
        }
        try {
            return window.self !== window.parent;
        } catch {
            return true;
        }
    },
    configurable: false,
    enumerable: true
});

async function getURL(url, out='text') {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status)
        }
        const result = typeof response[out] === 'function'
            ? await response[out]()
            : await response[out];
        return result;
    } catch (e) {
        console.error(e);
    }
}
