import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '@/i18n/en.json';
import ptBrTranslation from '@/i18n/pt-br.json';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: enTranslation
      },
      'pt-BR': {
        translation: ptBrTranslation
      }
    }
  });
