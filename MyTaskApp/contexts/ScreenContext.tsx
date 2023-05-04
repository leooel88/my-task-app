import { createContext } from 'react';

const ScreenContext = createContext({
  setCurrentScreen: (screen: string) => {},
});

export default ScreenContext;
