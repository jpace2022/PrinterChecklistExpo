import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deletePrinter, getAllPrinters } from './api/printerService';
import { Printer } from './types';

export default function PrinterListScreen() {
    const [printers, setPrinters] = useState<Printer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPrinters();
    }, []);

    const loadPrinters = async () => {
        try {
            const printersData = await getAllPrinters();
            setPrinters(printersData);
        } catch (error) {
            console.error('Error loading printers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePrinter = (printer: Printer) => {
        Alert.alert(
            'Delete Printer',
            `Are you sure you want to delete ${printer.name}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: async () => {
                        await deletePrinter(printer.id);
                        loadPrinters();
                    }
                }
            ]
        );
    };

    const renderPrinter = ({ item }: { item: Printer }) => (
        <View style={styles.printerItem}>
            <View style={styles.printerInfo}>
                <Text style={styles.printerName}>{item.name}</Text>
                <Text style={styles.printerDetails}>🖨️ Printer IP: {item.ipAddress}</Text>
                {item.model && <Text style={styles.printerDetails}>📄 Model: {item.model}</Text>}
                {item.raspberryPiIP && (
                    <Text style={styles.printerDetails}>🍓 Pi IP: {item.raspberryPiIP}</Text>
                )}
                <Text style={styles.printerDetails}>
                    🌐 {item.isStaticIP ? 'Static IP' : 'DHCP'}
                </Text>
                {item.cupsQueueName && (
                    <Text style={styles.printerDetails}>☕ Queue: {item.cupsQueueName}</Text>
                )}
                {item.webServicesEnabled && (
                    <Text style={styles.printerDetails}>✅ Web Services: Enabled</Text>
                )}
            </View>
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeletePrinter(item)}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading printers...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Printer List</Text>
            {printers.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No printers added yet</Text>
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={() => router.push('/add-printer')}
                    >
                        <Text style={styles.addButtonText}>Add Your First Printer</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={printers}
                    renderItem={renderPrinter}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    },
    printerItem: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    printerInfo: {
        flex: 1,
    },
    printerName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    printerDetails: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    deleteText: {
        color: 'white',
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    addButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});
