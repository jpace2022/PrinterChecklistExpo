import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { ChecklistItem } from '../types';

const defaultChecklistItems: ChecklistItem[] = [
    // Network Configuration
    { id: '1', description: 'Configure Static IP on Raspberry Pi', isCompleted: false, category: 'network' },
    { id: '2', description: 'Set Subnet Mask & Gateway', isCompleted: false, category: 'network' },
    { id: '3', description: 'Configure DNS Servers', isCompleted: false, category: 'network' },
    { id: '4', description: 'Document MAC Address', isCompleted: false, category: 'network' },
    
    // CUPS Configuration
    { id: '5', description: 'Install CUPS on Raspberry Pi', isCompleted: false, category: 'cups' },
    { id: '6', description: 'Enable CUPS Web Interface (:631)', isCompleted: false, category: 'cups' },
    { id: '7', description: 'Add Printer to CUPS', isCompleted: false, category: 'cups' },
    { id: '8', description: 'Configure Printer Driver', isCompleted: false, category: 'cups' },
    { id: '9', description: 'Set Default Print Queue', isCompleted: false, category: 'cups' },
    { id: '10', description: 'Enable Remote Administration', isCompleted: false, category: 'cups' },
    
    // Printer Configuration
    { id: '11', description: 'Connect Printer via USB/Network', isCompleted: false, category: 'printer' },
    { id: '12', description: 'Configure Static IP on Printer', isCompleted: false, category: 'printer' },
    { id: '13', description: 'Enable Web Services on Printer', isCompleted: false, category: 'printer' },
    { id: '14', description: 'Set Printer Location/Description', isCompleted: false, category: 'printer' },
    
    // Security
    { id: '15', description: 'Configure CUPS Authentication', isCompleted: false, category: 'security' },
    { id: '16', description: 'Set Admin Password', isCompleted: false, category: 'security' },
    { id: '17', description: 'Enable SSL/TLS if needed', isCompleted: false, category: 'security' },
    { id: '18', description: 'Configure Firewall Rules', isCompleted: false, category: 'security' },
    
    // Testing
    { id: '19', description: 'Test Print from CUPS Web Interface', isCompleted: false, category: 'testing' },
    { id: '20', description: 'Test Network Print from Client', isCompleted: false, category: 'testing' },
    { id: '21', description: 'Verify Web Services Printing', isCompleted: false, category: 'testing' },
    { id: '22', description: 'Document Configuration in Wiki/Docs', isCompleted: false, category: 'testing' },
];

const ChecklistScreen = () => {
    const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(defaultChecklistItems);

    const toggleItem = (id: string) => {
        setChecklistItems(items =>
            items.map(item =>
                item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
            )
        );
    };

    const resetChecklist = () => {
        setChecklistItems(defaultChecklistItems);
    };

    const completedCount = checklistItems.filter(item => item.isCompleted).length;
    const totalCount = checklistItems.length;
    const progressPercentage = Math.round((completedCount / totalCount) * 100);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>IT Setup Checklist</Text>
            <Text style={styles.subtitle}>Raspberry Pi CUPS Print Server Configuration</Text>
            
            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                    Progress: {completedCount}/{totalCount} completed ({progressPercentage}%)
                </Text>
                <View style={styles.progressBar}>
                    <View 
                        style={[
                            styles.progressFill, 
                            { width: `${progressPercentage}%` }
                        ]} 
                    />
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                {['network', 'cups', 'printer', 'security', 'testing'].map((category) => {
                    const categoryItems = checklistItems.filter(item => item.category === category);
                    const categoryNames = {
                        network: '🌐 Network Configuration',
                        cups: '☕ CUPS Setup',
                        printer: '🖨️ Printer Configuration',
                        security: '🔒 Security',
                        testing: '✅ Testing & Documentation'
                    };
                    
                    return (
                        <View key={category}>
                            <Text style={styles.categoryTitle}>{categoryNames[category as keyof typeof categoryNames]}</Text>
                            {categoryItems.map((item) => (
                                <View key={item.id} style={styles.checklistItem}>
                                    <Text style={[
                                        styles.taskText,
                                        item.isCompleted && styles.completedTask
                                    ]}>
                                        {item.description}
                                    </Text>
                                    <Switch
                                        value={item.isCompleted}
                                        onValueChange={() => toggleItem(item.id)}
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={item.isCompleted ? '#007AFF' : '#f4f3f4'}
                                    />
                                </View>
                            ))}
                        </View>
                    );
                })}
            </ScrollView>

            {completedCount === totalCount && (
                <View style={styles.completeMessage}>
                    <Text style={styles.completeText}>🎉 Setup Complete! All tasks finished!</Text>
                </View>
            )}

            <TouchableOpacity style={styles.resetButton} onPress={resetChecklist}>
                <Text style={styles.resetButtonText}>Reset Checklist</Text>
            </TouchableOpacity>
        </View>
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
        marginBottom: 15,
        textAlign: 'center',
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        color: '#007AFF',
    },
    progressContainer: {
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    progressText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '600',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    scrollView: {
        flex: 1,
    },
    checklistItem: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    taskText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    completeMessage: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
    },
    completeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resetButton: {
        backgroundColor: '#FF9500',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ChecklistScreen;