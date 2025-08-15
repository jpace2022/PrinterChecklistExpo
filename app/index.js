import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function Home() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
