import { useEffect, useState } from 'react';
import { fetchPrinters, addPrinter } from '../api/printerService';
import { Printer } from '../types';

const usePrinters = () => {
    const [printers, setPrinters] = useState<Printer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPrinters = async () => {
            try {
                const printerList = await fetchPrinters();
                setPrinters(printerList);
            } catch (err) {
                setError('Failed to load printers');
            } finally {
                setLoading(false);
            }
        };

        loadPrinters();
    }, []);

    const handleAddPrinter = async (newPrinter: Printer) => {
        try {
            await addPrinter(newPrinter);
            setPrinters((prevPrinters) => [...prevPrinters, newPrinter]);
        } catch (err) {
            setError('Failed to add printer');
        }
    };

    return { printers, loading, error, handleAddPrinter };
};

export default usePrinters;