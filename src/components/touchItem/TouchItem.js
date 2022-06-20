import React from 'react'
import { TouchableOpacity } from 'react-native'

export const TouchItem = ({ children, ...props }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      {children}
    </TouchableOpacity>
  )
}
