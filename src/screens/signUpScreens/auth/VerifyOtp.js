import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'

import { Button, Input, Root, Text, TouchItem } from '../../../components'
import { PinKeypad, PINBoxes, PINPad } from '../../../components/pin'
import colors from '../../../theme/colors'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles from './styles'

export const VerifyOtp = ({ navigation, route }) => {
  const [otp, setOtp] = React.useState('')
  const pinModalRef = useRef(null);

  useEffect(() => { 
    generateHeader('', navigation)
  }, [])

  function onPin(pin) {
    console.log({ pin });
    // pinModalRef.current.toggle()
  }
  function onEnteredPIN(pin, token) {
    // console.log({ pin, token });
  }

  function onResendOTP(pin, token) {
    // console.log({ pin, token });
  }

  const handleVerify = React.useCallback(() => {
    const requestType = route.params?.type;
    if (requestType == "management") {
      return navigation.navigate('AccountOperation')
    }
    navigation.navigate('BasicInfo')
    setOtp('');
  }, []);

  return (
    <Root style={styles.container} scrollable={false}>
      <View>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.desc}>Check your messages and enter PIN sent to your phone number (+234) ******509</Text>
      </View>
      <View style={{ maxHeight: metrics.screenHeight / 2.5, justifyContent: 'space-between' }}>
        <PINBoxes
          mode={1}
          pinValue={otp}
          showValue={true}
          enteredPIN={onEnteredPIN}
        />
        <Button
          text="VERIFY"
          style={{ marginVertical: 20 }}
          disabled={otp.length !== 6}
          onPress={handleVerify}
        />
        <View style={{ flexDirection: 'row', }}>
          <Text style={{ textAlign: 'center', }}>
            Didn't get OTP?   </Text>
          <TouchItem onPress={onResendOTP}>
            <Text
              style={{
                color: colors.primaryColor,
                fontWeight: 'bold'
              }}
            >Resend</Text>
          </TouchItem>

        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColorz: 'red' }}>

        <PINPad
          mode={1}
          enteredPIN={onEnteredPIN}
          onValueChange={(val) => {
            setOtp(val)
            console.log({ val });
          }}

        />
        {/* <PinKeypad ref={pinModalRef} enteredPIN={onPin} /> */}

      </View>
    </Root>
  )
}
