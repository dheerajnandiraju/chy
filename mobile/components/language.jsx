import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Animated } from "react-native";
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

  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    setDropdownVisible(false); // Close the dropdown after selecting a language
  };

  return (
    <View style={styles.container}>      
      {/* Circular Button for dropdown */}
      <TouchableOpacity
        onPress={() => setDropdownVisible(!dropdownVisible)}
        style={styles.circleButton}
      >
        <Text style={styles.buttonText}>🌍</Text>
      </TouchableOpacity>

      {/* Animated dropdown for flags */}
      {dropdownVisible && (
        <Animated.View style={styles.dropdown}>
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
              <Flag width={30} height={30} />
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 10,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4CAF50", // Green color for the button
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
  },
  dropdown: {
    position: "absolute",
    top: 70, // Adjust based on your layout
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5, // Add a shadow for a dropdown effect
    padding: 10,
    zIndex: 10,
  },
  flag: {
    padding: 5,
  },
  activeFlag: {
    transform: [{ scale: 1.2 }],
  },
  inactiveFlag: {
    opacity: 0.7,
  },
});
