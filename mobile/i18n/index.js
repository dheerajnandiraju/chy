import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationPt from "./locales/pt-BR/translation.json";
import translationEs from "./locales/es-ES/translation.json";
import translationHi from "./locales/hi-IN/translation.json";

// Configuração das traduções
const resources = {
  "pt-BR": { translation: translationPt },
  "es-ES": { translation: translationEs },
  "hi-IN": { translation: translationHi },
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
    fallbackLng: "pt-BR",
    interpolation: {
      escapeValue: false,
    },
  });

  // Configura a direção do texto (LTR ou RTL)
  // I18nManager.allowRTL(false);
  // I18nManager.forceRTL(Localization.isRTL);
};

initI18n();

export default i18n;