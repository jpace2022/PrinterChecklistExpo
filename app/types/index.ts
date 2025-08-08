export interface Printer {
    id: string;
    name: string;
    ipAddress: string;
    isConfigured: boolean;
}

export interface ChecklistItem {
    id: string;
    description: string;
    isCompleted: boolean;
}

export interface PrinterSetup {
    printer: Printer;
    checklist: ChecklistItem[];
}