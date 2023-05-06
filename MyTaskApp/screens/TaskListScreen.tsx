import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import TaskDetailOverlay from '../components/TaskDetailOverlay';
import { getTasks, removeTask } from '../services/database'
import { Task } from '../types/tasks'
import TaskListContext from '../contexts/TaskListContext';

const TaskListScreen: React.FC = () => {
  const { tasks, setTasks } = useContext(TaskListContext);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  

  useEffect(() => {
    (async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    })();
  }, []);

  const handleDeleteTask = async (taskId: string) => {
    await removeTask(taskId);
    const updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
    setTasks(updatedTasks);
  };


  const renderItem = ({ item }: { item: Task }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedTask(item)}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List:</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {selectedTask && (
        <TaskDetailOverlay
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={handleDeleteTask}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

export default TaskListScreen;
