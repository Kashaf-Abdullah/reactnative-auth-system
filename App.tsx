
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
// // import DashboardScreen from './screens/DashboardScreen';
// // import DrawerNavigator from './DrawerNavigator'; // ✅ import the drawer

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//        {/* <Stack.Screen name="Dashboard" component={DashboardScreen} />  */}

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './components/DrawerNavigator'; // ✅ must be default export
import { AuthProvider } from './utils/useAuth';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator /> {/* ✅ must be a valid React component */}
      </NavigationContainer>
    </AuthProvider>
  );
}
