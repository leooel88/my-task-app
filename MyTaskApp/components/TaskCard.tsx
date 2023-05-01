import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TaskCardProps {
  title: string;
  dueDate: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, dueDate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.dueDate}>{dueDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 14,
    color: '#999',
  },
});

export default TaskCard;
