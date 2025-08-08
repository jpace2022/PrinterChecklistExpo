import { View, StyleSheet } from 'react-native';
import { AddPrinterScreen } from './screens/AddPrinterScreen';

export default function AddPrinterRoute() {
  return (
    <View style={styles.container}>
      <AddPrinterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
