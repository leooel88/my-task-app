import * as Notifications from 'expo-notifications';

export const scheduleNotification = (
  taskId: string,
  title: string,
  message: string,
  triggerTime: Date,
) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
      data: { taskId: taskId },
    },
    trigger: triggerTime,
  });
};

export const cancelNotification = async (notificationId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};
