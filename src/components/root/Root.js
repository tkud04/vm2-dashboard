import React from 'react'
import { ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import colors from '../../theme/colors'
import { Text, TouchItem } from '../'
import styles from './styles'

const Root = ({ children, scrollable, style, showLogin }) => {
  const navigation = useNavigation()

  const renderContent = () => {
    return (
      <View style={styles.showLoginWrapper}>
        <Text style={{ textAlign: 'center' }}>
          Already have an account? <TouchItem onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: colors.primaryColor }}>Login</Text>
          </TouchItem>
        </Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {scrollable ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
          {showLogin 
            ? renderContent()
            : null
          }
        </ScrollView>
      ) : <>
        {children}
        { showLogin 
          ? renderContent()
          : null
        }
      </>}
    </View>
  )
}

export { Root }
