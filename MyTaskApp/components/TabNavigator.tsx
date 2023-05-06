import React, { useContext, useState  } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import ScreenContext from '../contexts/ScreenContext';
import HomeIcon from '../assets/icons/HomeIcon'
import HomeSolidIcon from '../assets/icons/HomeSolidIcon'
import TaskIcon from '../assets/icons/TaskIcon'
import TaskSolidIcon from '../assets/icons/TaskSolidIcon'
import TaskListIcon from '../assets/icons/TaskListIcon'
import TaskListSolidIcon from '../assets/icons/TaskListSolidIcon'
import AddTaskOverlay from './AddTaskOverlay';

const TabNavigator: React.FC = () => {
  const { setCurrentScreen } = useContext(ScreenContext);
  const [ localCurrentScreen, setLocalCurrentScreen ] = useState('Home')
  const [addTaskOverlayVisible, setAddTaskOverlayVisible] = useState(false);

  const setScreen = (screen: string) => {
    setCurrentScreen(screen)
    setLocalCurrentScreen(screen)
  }

  return (
    <View style={styles.container}>
      <AddTaskOverlay
        visible={addTaskOverlayVisible}
        onClose={() => setAddTaskOverlayVisible(false)}
        onTaskAdded={() => setScreen('TaskList')}
      />
      <View style={styles.navbar}>
        <Pressable onPress={() => setScreen('Home')}>
          <View>
            {localCurrentScreen === 'Home' ? (
                <HomeSolidIcon height={30} width={30} />
              ) : (
                <HomeIcon height={30} width={30} />
              )}
          </View>
        </Pressable>
        <Pressable onPress={() => {
            setAddTaskOverlayVisible(true)
            setLocalCurrentScreen('AddTask')
          }}>
          <View>
              {localCurrentScreen === 'AddTask' ? (
                  <TaskSolidIcon height={30} width={30} />
                ) : (
                  <TaskIcon height={30} width={30} />
                )}
          </View>
        </Pressable>
        <Pressable onPress={() => setScreen('TaskList')}>
          <View>
              {localCurrentScreen === 'TaskList' ? (
                  <TaskListSolidIcon height={30} width={30} />
                ) : (
                  <TaskListIcon height={30} width={30} />
                )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '90%',
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 20,
  }
});

export default TabNavigator;
