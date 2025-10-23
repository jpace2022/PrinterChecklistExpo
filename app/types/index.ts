export interface Printer {
    id: string;
    name: string;
    ipAddress: string;
    model?: string;
    isConfigured: boolean;
    // IT Admin specific fields
    raspberryPiIP?: string;
    cupsWebInterface?: string;
    isStaticIP: boolean;
    macAddress?: string;
    subnet?: string;
    gateway?: string;
    dnsServers?: string;
    cupsQueueName?: string;
    printerDriver?: string;
    webServicesEnabled: boolean;
    notes?: string;
}

export interface ChecklistItem {
    id: string;
    description: string;
    isCompleted: boolean;
    category: 'network' | 'cups' | 'printer' | 'security' | 'testing';
}