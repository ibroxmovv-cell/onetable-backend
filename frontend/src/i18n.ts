import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../public/locales/en/common.json';
import ru from '../public/locales/ru/common.json';
import uz from '../public/locales/uz/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    ru: { common: ru },
    uz: { common: uz }
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false }
});

export default i18n;
