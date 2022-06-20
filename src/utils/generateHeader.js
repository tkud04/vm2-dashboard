import React from 'react'
import { Appearance, Platform, StatusBar, View } from 'react-native'

import { Text, TouchItem } from '../components'
import colors from '../theme/colors'
import metrics from '../theme/metrics'
import BackArrow from '../assets/icons/left-black-arrow.svg'

const generateHeader = (title, navigation, otherParams, textRight, textS, icon) => {
  if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(Appearance.getColorScheme() !== 'dark' ? 'dark-content' : 'light-content')
  }

  if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.white)
      StatusBar.setBarStyle('dark-content')
  }

  navigation?.setOptions({
    headerTitle: () => <Text style={{
      color: colors.textPrimary,
      fontWeight: 'bold',
      width: !otherParams?.hideBack ? metrics.screenWidth / 1.7 : metrics.screenWidth - 35,
      textAlign: 'center',
    }}>{title}</Text>,

    headerLeft: () => (
      otherParams?.hideBack ? null :
        <TouchItem onPress={() => {
          navigation.goBack()
        }} style={{ marginLeft: 20 }}>
          <View style={{ marginTop: Platform.OS !== 'ios' ? 18 : 10 }}>
            <BackArrow />
          </View>
        </TouchItem>
    ),
    headerRight: () => (
        !otherParams?.hideRight ? null : null
    ),
    ...otherParams
})
}

export default generateHeader