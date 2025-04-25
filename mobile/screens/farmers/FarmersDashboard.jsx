import React, { useEffect, useState } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import { Language } from "../../components/language";
import { API_ENDPOINTS, handleApiError } from '../../config/api';

// Updated color palette for a modern look
const COLORS = {
  background: '#F9FAFB',   // Soft gray-white background
  primary: '#10B981',     // Vibrant green for primary actions
  secondary: '#6EE7B7',   // Lighter green for gradients
  accent: '#F59E0B',      // Warm yellow for highlights
  textPrimary: '#1F2937', // Dark gray for primary text
  textSecondary: '#6B7280', // Lighter gray for secondary text
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  error: '#EF4444',
  success: '#10B981',
  darkOverlay: 'rgba(17, 24, 39, 0.6)',
};

const FarmersDashboard = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  // States for produce and stats
  const [produceType, setProduceType] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [priceOffer, setPriceOffer] = useState("");
  const [activityType, setActivityType] = useState("sale");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  // Stats for pending/completed purchases
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [completedPurchases, setCompletedPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const organizations = [
    { label: "FoodBank A", value: "foodbank_a" },
    { label: "NGO B", value: "ngo_b" },
    { label: "FoodBank C", value: "foodbank_c" },
    { label: "NGO D", value: "ngo_d" },
  ];

  useEffect(() => {
    fetchPendingPurchases();
  }, []);

  const fetchPendingPurchases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching pending purchases from:', API_ENDPOINTS.FARMER_FOOD_REQUESTS);
      
      const response = await fetch(API_ENDPOINTS.FARMER_FOOD_REQUESTS);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch pending purchases' }));
        throw new Error(errorData.message || `Failed to fetch pending purchases: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched pending purchases:', data);
      
      // Filter and format the data
      const pending = data.filter(item => item.status === 'pending').map(item => ({
        id: item._id,
        produceType: item.croptype,
        price: `$${item.price}`,
        organization: item.ngo,
        notes: item.additional,
        status: 'pending'
      }));
      
      const completed = data.filter(item => item.status === 'completed').map(item => ({
        id: item._id,
        produceType: item.croptype,
        price: `$${item.price}`,
        organization: item.ngo,
        notes: item.additional,
        status: 'completed'
      }));

      setPendingPurchases(pending);
      setCompletedPurchases(completed);
    } catch (error) {
      console.error('Error fetching pending purchases:', error);
      setError(error.message);
      alert('Error fetching pending purchases: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostProduce = async () => {
    try {
      // Validate required fields
      if (!produceType) {
        alert('Please enter the crop type');
        return;
      }

      if (!selectedOrganization) {
        alert('Please select an organization');
        return;
      }

      // Prepare the request data
      const requestData = {
        croptype: produceType,
        additional: additionalNotes,
        activityType: activityType,
        price: activityType === 'sale' ? parseFloat(priceOffer) || 0 : 0,
        ngo: selectedOrganization,
        status: 'pending'
      };

      console.log('Submitting food request:', requestData);

      // Make the API call
      const response = await fetch(API_ENDPOINTS.FARMER_FOOD_REQUESTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to submit request: ${response.status}`);
      }

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form
      setProduceType('');
      setAdditionalNotes('');
      setPriceOffer('');
      setActivityType('sale');
      setSelectedOrganization('');

      // Refresh the pending purchases list
      fetchPendingPurchases();

    } catch (error) {
      console.error('Error submitting food request:', error);
      alert(`Error submitting request: ${error.message}`);
    }
  };

  const openModalForPendingPurchase = (purchase) => {
    setSelectedPurchase(purchase);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPurchase(null);
  };

  const updatePendingPurchase = () => {
    const updatedPurchases = pendingPurchases.map((purchase) =>
      purchase.id === selectedPurchase.id ? selectedPurchase : purchase
    );
    setPendingPurchases(updatedPurchases);
    closeModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
       

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons name="leaf" size={24} color={COLORS.primary} />
            <Text style={styles.headerTitle}>{t("farmers.title")}</Text>
          </View>
          <View style={styles.headerRight}>
          
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="bell" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
        

        <Text style={styles.welcome}>{t("farmers.welcome")}, John Smith! <Language /></Text>

        {/* Loading and Error States */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{t("common.loading")}</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchPendingPurchases}>
              <Text style={styles.retryButtonText}>{t("common.retry")}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Farmer Stats */}
        <View style={styles.statsContainer}>
          {[
            { icon: "leaf-outline", value: "500 kg", label: t("farmers.donated") },
            { icon: "restaurant-outline", value: "5,000", label: t("farmers.meals") },
            { icon: "cash-outline", value: "$200", label: t("farmers.tax") },
          ].map((stat, index) => (
            <View key={index} style={styles.statBox}>
              <Ionicons name={stat.icon} size={24} color={COLORS.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Post Produce Form */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{t("farmers.post")}</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("farmers.cropType")}</Text>
            <TextInput
              style={styles.input}
              value={produceType}
              onChangeText={setProduceType}
              placeholder={t("farmers.cropTypePlaceholder")}
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("farmers.additionalInfo")}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
              placeholder={t("farmers.additionalInfoPlaceholder")}
              placeholderTextColor={COLORS.textSecondary}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("farmers.activityType")}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={activityType}
                style={styles.picker}
                onValueChange={(itemValue) => setActivityType(itemValue)}
              >
                <Picker.Item label={t("farmers.activityTypeOptions.sale")} value="sale" />
                <Picker.Item label={t("farmers.activityTypeOptions.donation")} value="donation" />
              </Picker>
            </View>
          </View>

          {activityType === "sale" && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("farmers.priceOffered")}</Text>
              <TextInput
                style={styles.input}
                value={priceOffer}
                onChangeText={setPriceOffer}
                placeholder={t("farmers.priceOfferedPlaceholder")}
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="numeric"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t("farmers.selectNgoFoodbank")}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedOrganization}
                style={styles.picker}
                onValueChange={setSelectedOrganization}
              >
                <Picker.Item label={t("farmers.selectNgoFoodbankPlaceholder")} value="" />
                {organizations.map((org) => (
                  <Picker.Item key={org.value} label={org.label} value={org.value} />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handlePostProduce}>
            <Text style={styles.submitButtonText}>{t("farmers.submit")}</Text>
          </TouchableOpacity>
        </View>

        {/* Success Message */}
        {showSuccess && (
          <View style={styles.successMessage}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
            <Text style={styles.successText}>
              {activityType === "sale"
                ? t("farmers.success")
                : t("farmers.donatedSuccess")}
            </Text>
          </View>
        )}

        {/* Pending Purchases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("farmers.pendingPurchases")}</Text>
          {pendingPurchases.map((purchase) => (
            <TouchableOpacity
              key={purchase.id}
              style={styles.purchaseCard}
              onPress={() => openModalForPendingPurchase(purchase)}
            >
              <View style={styles.purchaseHeader}>
                <Text style={styles.purchaseTitle}>{purchase.produceType}</Text>
                <Text style={styles.purchasePrice}>{purchase.price}</Text>
              </View>
              <View style={styles.purchaseDetails}>
                <Text style={styles.purchaseText}>
                  {t("farmers.organization")}: {purchase.organization}
                </Text>
                <Text style={styles.purchaseText}>
                  {t("farmers.notes")}: {purchase.notes}
                </Text>
              </View>
              <View style={styles.purchaseStatus}>
                <Text style={styles.statusText}>{t("farmers.pending")}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Completed Purchases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("farmers.completedPurchases")}</Text>
          {completedPurchases.map((purchase) => (
            <View key={purchase.id} style={styles.purchaseCard}>
              <View style={styles.purchaseHeader}>
                <Text style={styles.purchaseTitle}>{purchase.produceType}</Text>
                <Text style={styles.purchasePrice}>{purchase.price}</Text>
              </View>
              <View style={styles.purchaseDetails}>
                <Text style={styles.purchaseText}>
                  {t("farmers.organization")}: {purchase.organization}
                </Text>
                <Text style={styles.purchaseText}>
                  {t("farmers.notes")}: {purchase.notes}
                </Text>
              </View>
              <View style={[styles.purchaseStatus, styles.completedStatus]}>
                <Text style={styles.statusText}>{t("farmers.completed")}</Text>
              </View>
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
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t("farmers.updatePurchase")}</Text>
              <TextInput
                style={styles.modalInput}
                value={selectedPurchase.notes}
                onChangeText={(text) => setSelectedPurchase({ ...selectedPurchase, notes: text })}
                placeholder={t("farmers.updateNotes")}
                placeholderTextColor={COLORS.textSecondary}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                  <Text style={styles.modalButtonText}>{t("farmers.cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.updateButton]} onPress={updatePendingPurchase}>
                  <Text style={styles.updateButtonText}>{t("farmers.update")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: COLORS.cardBg,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: COLORS.textPrimary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    elevation: 4,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 4,
  },
  successText: {
    color: COLORS.white,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    padding: 16,
  },
  purchaseCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },
  purchaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  purchaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  purchasePrice: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: '600',
  },
  purchaseDetails: {
    marginBottom: 12,
  },
  purchaseText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  purchaseStatus: {
    backgroundColor: COLORS.textSecondary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  completedStatus: {
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '500',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: COLORS.darkOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    width: '85%',
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  updateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
  },
  updateButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    margin: 16,
  },
  errorText: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    color: COLORS.error,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FarmersDashboard;