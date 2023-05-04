import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Crypto from 'expo-crypto';

import { addTask } from '../services/database';
import { FrequencyUnit } from '../types/tasks'

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
}

const AddTaskOverlay: React.FC<AddTaskOverlayProps> = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [taskName, setTaskName] = useState('');
  const [firstOccurrence, setFirstOccurrence] = useState(new Date());
  const [frequency, setFrequency] = useState({ unit: "hour" as unknown as FrequencyUnit, value: 1 });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChangeDate = (event: DateTimePickerEvent, date?: Date | undefined) => {
    if (!date || typeof date == 'undefined') {
      return;
    }
    setFirstOccurrence(date);
    setShowDatePicker(false);
  }

  const handleSubmit = async () => {
    if (step === 3) {
      await addTask({
        id: (await generateUniqueId()),
        name: taskName,
        firstOccurrence,
        frequency
      });
      setStep(1)
      setTaskName('')
      setFirstOccurrence(new Date())
      setFrequency({ unit: "hour" as unknown as FrequencyUnit, value: 1 })
      setShowDatePicker(false)
      onClose();
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
                    mode={'date'}
                    display={'calendar'}
                    onChange={handleChangeDate}
                  />}
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
