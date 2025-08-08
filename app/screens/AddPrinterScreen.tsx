import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addPrinter } from '../api/printerService';

const AddPrinterScreen = ({ navigation }) => {
    const [printerName, setPrinterName] = useState('');
    const [printerIP, setPrinterIP] = useState('');
    const [printerModel, setPrinterModel] = useState('');

    const handleAddPrinter = async () => {
        if (printerName && printerIP && printerModel) {
            await addPrinter({ name: printerName, ip: printerIP, model: printerModel });
            navigation.goBack();
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Printer</Text>
            <TextInput
                style={styles.input}
                placeholder="Printer Name"
                value={printerName}
                onChangeText={setPrinterName}
            />
            <TextInput
                style={styles.input}
                placeholder="Printer IP Address"
                value={printerIP}
                onChangeText={setPrinterIP}
            />
            <TextInput
                style={styles.input}
                placeholder="Printer Model"
                value={printerModel}
                onChangeText={setPrinterModel}
            />
            <Button title="Add Printer" onPress={handleAddPrinter} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default AddPrinterScreen;