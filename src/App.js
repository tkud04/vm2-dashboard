import React, { useEffect, useRef } from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import RNBootSplash from "react-native-bootsplash"
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from "react-native-safe-area-context"

import { name as appName } from '../app.json'
import RootNavigator from './navigations/rootNavigator'


const App = () => {
  const navRef = useRef()

  const onNavReady = () => {
    const bootSplashTimer = setTimeout(() => {
      RNBootSplash.hide()
    }, 1000)
    
    return () => clearTimeout(bootSplashTimer);
  }

  const linking = {
    prefixes: ["vbiz://"],
    config: {
      screens: {
        Login: {
          path: "Login",
        },
        Verify: {
          path: "verify",
        },
      },
    },
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer
        ref={navRef}
        uriprefix="vbiz://"
        linking={linking}
        onReady={onNavReady}
      >
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

AppRegistry.registerComponent(appName, () => App)
