// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import DashboardScreen from '../screens/DashboardScreen';
// import BudgetScreen from '../screens/BudgetScreen';
// import TransactionScreen from '../screens/TransactionScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Login" component={LoginScreen} />
//       <Drawer.Screen name="Signup" component={SignupScreen} />
//       <Drawer.Screen name="dashboard" component={DashboardScreen} />
//       <Drawer.Screen name="budget" component={BudgetScreen} />
//       <Drawer.Screen name="transaction" component={TransactionScreen} />
//             <Drawer.Screen name="profile" component={ProfileScreen} />
      
      
      
      
//     </Drawer.Navigator>
//   );
// }



// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import DashboardScreen from '../screens/DashboardScreen';
// import BudgetScreen from '../screens/BudgetScreen';
// import TransactionScreen from '../screens/TransactionScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import { useAuth } from '../utils/useAuth';

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   const { token } = useAuth(); // ✅ Get login status

//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       {/* Always visible routes */}
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       {!token && <Drawer.Screen name="Login" component={LoginScreen} />}
//       {!token && <Drawer.Screen name="Signup" component={SignupScreen} />}

//       {/* Protected routes (only when logged in) */}
//       {token && <Drawer.Screen name="Dashboard" component={DashboardScreen} />}
//       {token && <Drawer.Screen name="Budget" component={BudgetScreen} />}
//       {token && <Drawer.Screen name="Transaction" component={TransactionScreen} />}
//       {token && <Drawer.Screen name="Profile" component={ProfileScreen} />}
//     </Drawer.Navigator>
//   );
// }





import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import BudgetScreen from '../screens/BudgetScreen';
import TransactionScreen from '../screens/TransactionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../utils/useAuth';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { token, logout } = useAuth(); // Include logout function

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={({ navigation }) => (
        <View style={{ flex: 1, padding: 20 }}>
          {/* Always shown */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={{ fontSize: 18, marginBottom: 15 }}>Home</Text>
          </TouchableOpacity>

          {/* Not logged in */}
          {!token && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ fontSize: 18, marginBottom: 15 }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ fontSize: 18, marginBottom: 15 }}>Signup</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Logged in routes */}
          {token && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Text style={{ fontSize: 18, marginBottom: 15 }}>Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Budget')}>
                <Text style={{ fontSize: 18, marginBottom: 15 }}>Budget</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Transaction')}>
                <Text style={{ fontSize: 18, marginBottom: 15 }}>Transaction</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text style={{ fontSize: 18, marginBottom: 15 }}>Profile</Text>
              </TouchableOpacity>

              {/* 🔴 Logout Button */}
              <TouchableOpacity
                onPress={() => {
                  logout();
                  navigation.navigate('Home');
                }}
                style={{ marginTop: 20 }}
              >
                <Text style={{ fontSize: 18, color: 'red' }}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    >
      {/* Screens still need to be registered */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Signup" component={SignupScreen} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Budget" component={BudgetScreen} />
      <Drawer.Screen name="Transaction" component={TransactionScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
