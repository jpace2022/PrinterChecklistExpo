import AsyncStorage from '@react-native-async-storage/async-storage';
import { Printer } from '../types';

const STORAGE_KEY = 'printers';

export const addPrinter = async (printerData: {
    name: string;
    ip: string;
    model: string;
    raspberryPiIP?: string;
    isStaticIP: boolean;
    macAddress?: string;
    subnet?: string;
    gateway?: string;
    dnsServers?: string;
    cupsQueueName?: string;
    printerDriver?: string;
    webServicesEnabled: boolean;
    notes?: string;
}): Promise<void> => {
    try {
        const existingPrinters = await getAllPrinters();
        const newPrinter: Printer = {
            id: Date.now().toString(),
            name: printerData.name,
            ipAddress: printerData.ip,
            model: printerData.model,
            isConfigured: true,
            raspberryPiIP: printerData.raspberryPiIP,
            cupsWebInterface: printerData.raspberryPiIP ? `http://${printerData.raspberryPiIP}:631` : undefined,
            isStaticIP: printerData.isStaticIP,
            macAddress: printerData.macAddress,
            subnet: printerData.subnet,
            gateway: printerData.gateway,
            dnsServers: printerData.dnsServers,
            cupsQueueName: printerData.cupsQueueName,
            printerDriver: printerData.printerDriver,
            webServicesEnabled: printerData.webServicesEnabled,
            notes: printerData.notes,
        };
        const updatedPrinters = [...existingPrinters, newPrinter];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrinters));
    } catch (error) {
        console.error('Error adding printer:', error);
        throw error;
    }
};

export const getAllPrinters = async (): Promise<Printer[]> => {
    try {
        const printersJson = await AsyncStorage.getItem(STORAGE_KEY);
        return printersJson ? JSON.parse(printersJson) : [];
    } catch (error) {
        console.error('Error getting printers:', error);
        return [];
    }
};

export const deletePrinter = async (id: string): Promise<void> => {
    try {
        const existingPrinters = await getAllPrinters();
        const updatedPrinters = existingPrinters.filter(printer => printer.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrinters));
    } catch (error) {
        console.error('Error deleting printer:', error);
        throw error;
    }
};

export const updatePrinter = async (id: string, updates: Partial<Omit<Printer, 'id'>>): Promise<void> => {
    try {
        const existingPrinters = await getAllPrinters();
        const updatedPrinters = existingPrinters.map(printer =>
            printer.id === id ? { ...printer, ...updates } : printer
        );
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPrinters));
    } catch (error) {
        console.error('Error updating printer:', error);
        throw error;
    }
};