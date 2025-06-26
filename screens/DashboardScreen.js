import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen({ route }) {
  const { name, email } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard</Text>
      <Text style={styles.info}>Name: {name}</Text>
      <Text style={styles.info}>Email: {email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  info: {
    fontSize: 18,
    marginBottom: 10
  }
});
