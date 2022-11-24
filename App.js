import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackMain from './src/navigation/StackMain';

const App = () => {
  return (
    <NavigationContainer>
      <StackMain />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
