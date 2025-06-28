import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform
} from 'react-native';
import { getProfile, updateProfile } from '../api/profile';
import { useAuth } from '../utils/useAuth';
export default function ProfileScreen() {
    const { token } = useAuth();
    const [form, setForm] = useState({ username: '', email: '' });
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token) {
      getProfile(token).then(res => {
        setForm({ username: res.username, email: res.email });
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [token]);

  const handleSubmit = async () => {
    try {
      await updateProfile(token, form);
      Alert.alert('Success', 'Profile updated!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TextInput
        placeholder="Username"
        value={form.username}
        onChangeText={(text) => setForm({ ...form, username: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        keyboardType="email-address"
        style={styles.input}
      />

      <Button title="Update Profile" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 80,
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
