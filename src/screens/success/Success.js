import React, { useEffect, useRef, useState } from 'react'
import { Image, ImageBackground, View } from 'react-native'

import { Button, Input, Root, Text, TouchItem } from '../../components'
import metrics, { WIDTH } from '../../theme/metrics'
import generateHeader from '../../utils/generateHeader'
import splashBg from '../../assets/images/splash-bg.png'
import logo from '../../assets/images/logo.png'
import colors from '../../theme/colors'
import styles from './styles'
import { Images } from '../../utils/assets/assets'
import { useOnboardingStore } from '../../store/onboarding'

export const Success = ({ navigation }) => {

  const {
    isRegistered,
    hasVbank,
    hasOperators,
    setHasVbank,
  } = useOnboardingStore(({ ...rest }) => ({
    ...rest
  }));

  const isNewRegistration = (!isRegistered && !hasVbank);

  const handleLogin = () => {
    navigation.navigate("Login");
  }

  useEffect(() => {
    generateHeader('', navigation, { hideBack: true })
  }, [])
  return (
    <Root >
      <ImageBackground
        source={splashBg}
        resizeMode="contain"
        style={[styles.container, { justifyContent: 'space-evenly', }]}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={Images.check_circle}
            style={{
              // width: WIDTH / 3.8,
              width: 135,
              height: 135,
              alignSelf: "center",
              marginBottom: 60,
            }}
            resizeMode="contain"
          />
          <Text style={styles.title}>Successful!</Text>
          <Text style={styles.desc}>{
            hasVbank ?
              "A confimation email will be sent to you once request is approved after which you can login and start using the account." :
              isRegistered ?
                "A confimation email will be sent to you once request is approved after which you can login and start using the account." :
                "Your request was successfully submitted. We will reach out to you shortly."
          }
          </Text>
        </View>
        <View style={{ }}>
          <Button
            text={isNewRegistration? "DONE": "PROCEED TO LOGIN"}
            onPress={handleLogin}
          />
        </View>
      </ImageBackground>
    </Root>
  )
}
