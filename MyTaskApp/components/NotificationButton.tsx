import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NotificationButtonProps {
  onPress: () => void;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Schedule Notification</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e88e5',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NotificationButton;
