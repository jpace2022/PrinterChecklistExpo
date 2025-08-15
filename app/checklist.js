import { View, StyleSheet } from 'react-native';
import ChecklistScreen from './screens/ChecklistScreen';

export default function ChecklistRoute() {
  return (
    <View style={styles.container}>
      <ChecklistScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
