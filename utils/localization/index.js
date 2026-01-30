let TOKEN = "";
let localizationDetails = {};

async function __setToken(authToken) {
    TOKEN = authToken;
    return;
}

function __getToken() {
    return TOKEN;
}

function __setLocalization(object) {
    if (!object || typeof object !== "object") return;
    localizationDetails = { ...localizationDetails, ...object };
}

function __getLocalization(key) {
    if (!key || typeof key !== "string") return null;
    return localizationDetails[key] || null;
}
function __cleanLocalization() {
    localizationDetails = {};
    TOKEN = "";
    return;
}

export {
    __getLocalization,
    __setLocalization,
    __getToken,
    __setToken,
    __cleanLocalization,
};
