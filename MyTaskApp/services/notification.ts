import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Task } from '../types/tasks'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function schedulePushNotification(task: Task) {
  const timeUntilFirstOccurrence = task.firstOccurrence.getTime() - Date.now();

  if (timeUntilFirstOccurrence < 0) {
    console.error("The first occurrence is in the past. Notifications can't be scheduled.");
    return;
  }

  const trigger = {
    seconds: timeUntilFirstOccurrence / 1000, // Convert milliseconds to seconds
    repeats: false,
  };

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: `Reminder: ${task.name}`,
      body: 'It is time to complete this task.',
    },
    trigger,
  });

  console.log('Notification scheduled with ID:', notificationId);
  return notificationId;
}