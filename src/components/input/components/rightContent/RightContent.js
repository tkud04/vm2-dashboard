import React, { useState } from 'react'
import { View } from 'react-native'

import { Text, TouchItem } from '../../../'
import SecureEye from '../../../../assets/icons/secure-eye.svg'
import styles from '../../styles'

export const RightContent = ({ 
  type, 
  rightIcon, 
  rightNotation, 
  showSecureIcon, 
  onClickRightIcon, 
  rightContent, 
  rightContentStyle 
}) => {
  const renderContent = () => {

    switch(type) {
      case 'icon':
        if (showSecureIcon) {
          return (
            <View style={styles.rightIcon}>
              <TouchItem
                  ripple
                  onPress={() => onClickRightIcon ? onClickRightIcon() : null}
              >
                <SecureEye />
              </TouchItem>
            </View>
          )
        }
  
        if (rightIcon) {
          return (
              <View
                  style={[
                    styles.rightIconPosition,
                    { opacity: 1 },
                  ]}
              >
                  <TouchItem
                      style={{ flex: 1 }}
                      onPress={onClickRightIcon}
                  >
                    <View style={styles.iconWrapper}>
                      {rightIcon()}
                    </View>
                  </TouchItem>
              </View>
          );
        }
        break
      
      case 'notation':
        if (rightNotation) {
          return (
            <View style={styles.containerRightN}>
              <Text style={styles.textRightN}>{rightNotation}</Text>
            </View>
          )
        }
        break
      
      case 'content':
        if (rightContent) {
          return <View style={[styles.rightContent, rightContentStyle]}>{rightContent}</View>;
        }
        break
  
      default: 
        return <View />
    }
  }

  return (
    <>
      {renderContent()}
    </>
  )
}
