import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Printer Setup App</Text>
            <Button
                title="Add New Printer"
                onPress={() => navigation.navigate('AddPrinter')}
            />
            <Button
                title="View Printers"
                onPress={() => navigation.navigate('PrinterList')}
            />
            <Button
                title="Checklist"
                onPress={() => navigation.navigate('Checklist')}
            />
        </View>
    );
};

export default HomeScreen;