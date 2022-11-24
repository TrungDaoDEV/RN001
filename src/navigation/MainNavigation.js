import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../components/Home';
import Reports from '../components/Reports';
import Settings from '../components/Settings';
import StackInput from './StackInput';

const Tab = createMaterialBottomTabNavigator();

export default function MainNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // initialRouteName="HomeAdd"
      activeColor="blue"
      // eslint-disable-next-line react-native/no-inline-styles
      barStyle={{backgroundColor: 'powderblue'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Trang Chủ',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Input"
        component={StackInput}
        options={{
          tabBarLabel: 'Nhập liệu',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="keyboard-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: 'Báo cáo',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="database-import"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
