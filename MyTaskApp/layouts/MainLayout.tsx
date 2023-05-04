import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenContext from '../contexts/ScreenContext';
import TabNavigator from '../components/TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen'

interface ScreenComponents {
  [key: string]: JSX.Element;
}

const MainLayout: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const screenComponents: ScreenComponents = {
    Home: <HomeScreen />,
    AddTask: <AddTaskScreen />,
    TaskList: <TaskDetailsScreen />,
  };

  return (
    <ScreenContext.Provider value={{ setCurrentScreen }}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
        {screenComponents[currentScreen]}
        <TabNavigator />
      </SafeAreaView>
    </ScreenContext.Provider>
  );
};

export default MainLayout;
