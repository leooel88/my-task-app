import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Task } from '../types/tasks';

interface TaskDetailOverlayProps {
  task: Task;
  onClose: () => void;
  onDelete: (taskId: string) => void;
}

const TaskDetailOverlay: React.FC<TaskDetailOverlayProps> = ({ task, onClose, onDelete }) => {
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.content}>
            <Text style={styles.title}>Task Details</Text>
            <Text>ID: {task.id}</Text>
            <Text>Name: {task.name}</Text>
            <Text>First Occurrence: {(new Date(task.firstOccurrence)).toLocaleDateString()}</Text>
            <Text>
              Frequency: {task.frequency.value} {task.frequency.unit}
            </Text>
            <Text>
              Notification ID : {task.notificationId} 
            </Text>
            <TouchableOpacity onPress={() => {
                onDelete(task.id)
                onClose()
              }} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default TaskDetailOverlay;
