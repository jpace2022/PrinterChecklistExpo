import { View, Text, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';
import { HomeScreen } from './screens/HomeScreen';

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
