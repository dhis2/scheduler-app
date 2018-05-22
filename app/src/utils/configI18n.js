import apiTranslations from 'utils/apiTranslations';
import i18n from 'locales';

const isLangRTL = code => {
    const langs = ['ar', 'fa', 'ur'];
    const prefixed = langs.map(c => `${c}-`);
    return langs.includes(code) || prefixed.filter(c => code.startsWith(c)).length > 0;
};

const configI18n = userSettings => {
    i18n.changeLanguage(userSettings.keyUiLocale);

    const translations = apiTranslations[userSettings.keyUiLocale] || apiTranslations.en;

    if (isLangRTL(userSettings.keyUiLocale)) {
        document.body.setAttribute('dir', 'rtl');
    }

    i18n.addResources(userSettings.keyUiLocale, 'Scheduler', translations);
};

export default configI18n;
