import { useLocalStorage } from '../useStorage';
import * as translations from './translations/index';

export default function useTranslation() {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [fallbackLanguage, setFallbackLanguage] = useLocalStorage(
    'fallbackLanguage',
    'en'
  );

  const translate = key => {
    const keys = key.split('.');

    return (
      getNestedTranslation(language, keys) ??
      getNestedTranslation(fallbackLanguage, keys) ??
      key
    );
  };

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate
  };
}

function getNestedTranslation(language, keys) {
  return keys.reduce((obj, key) => {
    return obj?.[key];
  }, translations[language]);
}
// -------------------------------------> USAGE <--------------------------------------------------
/*
   const { language, setLanguage, setFallbackLanguage, t } = useTranslation();

   return (
       <h1>{ t("Home.naslov") }</h1>

       <button onClick={() => setLanguage("sp")}>Spanish</button>
       <button onClick={() => setLanguage("en")}>English</button>
   )
*/

// -------------------------------------> INFORMATION <---------------------------------------------
// This hook is used to handle the translation of content for multiple languages.
// FallbackLanguage is used when the main language is missing.
// You need to create files like: ./translations/en.json for each language.
// ! each .json file MUST HAVE the same structure, just different (translated) values
