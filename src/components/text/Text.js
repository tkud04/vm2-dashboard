import { Text as RNText } from 'react-native'
import React from 'react'

import colors from '../../theme/colors'
import { size } from '../../theme/fonts'

export const Text = ({ children, style, ...props }) => {
  return (
      <RNText 
        {...props} 
        style={[{ color: colors.textPrimary, fontSize: size.font14 }, style]}
      >
        {children}
      </RNText>
  )
}
