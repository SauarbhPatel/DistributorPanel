// localizationService.js
import EN from "./english"; // English localization
import HI from "./hindi"; // Spanish localization

let selectedLanguage = "EN"; // Default language

export function setLanguage(language) {
    selectedLanguage = language;
}

export function getLocalizedString(key) {
    const localization = selectedLanguage === "HI" ? HI : EN;
    return localization[key] || key;
}
