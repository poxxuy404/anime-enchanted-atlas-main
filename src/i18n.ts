import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      genres: {
        title: 'Genres',
        subtitle: 'Pick the genre you like',
        countSuffix: 'items'
      },
      search: {
        placeholder: 'Search, e.g. One Piece, Haikyuu...'
      }
    }
  },
  uz: {
    translation: {
      genres: {
        title: 'Janrlar',
        subtitle: 'Siz yoqtirgan anime turini tanlang',
        countSuffix: 'ta anime'
      },
      search: {
        placeholder: 'Masalan, One Piece, Haikyuu yoki Shounen...'
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'uz',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
