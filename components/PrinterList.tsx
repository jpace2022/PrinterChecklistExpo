import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Printer } from '../app/types';

interface PrinterListProps {
  printers: Printer[];
  onSelectPrinter: (printer: Printer) => void;
}

const PrinterList: React.FC<PrinterListProps> = ({ printers, onSelectPrinter }) => {
  const renderPrinterItem = ({ item }: { item: Printer }) => (
    <TouchableOpacity onPress={() => onSelectPrinter(item)}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
        <Text style={{ color: '#666' }}>{item.ipAddress}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={printers}
        renderItem={renderPrinterItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PrinterList;