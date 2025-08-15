import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checklist from '../../components/Checklist';
import usePrinters from '../../hooks/usePrinters';

const ChecklistScreen = ({ route }) => {
    const { printerId } = route.params;
    const { printers } = usePrinters();
    const selectedPrinter = printers.find(printer => printer.id === printerId);

    return (
        <View style={styles.container}>
            {selectedPrinter ? (
                <>
                    <Text style={styles.title}>{selectedPrinter.name} Setup Checklist</Text>
                    <Checklist items={selectedPrinter.checklistItems} />
                </>
            ) : (
                <Text style={styles.error}>Printer not found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    error: {
        fontSize: 18,
        color: 'red',
    },
});

export default ChecklistScreen;