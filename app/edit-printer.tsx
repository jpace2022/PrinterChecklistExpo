import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getPrinter, updatePrinter } from '../api/printerService';
import { Printer } from '../types';

export default function EditPrinterScreen() {
const { id } = useLocalSearchParams();
const [printer, setPrinter] = useState<Printer | null>(null);
const [formData, setFormData] = useState({
    name: '',
    ipAddress: '',
    location: '',
    piHostname: '',
    securityInfo: '',
    notes: '',
});

useEffect(() => {
    loadPrinter();
}, [id]);

const loadPrinter = async () => {
    if (id) {
        const data = await getPrinter(id as string);
        if (data) {
            setPrinter(data);
            setFormData({
                name: data.name,
                ipAddress: data.ipAddress,
                location: data.location,
                piHostname: data.piHostname || '',
                securityInfo: data.securityInfo || '',
                notes: data.notes || '',
            });
        }
    }
};

const handleSubmit = async () => {
    if (!formData.name || !formData.ipAddress) {
        Alert.alert('Error', 'Please fill in required fields');
        return;
    }

    const updated = await updatePrinter(id as string, formData);
    if (updated) {
        Alert.alert('Success', 'Printer updated successfully');
        router.back();
    } else {
        Alert.alert('Error', 'Failed to update printer');
    }
};

if (!printer) {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    );
}

return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Edit Printer</Text>

            <Text style={styles.label}>Name *</Text>
            <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Printer name"
            />

            <Text style={styles.label}>IP Address *</Text>
            <TextInput
                style={styles.input}
                value={formData.ipAddress}
                onChangeText={(text) => setFormData({ ...formData, ipAddress: text })}
                placeholder="192.168.1.100"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Location</Text>
            <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholder="Building/Room"
            />

            <Text style={styles.label}>Pi Hostname</Text>
            <TextInput
                style={styles.input}
                value={formData.piHostname}
                onChangeText={(text) => setFormData({ ...formData, piHostname: text })}
                placeholder="pi-hostname"
            />

            <Text style={styles.label}>Security Info</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.securityInfo}
                onChangeText={(text) => setFormData({ ...formData, securityInfo: text })}
                placeholder="Security credentials or notes"
                multiline
                numberOfLines={3}
            />

            <Text style={styles.label}>Notes</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.notes}
                onChangeText={(text) => setFormData({ ...formData, notes: text })}
                placeholder="Additional notes"
                multiline
                numberOfLines={3}
            />
        </ScrollView>

        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Update Printer</Text>
            </TouchableOpacity>
        </View>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
},
scrollView: {
    flex: 1,
},
scrollContent: {
    padding: 16,
    paddingBottom: 100,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
},
label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
},
input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
},
textArea: {
    height: 80,
    textAlignVertical: 'top',
},
bottomBar: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#000',
    backgroundColor: 'white',
    padding: 16,
    gap: 12,
},
cancelButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#6c757d',
    borderRadius: 8,
    alignItems: 'center',
},
cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
},
submitButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
},
submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
},
});
