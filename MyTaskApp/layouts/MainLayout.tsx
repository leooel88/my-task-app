import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskListProvider } from '../contexts/TaskListContext';
import ScreenContext from '../contexts/ScreenContext';
import TabNavigator from '../components/TabNavigator';
import HomeScreen from '../screens/HomeScreen';
import TaskListScreen from '../screens/TaskListScreen'

interface ScreenComponents {
  [key: string]: JSX.Element;
}

const MainLayout: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const screenComponents: ScreenComponents = {
    Home: <HomeScreen />,
    TaskList: <TaskListScreen />,
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

const MainLayoutWrapper: React.FC = () => {
  return (
    <TaskListProvider>
      <MainLayout />
    </TaskListProvider>
  );
};

export default MainLayoutWrapper;

