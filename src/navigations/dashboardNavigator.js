import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../theme/colors'
import {ScreenTitle} from '../screens/dashboard/components'

import { Home, Transact, Support, Profile } from '../screens'

const Tab = createBottomTabNavigator()

const renderScreen = ({ name, component, options = {}, path }, index) => {
  return (
    <Tab.Screen
      name={name}
      key={index}
      options={options}
      path={path}
      component={component}
    />
  )
}

export const DashboardNavigator = () => {
  return (
    <Tab.Navigator
     initialRouteName={'Home'}
     screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
           
          if (route.name === 'Home') {
            iconName ='home-outline'
          } else if (route.name === 'Transact') {
            iconName = 'paper-plane-outline'
          } else if(route.name === 'Support'){
            iconName = 'chatbox-outline'
          } else if(route.name === 'Profile'){
            iconName = 'md-person-outline'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: 'gray',
      })}
     >
    {routes.map((item, index) => {
      return renderScreen(item, index)
    })}
  </Tab.Navigator>
  )
}

const routes = [
  {
    name: 'Home',
    component: Home,
    options: { headerShown: false }
  },
  {
    name: 'Transact',
    component: Transact,
    options: { 
      headerTitleStyle: {
         alignSelf: 'center',
         color: '#000',
         marginLeft: '50%'
       }
     }
  },
  {
    name: 'Support',
    component: Support,
    options: { 
      headerTitleStyle: {
         alignSelf: 'center',
         color: '#000',
         marginLeft: '50%'
       }
     }
  },
  {
    name: 'Profile',
    component: Profile,
    options: { 
     headerTitleStyle: {
        alignSelf: 'center',
        color: '#000',
        marginLeft: '50%'
      }
    }
  }
]