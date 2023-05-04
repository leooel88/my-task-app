import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTasks } from '../services/database'
import { Task } from '../types/tasks'

const TaskDetailsScreen: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    })();
  }, []);

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
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

export default TaskDetailsScreen;
