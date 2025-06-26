import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {

const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     console.log('Login Data:', { email, password });
//   };

const handleLogin = async () => {
  try {
    const response = await fetch('http://192.168.10.8:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.user);
      alert('Login Successful');
       // Navigate to Dashboard with user data
      navigation.navigate('Dashboard', {
        name: data.user.name,
        email: data.user.email
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Login Error:', error);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  }
});
