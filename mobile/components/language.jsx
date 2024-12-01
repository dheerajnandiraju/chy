import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import SvgComponent from "./flags/English";
import TeluguLetter from "./flags/Telugu";
import HindiLetter from "./flags/Hindi";

const flags = [
  { component: SvgComponent, lang: "en-EN", name: "English" },
  { component: TeluguLetter, lang: "te-TE", name: "Telugu" },
  { component: HindiLetter, lang: "hi-HI", name: "Hindi" },
];

export function Language() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('language')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flagsContainer}
      >
        {flags.map(({ component: Flag, lang, name }) => (
          <TouchableOpacity
            key={name}
            onPress={() => changeLanguage(lang)}
            style={[
              styles.flag,
              currentLanguage === lang && styles.activeFlag,
              currentLanguage !== lang && styles.inactiveFlag,
            ]}
          >
            <Flag width={45} height={45} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  flagsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  flag: {
    paddingHorizontal: 10,
  },
  activeFlag: {
    transform: [{ scale: 1.2 }],
  },
  inactiveFlag: {
    opacity: 0.5,
  },
  text: {
    fontSize: 22,
    lineHeight: 32,
    marginTop: -6,
  },
});