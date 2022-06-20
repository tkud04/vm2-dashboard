import React from 'react'
import { ImageBackground, View } from 'react-native'

import splashBg from '../../assets/images/splash-bg.png'
import { Button, Root, Text } from '../../components'
import { WalkThrough } from './components/walkThrough/WalkThrough'
import styles from './styles'

export const OnboardScreen = ({ navigation }) => {
  return (
    <Root noPadding>
      <ImageBackground 
        source={splashBg} 
        resizeMode="contain"
        style={styles.container}
      >
        <WalkThrough />
        <View style={styles.btnWrapper}>
          <View style={{ width: '100%' }}>
            <Button text="LOGIN" onPress={() => navigation.navigate('Login')} />
            <Button text="SIGN UP" clear onPress={() => navigation.navigate('SignUpChoice')} />
          </View>
          <View>
            <Text style={styles.termsText}>By signing up you agree to the</Text>
            <Text style={styles.termsText}><Text style={{ fontWeight: 'bold' }}>
              Terms and Conditions</Text> for using Vbiz</Text>
          </View>
        </View>
      </ImageBackground>
    </Root>
  )
}
