import React, { useEffect, useRef, useState } from 'react'
import { Image, ImageBackground, View } from 'react-native'

import { Button, Input, Root, Text, TouchItem } from '../../components'
import metrics from '../../theme/metrics'
import generateHeader from '../../utils/generateHeader'
import splashBg from '../../assets/images/splash-bg.png'
import logo from '../../assets/images/logo.png'
import colors from '../../theme/colors'
import styles from './styles'

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordInput = useRef()

  const handleLogin = () => {
    console.log("dummy login")
    console.log(`Email: ${email}, password: ${password}`);
    //For development purposes, go to Dashboard without logging in
    navigation.navigate('Dashboard')
  }

  useEffect(() => {
    generateHeader('', navigation)
  }, [])
  return (
    <Root>
      <ImageBackground 
        source={splashBg} 
        resizeMode="contain"
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.desc}>Enter your login details to continue</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Input 
            wrapperStyle={{
              marginBottom: 20,
            }}
            onChangeText={(value) => setEmail(value)} 
            placeholder="Email address" 
            label="Enter email address"
            value={email}
            validationMode="req"
            autoCapitalize={"none"}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.current?.focusInput()}
          />
          <Input
            wrapperStyle={{
              marginBottom: 20,
            }}
            ref={passwordInput}
            onChangeText={(value) => setPassword(value)} 
            placeholder="Enter password" 
            label="Password"
            value={password}
            onSubmitEditing={handleLogin}
            secureTextEntry
            autoCapitalize={"none"}
            returnKeyType="send"
          />
          <View style={styles.forgotPasswordBtn}>
            <TouchItem onPress={() => { }}>
              <Text style={{ fontWeight: 'bold' }}>Forgot password?</Text>
            </TouchItem>
          </View>
          <Button
            text="LOGIN" 
            onPress={handleLogin}
            disabled={password.length && email.length ? false : true} 
          />
          <View style={{ marginTop: 25, flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={{ textAlign: 'center',  }}>
              Don’t have an account?   </Text>
              <TouchItem onPress={() => navigation.navigate('SignUpChoice')}>
                <Text 
                  style={{ 
                    color: colors.primaryColor, 
                    fontWeight: 'bold' 
                  }}
                >Sign up</Text>
              </TouchItem>
          
          </View>
          {/* <View style={styles.logoWrapper}>
            <Image source={logo} />
          </View> */}
        </View>
      </ImageBackground>
    </Root>
  )
}
