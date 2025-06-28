// // BudgetScreen.js (React Native)
// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, TouchableOpacity, Modal } from 'react-native';
// import { getBudgets, addBudget, updateBudget, deleteBudget } from '../api/budgets';
// import { useAuth } from '../utils/useAuth';

// export default function BudgetScreen() {
//   const { token } = useAuth();
//   const [budgets, setBudgets] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({ category: '', limit: '', period: 'monthly' });
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     if (token) fetchBudgets();
//   }, [token]);

//   const fetchBudgets = async () => {
//     const res = await getBudgets(token);
//     setBudgets(res.data || []);
//   };

//   const handleSubmit = async () => {
//     if (!form.category || !form.limit) return Alert.alert('All fields required');
//     if (editing) await updateBudget(token, editing._id, form);
//     else await addBudget(token, form);
//     setEditing(null);
//     setForm({ category: '', limit: '', period: 'monthly' });
//     setModalVisible(false);
//     fetchBudgets();
//   };

//   const handleDelete = async (id) => {
//     await deleteBudget(token, id);
//     fetchBudgets();
//   };

//   const openEdit = (item) => {
//     setEditing(item);
//     setForm({ category: item.category, limit: item.limit, period: item.period });
//     setModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Add Budget" onPress={() => setModalVisible(true)} />

//       <FlatList
//         data={budgets}
//         keyExtractor={item => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text>{item.category} - {item.limit} ({item.period})</Text>
//             <View style={styles.actions}>
//               <Button title="Edit" onPress={() => openEdit(item)} />
//               <Button title="Delete" color="red" onPress={() => handleDelete(item._id)} />
//             </View>
//           </View>
//         )}
//       />

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContent}>
//           <Text style={styles.heading}>{editing ? 'Edit Budget' : 'Add Budget'}</Text>
//           <TextInput placeholder="Category" value={form.category} onChangeText={text => setForm({ ...form, category: text })} style={styles.input} />
//           <TextInput placeholder="Limit" value={form.limit} onChangeText={text => setForm({ ...form, limit: text })} keyboardType="numeric" style={styles.input} />
//           <TextInput placeholder="Period (monthly/yearly)" value={form.period} onChangeText={text => setForm({ ...form, period: text })} style={styles.input} />
//           <Button title={editing ? 'Update' : 'Add'} onPress={handleSubmit} />
//           <Button title="Cancel" color="gray" onPress={() => { setModalVisible(false); setEditing(null); }} />
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1 ,marginTop:44},
//   item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
//   actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
//   input: { borderWidth: 1, padding: 10, marginVertical: 10 },
//   heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   modalContent: { padding: 20, flex: 1, justifyContent: 'center' },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { getBudgets, addBudget, updateBudget, deleteBudget } from '../api/budgets';
import { useAuth } from '../utils/useAuth';

export default function BudgetScreen() {
  const { token } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ category: '', limit: '', period: 'monthly' });
  const [modalVisible, setModalVisible] = useState(false);
console.log('Modal visible:', modalVisible);

  useEffect(() => {
    if (token) fetchBudgets();
  }, [token]);

  const fetchBudgets = async () => {
    const res = await getBudgets(token);
    setBudgets(res.data || []);
  };

  const handleSubmit = async () => {
    if (!form.category || !form.limit) return Alert.alert('All fields required');
    if (editing) await updateBudget(token, editing._id, form);
    else await addBudget(token, form);
    setEditing(null);
    setForm({ category: '', limit: '', period: 'monthly' });
    setModalVisible(false);
    fetchBudgets();
  };

  const handleDelete = async (id) => {
    await deleteBudget(token, id);
    fetchBudgets();
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ category: item.category, limit: String(item.limit), period: item.period });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Budgets</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Budget</Text>
      </TouchableOpacity>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Category</Text>
        <Text style={styles.headerCell}>Limit</Text>
        <Text style={styles.headerCell}>Spent</Text>
        <Text style={styles.headerCell}>Period</Text>
        <Text style={styles.headerCell}>Actions</Text>
      </View>

      <FlatList
        data={budgets}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.category}</Text>
            <Text style={styles.cell}>{item.limit}</Text>
            <Text style={styles.cell}>{item.currentSpent}</Text>
            <Text style={styles.cell}>{item.period}</Text>
            <View style={styles.actionCell}>
              <TouchableOpacity onPress={() => openEdit(item)} style={styles.editButton}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

     <Modal visible={modalVisible} animationType="slide" transparent={false}>
  <View style={styles.modalContent}>
    <Text style={styles.heading}>{editing ? 'Edit Budget' : 'Add Budget'}</Text>

    <TextInput
      placeholder="Category"
      value={form.category}
      onChangeText={(text) => setForm({ ...form, category: text })}
      style={styles.input}
    />

    <TextInput
      placeholder="Limit"
      value={form.limit}
      onChangeText={(text) => setForm({ ...form, limit: text })}
      keyboardType="numeric"
      style={styles.input}
    />

    <TextInput
      placeholder="Period (monthly/yearly)"
      value={form.period}
      onChangeText={(text) => setForm({ ...form, period: text })}
      style={styles.input}
    />

    <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
      <Text style={styles.saveButtonText}>{editing ? 'Update' : 'Add'} Budget</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        setModalVisible(false);
        setEditing(null);
        setForm({ category: '', limit: '', period: 'monthly' });
      }}
      style={styles.cancelButton}
    >
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>
  </View>
</Modal>

    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, marginTop: 40 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },

  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 5,
  },
  headerCell: { flex: 1, fontWeight: 'bold' },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: { flex: 1 },
  actionCell: {
    flexDirection: 'row',
    gap: 5,
    flex: 1.2,
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  actionText: { color: '#fff', fontSize: 12 },

  modalContent: {
    padding: 20,
    justifyContent: 'center',
  },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
  },
  cancelButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
