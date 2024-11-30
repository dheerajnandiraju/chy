import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import Layout from './Layout';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F6F8F9',
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
  smallFont: {
    fontSize: 16,
  },
  burger: {
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  mealCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D9CDB', // Blue for emphasis
    marginBottom: 5,
  },
  monthIncrease: {
    fontSize: 14,
    color: '#4CAF50', // Green for positive growth
  },
  chartContainer: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  legend: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  notificationIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
});

const Statistics = () => {
  const navigation = useNavigation();

  const handleIconPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const chartData = {
    labels: ['01', '05', '10', '15', '20'],
    datasets: [
      {
        data: [10, 20, 15, 30, 25],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Blue
        strokeWidth: 2,
      },
      {
        data: [5, 10, 8, 15, 12],
        color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`, // Green
        strokeWidth: 2,
      },
    ],
  };

  const yearlyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [10, 30, 25, 40, 35],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Blue
        strokeWidth: 2,
      },
      {
        data: [5, 15, 10, 20, 18],
        color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`, // Green
        strokeWidth: 2,
      },
    ],
  };

  return (
    <Layout navigation={navigation}>
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.header}>
            <View style={styles.burger}>
              <Text style={styles.title}>Statistics</Text>
            </View>
            <TouchableOpacity onPress={() => handleIconPress('Notification')} style={styles.notificationIcon}>
              <Icon name="bell" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Card 1 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Monthly Meals Donated</Text>
            <Text style={styles.mealCount}>120 meals</Text>
            <Text style={styles.monthIncrease}>This Month +10%</Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={chartData}
                width={350}
                height={250}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  bezier: true,
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: chartData.datasets[0].color(1) }]} />
                <Text style={{ fontSize: 12 }}>Meals Donated</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: chartData.datasets[1].color(1) }]} />
                <Text style={{ fontSize: 12 }}>Meals Accepted</Text>
              </View>
            </View>
          </View>

          {/* Card 2 */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Yearly Meals Donated</Text>
            <Text style={styles.mealCount}>120 meals</Text>
            <Text style={styles.monthIncrease}>This Year +10%</Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={yearlyChartData}
                width={350}
                height={250}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  bezier: true,
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: chartData.datasets[0].color(1) }]} />
                <Text style={{ fontSize: 12 }}>Meals Donated</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: chartData.datasets[1].color(1) }]} />
                <Text style={{ fontSize: 12 }}>Meals Accepted</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Statistics;
