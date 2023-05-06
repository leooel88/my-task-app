import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Crypto from 'expo-crypto';
import { addTask } from '../services/database';
import { Task, FrequencyUnit } from '../types/tasks'
import TaskListContext from '../contexts/TaskListContext';
import { schedulePushNotification } from '../services/notification';
import * as Notifications from 'expo-notifications';

const generateUniqueId = async () => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const timestamp = new Date().getTime();
  const combinedString = `${timestamp}-${randomString}`;

  const id = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, combinedString);
  return id;
};

interface AddTaskOverlayProps {
  visible: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
}

const AddTaskOverlay: React.FC<AddTaskOverlayProps> = ({ visible, onClose, onTaskAdded }) => {
  const { tasks, setTasks } = useContext(TaskListContext);
  const [step, setStep] = useState(1);
  const [taskName, setTaskName] = useState('');
  const [firstOccurrence, setFirstOccurrence] = useState(new Date());
  const [frequency, setFrequency] = useState({ unit: "hour" as unknown as FrequencyUnit, value: 1 });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleChangeDate = (event: DateTimePickerEvent, date?: Date | undefined) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
    } else if (date) {
      setShowDatePicker(false);
      setFirstOccurrence(date);
    }
  }

  const handleChangeTime = (event: DateTimePickerEvent, time?: Date | undefined) => {
    if (event.type === 'dismissed') {
      setShowTimePicker(false);
    } else if (time) {
      setShowTimePicker(false);
      setFirstOccurrence(new Date(firstOccurrence.setHours(time.getHours(), time.getMinutes())));
    }
  };

  const resetState = () => {
    setStep(1)
    setTaskName('')
    setFirstOccurrence(new Date())
    setFrequency({ unit: "hour" as unknown as FrequencyUnit, value: 1 })
    setShowDatePicker(false)
  }

  const handleSubmit = async () => {
    if (step === 3) {
      const newTask: Task = {
        id: (await generateUniqueId()),
        name: taskName,
        firstOccurrence,
        frequency,
        notificationId: ''
      };
      const notificationId = await schedulePushNotification(newTask);
      if (notificationId) {
        newTask.notificationId = notificationId
      }
      await addTask(newTask);
      setTasks([...tasks, newTask]);
      resetState();
      onClose();
      onTaskAdded();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Modal visible={visible} transparent onRequestClose={onClose} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>

            <View style={styles.container}>
              {step === 1 && (
                <>
                  <Text>Task Name:</Text>
                  <TextInput onChangeText={setTaskName} value={taskName} />
                </>
              )}

              {step === 2 && (
                <>
                  <Text>First Occurrence:</Text>
                  <Text onPress={() => setShowDatePicker(true)}>{firstOccurrence.toLocaleDateString()}</Text>
                  {showDatePicker  && <DateTimePicker
                    value={firstOccurrence}
                    mode={"date"}
                    display={"default"}
                    onChange={handleChangeDate}
                  />}
                  <Text onPress={() => setShowTimePicker(true)}>{firstOccurrence.toLocaleTimeString()}</Text>
                  {showTimePicker && (
                    <DateTimePicker
                      value={firstOccurrence}
                      mode={"time"}
                      display={"default"}
                      onChange={handleChangeTime}
                    />
                  )}
                </>
              )}

              {step === 3 && (
                <>
                  <Text>Frequency:</Text>
                  <Picker
                    selectedValue={frequency.unit}
                    onValueChange={(itemValue) =>
                      setFrequency({ ...frequency, unit: itemValue })
                    }>
                    <Picker.Item label="Heure" value="heure" />
                    <Picker.Item label="Jour" value="jour" />
                    <Picker.Item label="Mois" value="mois" />
                  </Picker>
                  <TextInput
                    keyboardType="number-pad"
                    onChangeText={(value) => setFrequency({ ...frequency, value: Number(value) })}
                    value={String(frequency.value)}
                  />
                </>
              )}

              <Button title={step === 3 ? 'Add' : 'Suivant'} onPress={handleSubmit} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
});

export default AddTaskOverlay;
