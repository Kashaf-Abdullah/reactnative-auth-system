import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList,
  Alert, StyleSheet, TouchableOpacity, Modal, Platform
} from 'react-native';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../api/transactions';
import { useAuth } from '../utils/useAuth';

export default function TransactionScreen() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    if (token) fetchTransactions();
  }, [token]);

  const fetchTransactions = async () => {
    const res = await getTransactions(token);
    setTransactions(res.data || []);
  };

  const handleSubmit = async () => {
    if (!form.amount || !form.category || !form.date) {
      return Alert.alert('Please fill all required fields.');
    }

    if (editing) await updateTransaction(token, editing._id, form);
    else await addTransaction(token, form);

    setEditing(null);
    setForm({ amount: '', type: 'expense', category: '', date: '', description: '' });
    setModalVisible(false);
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    await deleteTransaction(token, id);
    fetchTransactions();
  };

  const openEdit = (tx) => {
    setEditing(tx);
    setForm({
      amount: tx.amount.toString(),
      type: tx.type,
      category: tx.category,
      date: tx.date.split('T')[0],
      description: tx.description
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Transaction" onPress={() => setModalVisible(true)} />

      <FlatList
        data={transactions}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.label}>
              {item.amount} | {item.type} | {item.category}
            </Text>
            <Text style={styles.subText}>
              {new Date(item.date).toLocaleDateString()} - {item.description}
            </Text>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => openEdit(item)} />
              <Button title="Delete" color="red" onPress={() => handleDelete(item._id)} />
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.heading}>{editing ? 'Edit Transaction' : 'Add Transaction'}</Text>

          <TextInput
            placeholder="Amount"
            value={form.amount}
            onChangeText={(text) => setForm({ ...form, amount: text })}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Type (income/expense)"
            value={form.type}
            onChangeText={(text) => setForm({ ...form, type: text })}
            style={styles.input}
          />

          <TextInput
            placeholder="Category"
            value={form.category}
            onChangeText={(text) => setForm({ ...form, category: text })}
            style={styles.input}
          />

          <TextInput
            placeholder="Date (YYYY-MM-DD)"
            value={form.date}
            onChangeText={(text) => setForm({ ...form, date: text })}
            style={styles.input}
          />

          <TextInput
            placeholder="Description"
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
            style={styles.input}
          />

          <View style={styles.buttonGroup}>
            <Button title={editing ? 'Update' : 'Add'} onPress={handleSubmit} />
            <Button title="Cancel" color="gray" onPress={() => {
              setModalVisible(false);
              setEditing(null);
              setForm({ amount: '', type: 'expense', category: '', date: '', description: '' });
            }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: Platform.OS === 'android' ? 30 : 60, flex: 1 },
  item: { borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 12 },
  label: { fontSize: 16, fontWeight: 'bold' },
  subText: { fontSize: 14, color: '#555' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalContent: { flex: 1, padding: 20, justifyContent: 'center' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 10, borderRadius: 6, marginBottom: 15,
    fontSize: 16, backgroundColor: '#fff',
  },
  buttonGroup: { marginTop: 20 },
});
