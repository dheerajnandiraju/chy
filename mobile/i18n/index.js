import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationTe from "./locales/te-TE/translation.json";
import translationEn from "./locales/en-EN/translation.json";
import translationHi from "./locales/hi-HI/translation.json";

const resources = {
  "te-TE": { translation: translationTe },
  "en-EN": { translation: translationEn },
  "hi-HI": { translation: translationHi },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources,
    lng: savedLanguage,
    fallbackLng: "en-EN",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;