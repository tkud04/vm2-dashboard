import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { OnboardScreen } from '../screens'

const Stack = createStackNavigator()

const renderScreen = ({ name, component, options = {}, path }, index) => {
  return (
    <Stack.Screen
      name={name}
      key={index}
      options={options}
      path={path}
      component={component}
    />
  )
}

export const OnboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'OnboardScreen'}>
    {routes.map((item, index) => {
      return renderScreen(item, index)
    })}
  </Stack.Navigator>
  )
}

const routes = [
  {
    name: 'OnboardScreen',
    component: OnboardScreen,
    options: { headerShown: false }
  }
]