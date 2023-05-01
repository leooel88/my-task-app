import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { initDB } from './services/database';

const App = () => {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
