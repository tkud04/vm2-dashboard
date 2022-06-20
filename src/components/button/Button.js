import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './styles'

export const Button = ({ clear = false, onPress, style, text, disabled }) => {
  const textStyle = clear ? styles.clearText : styles.text
  const disabledButtonStyle = disabled 
    ? {...styles.container, backgroundColor: 'rgba(198, 20, 94, 0.5)'} 
    : styles.container
  const containerStyle = clear ? styles.clearContainer : disabledButtonStyle
  return (
    <TouchableOpacity 
      activeOpacity={0.6} 
      style={[containerStyle, { marginVertical: 10 }, style]} 
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.wrapper}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}
