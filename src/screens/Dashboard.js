import React, { useEffect, useState } from 'react';
import Background from '../components/Background'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionScreen from './TransactionScreen'; 
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Example using FontAwesome icons
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import LogoutScreen from './LogoutScreen.js'; 
import HomeScreen from './HomeScreen.js'; 
import StartScreen from './StartScreen.js'; 


const Tab = createBottomTabNavigator();

export default function Dashboard({ navigation }) {

return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={StartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Money"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="dollar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bolt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={LogoutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      >
      </Tab.Screen>
    </Tab.Navigator>
  );
}


