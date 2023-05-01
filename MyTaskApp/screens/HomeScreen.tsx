import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/MainStackNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Add Task"
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
};

export default HomeScreen;
