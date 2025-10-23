import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { addPrinter } from '../api/printerService';

const AddPrinterScreen = () => {
    const [printerName, setPrinterName] = useState('');
    const [printerIP, setPrinterIP] = useState('');
    const [printerModel, setPrinterModel] = useState('');
    const [raspberryPiIP, setRaspberryPiIP] = useState('');
    const [isStaticIP, setIsStaticIP] = useState(true);
    const [macAddress, setMacAddress] = useState('');
    const [subnet, setSubnet] = useState('255.255.255.0');
    const [gateway, setGateway] = useState('');
    const [dnsServers, setDnsServers] = useState('8.8.8.8, 8.8.4.4');
    const [cupsQueueName, setCupsQueueName] = useState('');
    const [printerDriver, setPrinterDriver] = useState('');
    const [webServicesEnabled, setWebServicesEnabled] = useState(true);
    const [notes, setNotes] = useState('');

    const handleAddPrinter = async () => {
        if (printerName && printerIP && printerModel) {
            await addPrinter({
                name: printerName,
                ip: printerIP,
                model: printerModel,
                raspberryPiIP,
                isStaticIP,
                macAddress,
                subnet,
                gateway,
                dnsServers,
                cupsQueueName,
                printerDriver,
                webServicesEnabled,
                notes,
            });
            router.back();
        } else {
            alert('Please fill in required fields (Name, IP, Model)');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add New Printer Setup</Text>
            <Text style={styles.subtitle}>Configure Raspberry Pi CUPS Print Server</Text>

            {/* Basic Info Section */}
            <Text style={styles.sectionTitle}>📋 Basic Information</Text>
            <TextInput
                style={styles.input}
                placeholder="Printer Name *"
                value={printerName}
                onChangeText={setPrinterName}
            />
            <TextInput
                style={styles.input}
                placeholder="Printer IP Address *"
                value={printerIP}
                onChangeText={setPrinterIP}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Printer Model *"
                value={printerModel}
                onChangeText={setPrinterModel}
            />
            <TextInput
                style={styles.input}
                placeholder="MAC Address"
                value={macAddress}
                onChangeText={setMacAddress}
            />

            {/* Raspberry Pi Section */}
            <Text style={styles.sectionTitle}>🍓 Raspberry Pi Configuration</Text>
            <TextInput
                style={styles.input}
                placeholder="Raspberry Pi IP Address"
                value={raspberryPiIP}
                onChangeText={setRaspberryPiIP}
                keyboardType="numeric"
            />

            {/* Network Section */}
            <Text style={styles.sectionTitle}>🌐 Network Configuration</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Static IP Address</Text>
                <Switch
                    value={isStaticIP}
                    onValueChange={setIsStaticIP}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isStaticIP ? '#007AFF' : '#f4f3f4'}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Subnet Mask"
                value={subnet}
                onChangeText={setSubnet}
            />
            <TextInput
                style={styles.input}
                placeholder="Gateway"
                value={gateway}
                onChangeText={setGateway}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="DNS Servers (comma separated)"
                value={dnsServers}
                onChangeText={setDnsServers}
            />

            {/* CUPS Section */}
            <Text style={styles.sectionTitle}>☕ CUPS Configuration</Text>
            <TextInput
                style={styles.input}
                placeholder="CUPS Queue Name"
                value={cupsQueueName}
                onChangeText={setCupsQueueName}
            />
            <TextInput
                style={styles.input}
                placeholder="Printer Driver"
                value={printerDriver}
                onChangeText={setPrinterDriver}
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Web Services Enabled</Text>
                <Switch
                    value={webServicesEnabled}
                    onValueChange={setWebServicesEnabled}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={webServicesEnabled ? '#007AFF' : '#f4f3f4'}
                />
            </View>

            {/* Notes Section */}
            <Text style={styles.sectionTitle}>📝 Additional Notes</Text>
            <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Add any additional notes or configuration details..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
            />

            <Button title="Add Printer Setup" onPress={handleAddPrinter} />
            <View style={styles.spacer} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#007AFF',
    },
    input: {
        height: 45,
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 15,
    },
    notesInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 12,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    switchLabel: {
        fontSize: 16,
        color: '#333',
    },
    spacer: {
        height: 30,
    },
});

export default AddPrinterScreen;