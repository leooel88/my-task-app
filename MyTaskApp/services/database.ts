import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/tasks'

export const addTask = async (task: Task) => {
  try {
    const tasksJSON = await AsyncStorage.getItem('tasks');
    const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
    tasks.push(task);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error('Error adding task:', e);
  }
};

export const getTasks = async () => {
  try {
    const tasksJSON = await AsyncStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
  } catch (e) {
    console.error('Error getting tasks:', e);
    return [];
  }
};

export const removeTask = async (taskId: string) => {
  try {
    const tasksJSON = await AsyncStorage.getItem('tasks');
    const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];

    const updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  } catch (e) {
    console.error('Error removing task:', e);
  }
};

