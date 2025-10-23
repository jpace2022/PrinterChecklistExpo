import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>IT Print Server Manager</Text>
            <Text style={styles.subtitle}>Raspberry Pi CUPS Configuration Tool</Text>
            
            <TouchableOpacity 
                style={styles.button}
                onPress={() => router.push('/add-printer')}
            >
                <Text style={styles.buttonIcon}>🍓</Text>
                <Text style={styles.buttonText}>Add New Print Server</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.button}
                onPress={() => router.push('/printer-list' as any)}
            >
                <Text style={styles.buttonIcon}>📋</Text>
                <Text style={styles.buttonText}>View All Servers</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.button}
                onPress={() => router.push('/checklist')}
            >
                <Text style={styles.buttonIcon}>✅</Text>
                <Text style={styles.buttonText}>Setup Checklist</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 12,
        marginBottom: 15,
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default HomeScreen;