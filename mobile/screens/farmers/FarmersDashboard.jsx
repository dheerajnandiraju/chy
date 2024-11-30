import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Layout from "./Layout";
import { Picker } from "@react-native-picker/picker";

const FarmersDashboard = () => {
  const navigation = useNavigation();

  // States for produce and stats
  const [produceType, setProduceType] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [priceOffer, setPriceOffer] = useState("");
  const [activityType, setActivityType] = useState("sale"); // 'sale' or 'donation'
  const [selectedOrganization, setSelectedOrganization] = useState(""); // NGO/Foodbank

  // States for showing success message
  const [showSuccess, setShowSuccess] = useState(false);

  // Stats for pending/completed purchases
  const [pendingPurchases, setPendingPurchases] = useState([
    { id: 1, produceType: "Tomatoes", price: "$5", organization: "NGO B", notes: "Handle with care", status: "pending" },
    { id: 2, produceType: "Potatoes", price: "$3", organization: "FoodBank A", notes: "Urgent", status: "pending" },
  ]);

  const [completedPurchases, setCompletedPurchases] = useState([
    { id: 1, produceType: "Carrots", buyer: "John Doe", price: "$4", quantity: "100kg", status: "completed" },
    { id: 2, produceType: "Cabbages", buyer: "Jane Smith", price: "$6", quantity: "50kg", status: "completed" },
  ]);

  // Modal for updating pending purchase details
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const organizations = [
    { label: "FoodBank A", value: "foodbank_a" },
    { label: "NGO B", value: "ngo_b" },
    { label: "FoodBank C", value: "foodbank_c" },
    { label: "NGO D", value: "ngo_d" },
  ];

  // Handle posting produce (sale or donation)
  const handlePostProduce = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Open modal for updating pending purchase
  const openModalForPendingPurchase = (purchase) => {
    setSelectedPurchase(purchase);
    setIsModalVisible(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPurchase(null);
  };

  // Update the pending purchase with new details
  const updatePendingPurchase = () => {
    const updatedPurchases = pendingPurchases.map((purchase) =>
      purchase.id === selectedPurchase.id ? selectedPurchase : purchase
    );
    setPendingPurchases(updatedPurchases);
    closeModal();
  };

  return (
    <Layout navigation={navigation}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="home-outline" size={24} color="black" />
            <Text style={styles.headerTitle}>Farmers Dashboard</Text>
          </View>

          <Text style={styles.welcome}>Welcome, John Smith!</Text>

          {/* Farmer Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>500 kg</Text>
              <Text style={styles.statLabel}>Donated</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>5,000 meals</Text>
              <Text style={styles.statLabel}>Meals</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>$200</Text>
              <Text style={styles.statLabel}>Tax</Text>
            </View>
          </View>

          {/* Post Produce Form */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Post Produce</Text>
            <Text style={styles.label}>Produce Type</Text>
            <TextInput
              style={styles.input}
              value={produceType}
              onChangeText={setProduceType}
              placeholder="Enter Produce Type"
            />

            <Text style={styles.label}>Additional Notes</Text>
            <TextInput
              style={styles.input}
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
              placeholder="Additional notes (e.g., handle with care)"
              multiline
            />

            <Text style={styles.label}>Activity Type</Text>
            <Picker
              selectedValue={activityType}
              style={styles.picker}
              onValueChange={(itemValue) => setActivityType(itemValue)}
            >
              <Picker.Item label="Sale" value="sale" />
              <Picker.Item label="Donation" value="donation" />
            </Picker>

            <Text style={styles.label}>Price Offer (If Sale)</Text>
            {activityType === "sale" && (
              <TextInput
                style={styles.input}
                value={priceOffer}
                onChangeText={setPriceOffer}
                placeholder="Enter price"
                keyboardType="numeric"
              />
            )}

            <Text style={styles.label}>Select NGO/FoodBank</Text>
            <Picker
              selectedValue={selectedOrganization}
              style={styles.picker}
              onValueChange={setSelectedOrganization}
            >
              {organizations.map((org) => (
                <Picker.Item key={org.value} label={org.label} value={org.value} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.button} onPress={handlePostProduce}>
              <Text style={styles.buttonText}>Post for Sale/Donation</Text>
            </TouchableOpacity>
          </View>

          {/* Success Message */}
          {showSuccess && (
            <View style={styles.successMessage}>
              <Ionicons name="checkmark-circle" size={24} color="green" />
              <Text style={styles.successText}>
                {activityType === "sale"
                  ? "Produce posted for sale successfully! NGOs and volunteers will be notified."
                  : "Produce donated successfully! NGOs and food banks will be notified."}
              </Text>
            </View>
          )}

          {/* Pending Purchases */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Purchases</Text>
            {pendingPurchases.map((purchase) => (
              <TouchableOpacity
                key={purchase.id}
                style={styles.purchaseItem}
                onPress={() => openModalForPendingPurchase(purchase)}
              >
                <Text style={styles.purchaseText}>{purchase.produceType}</Text>
                <Text style={styles.purchaseText}>Price: {purchase.price}</Text>
                <Text style={styles.purchaseText}>Organization: {purchase.organization}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Completed Purchases */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed Purchases</Text>
            {completedPurchases.map((purchase) => (
              <View key={purchase.id} style={styles.purchaseItem}>
                <Text style={styles.purchaseText}>Produce: {purchase.produceType}</Text>
                <Text style={styles.purchaseText}>Buyer: {purchase.buyer}</Text>
                <Text style={styles.purchaseText}>Price: {purchase.price}</Text>
                <Text style={styles.purchaseText}>Quantity: {purchase.quantity}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Modal for updating pending purchase details */}
        {isModalVisible && selectedPurchase && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Update Pending Purchase</Text>

                <Text style={styles.modalLabel}>Produce Type</Text>
                <TextInput
                  style={styles.modalInput}
                  value={selectedPurchase.produceType}
                  onChangeText={(text) =>
                    setSelectedPurchase({ ...selectedPurchase, produceType: text })
                  }
                />

                <Text style={styles.modalLabel}>Price</Text>
                <TextInput
                  style={styles.modalInput}
                  value={selectedPurchase.price}
                  onChangeText={(text) =>
                    setSelectedPurchase({ ...selectedPurchase, price: text })
                  }
                />

                <Text style={styles.modalLabel}>Additional Notes</Text>
                <TextInput
                  style={styles.modalInput}
                  value={selectedPurchase.notes}
                  onChangeText={(text) =>
                    setSelectedPurchase({ ...selectedPurchase, notes: text })
                  }
                />

                <Text style={styles.modalLabel}>Select Organization</Text>
                <Picker
                  selectedValue={selectedPurchase.organization}
                  style={styles.picker}
                  onValueChange={(itemValue) =>
                    setSelectedPurchase({ ...selectedPurchase, organization: itemValue })
                  }
                >
                  {organizations.map((org) => (
                    <Picker.Item key={org.value} label={org.label} value={org.value} />
                  ))}
                </Picker>

                <TouchableOpacity style={styles.button} onPress={updatePendingPurchase}>
                  <Text style={styles.buttonText}>Update Purchase</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={closeModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: 16,
  },
  statBox: {
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#00BCD4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6ffe6",
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  successText: {
    flex: 1,
    marginHorizontal: 8,
  },
  section: {
    padding: 16,
  },
  purchaseItem: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
  },
  purchaseText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: Dimensions.get("window").width - 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
  },
});

export default FarmersDashboard;
