import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import StackMain from './src/navigation/StackMain';

LogBox.ignoreLogs(['Sending', 'Non-serializable']);

const App = () => {
  return (
    <NavigationContainer>
      <StackMain />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
