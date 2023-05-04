import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Your screen content */}
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  }
}

export default HomeScreen;
