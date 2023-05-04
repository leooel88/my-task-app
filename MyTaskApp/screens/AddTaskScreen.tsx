import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationButton from '../components/NotificationButton';
import { scheduleNotification } from '../services/notifications';

const AddTaskScreen = () => {
  const handleScheduleNotification = () => {
    scheduleNotification('1', 'New Task', 'You have a new task', new Date(new Date().getTime() + 1000));
  };

  return (
    <View style={styles.container}>
      <Text>Add a Task Screen</Text>
      <NotificationButton onPress={handleScheduleNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
});

export default AddTaskScreen;