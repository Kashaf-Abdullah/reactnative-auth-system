import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import { getCategoryAnalytics, getIncomeVsExpense, getTrends, getBudgets } from '../api/analytics';
import { useAuth } from '../utils/useAuth';
// import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen({ navigation }) {
  const { token,logout } = useAuth();
  // const { t } = useTranslation();
  const [categoryData, setCategoryData] = useState([]);
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
  await logout();
  navigation.navigate('Home'); // or 'Login', depending on your app
};

// const logout = async () => {
//   await AsyncStorage.removeItem('token');
//   setToken(null);
//   navigation.navigate('Home'); // 👈 navigate to your login screen
// };
  const colors = ['#1d243c', '#2a314e', '#5a5f7a', '#898da5', '#3739fb', '#324480', '#05174f', '#0b216b', '#0a278a', '#424652'];

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [catRes, barRes, trendRes, budgetRes] = await Promise.all([
        getCategoryAnalytics(token),
        getIncomeVsExpense(token),
        getTrends(token),
        getBudgets(token),
      ]);

      const category = catRes?.data || {};
      const incomeExpense = barRes?.data || {};
      const trends = trendRes?.data || {};
      const budgetsList = budgetRes?.data || [];

      console.log('✅ category:', category);
      console.log('✅ incomeExpense:', incomeExpense);
      console.log('✅ trends:', trends);
      console.log('✅ budgetsList:', budgetsList);

      // ✅ Pie Chart
      if (category.labels && category.values) {
        const pie = category.labels.map((label, i) => ({
          name: label || `Label ${i + 1}`,
          population: category.values[i] || 0,
          color: colors[i % colors.length],
          legendFontColor: "#333",
          legendFontSize: 12,
        }));
        setCategoryData(pie);
      }

      // ✅ Bar Chart
      if (
        incomeExpense?.income != null &&
        incomeExpense?.expense != null &&
        incomeExpense?.savings != null
      ) {
        setBarData({
          labels: ['Income', 'Expense', 'Savings'],
          datasets: [{ data: [incomeExpense.income, incomeExpense.expense, incomeExpense.savings] }]
        });
      }

      // ✅ Line Chart
      if (trends.labels && trends.income && trends.expense) {
        setLineData({
          labels: trends.labels,
          datasets: [
            {
              data: trends.income,
              color: () => '#2a314e',
              strokeWidth: 2
            },
            {
              data: trends.expense,
              color: () => '#5a5f7a',
              strokeWidth: 2
            }
          ],
          legend: ['Income', 'Expense']
        });
      }

      // ✅ Budgets
      setBudgets(Array.isArray(budgetsList) ? budgetsList : []);
      setLoading(false);
    } catch (err) {
      console.error('Dashboard error:', err);
      setLoading(false);
    }
  };

  fetchData();
}, [token]);


  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
return (
  <>

 <View style={styles.logoutContainer}>
      <Button title="Logout" color="#dc3545" onPress={handleLogout} />
    </View>
  <ScrollView style={styles.container}>
    
    {/* 🔹 Pie Chart */}
    {categoryData?.length > 0 && (
      <View style={styles.card}>
        <Text style={styles.title}>Top Expense Categories</Text>
        <PieChart
          data={categoryData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 10]}
          absolute
        />
      </View>
    )}

    {/* 🔹 Bar Chart */}
    {barData && (
      <View style={styles.card}>
        <Text style={styles.title}>Income vs Expense (This Year)</Text>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
        />
      </View>
    )}

    {/* 🔹 Line Chart */}
    {lineData && (
      <View style={styles.card}>
        <Text style={styles.title}>Income vs Expense (Last 6 Months)</Text>
        <LineChart
          data={lineData}
          width={screenWidth - 40}
          height={240}
          chartConfig={chartConfig}
          bezier
        />
      </View>
    )}

    {/* 🔹 Budgets */}
    {budgets.length > 0 && (
      <View style={styles.card}>
        <Text style={styles.title}>Budgets</Text>
        {budgets.map(b => (
          <View key={b._id} style={styles.budgetItem}>
            <Text>{b.category || 'Unnamed'}: {b.currentSpent}/{b.limit} ({b.utilization}%)</Text>
            <Text style={[styles.badge, {
              backgroundColor:
                b.status === 'Exceeded' ? '#dc3545' :
                b.status === 'Warning' ? '#ffc107' :
                '#28a745'
            }]}>
              {b.status}
            </Text>
          </View>
        ))}
      </View>
    )}

  </ScrollView>
  </>
);

}

const chartConfig = {
  backgroundGradientFrom: "#f6f6f6",
  backgroundGradientTo: "#f6f6f6",
  color: (opacity = 1) => `rgba(29, 36, 60, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7,
  useShadowColorFromDataset: false
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  budgetItem: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  badge: {
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12
  },
  card: {
  backgroundColor: '#f9f9f9',
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 10,
  padding: 15,
  marginBottom: 20,
  elevation: 2, // For Android shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
}
,
logoutContainer: {
  padding: 10,
  alignItems: 'flex-end',
  backgroundColor: '#fff',
}

});
