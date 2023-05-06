// contexts/TaskListContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { Task } from '../types/tasks';
import { getTasks } from '../services/database';

interface TaskListContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskListContext = createContext<TaskListContextType>({
  tasks: [],
  setTasks: () => {},
});

export const TaskListProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    })();
  }, []);

  return (
    <TaskListContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskListContext.Provider>
  );
};

export default TaskListContext;
