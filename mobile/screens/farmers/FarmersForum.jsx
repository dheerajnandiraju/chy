import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "./Layout";
import { useNavigation } from "@react-navigation/native";

const ForumsScreen = () => {
  const forums = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Forum ${i + 1}`,
    imageUrl: "/placeholder.svg",
  }));

  const navigation = useNavigation();

  return (
    <Layout navigation={navigation}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.collaborationsContainer}>
            <Text style={styles.sectionTitle}>Collaborations</Text>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Food Bank</Text>
              </View>
              <View style={[styles.card, styles.cardGreen]}>
                <Text style={styles.cardTitle}>Community...</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>
                Request Financial Support
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.forumsContainer}>
            <Text style={styles.sectionTitle}>Farmer Forums</Text>
            <View style={styles.forumsGrid}>
              {forums.map((forum) => (
                <TouchableOpacity key={forum.id} style={styles.forumItem}>
                  <Image
                    source={require("../../assets/119.png")}
                    style={styles.forumImage}
                  />
                  <Text style={styles.forumTitle}>{forum.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.volunteerButton}>
            <Text style={styles.volunteerButtonText}>
              Call Assigned Volunteer
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>FAQs</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Tax Benefits Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  collaborationsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardGreen: {
    backgroundColor: "#e8f5e9",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  supportButton: {
    backgroundColor: "#00BCD4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  supportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  forumsContainer: {
    padding: 16,
  },
  forumsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  forumItem: {
    width: "48%",
    marginBottom: 16,
  },
  forumImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
  forumTitle: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
  },
  volunteerButton: {
    backgroundColor: "#00BCD4",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  volunteerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerLink: {
    color: "#00BCD4",
    fontSize: 14,
    marginBottom: 8,
  },
});

export default ForumsScreen;
