//@ts-check
import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'

import { Button, Input, Root, Text, TouchItem } from '../../../components'
import { PinKeypad, PINBoxes, PINPad } from '../../../components/pin'
import colors from '../../../theme/colors'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles from './styles'

export const CreatePin = ({ navigation }) => {
  const [account, setAccount] = React.useState('')
  const [pin, setPin] = React.useState('')
  const [confirmPin, setConfirmPin] = React.useState('')
  const [mode, setMode] = React.useState('initial')

  const pinModalRef = useRef(null);
  // const mode = useRef('initial');

  useEffect(() => {
    generateHeader('', navigation)
  }, [])

  function onPin(pin) {
    console.log({ pin });
    // pinModalRef.current.toggle()
  }
  function onEnteredPIN(pin, token) {
    console.log({ pin, token });
    //  setMode('confirm');
    // pinModalRef.current.toggle()
  }
  function onConfirmPIN(pin, token) {
    console.log({ pin, token });
    // pinModalRef.current.toggle()
  }

  return (
    <Root style={styles.container} scrollable={false}>
      <View>
        <Text style={styles.title}>Create transaction PIN</Text>
        <Text style={styles.desc}>To protect your account, please create a 4-digit PIN </Text>
      </View>
      <View style={{ maxHeight: metrics.screenHeight / 2.5, justifyContent: 'space-between' }}>
        <PINBoxes
          mode={0}
          pinValue={pin}
          label='Enter PIN'
          showValue={false}
          enteredPIN={onEnteredPIN}
        />
        {/* {mode == 'confirm' &&  */}
        {pin.length == 4 &&
          <PINBoxes
            mode={0}
            // pinValue={confirmPin}
            pinValue={pin}
            label='Confirm PIN'
            showValue={true}
            enteredPIN={onConfirmPIN}

          />}
        <Button
          text="CREATE"
          style={{ marginVertical: 20 }}
          disabled={pin.length !== 4}
          onPress={() => navigation.navigate('PreviewDetails')}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <PINPad
          mode={0}
          enteredPIN={mode == 'initial' ? onEnteredPIN : onConfirmPIN}
          onValueChange={(val) => {
            setPin(val);
            console.log({ val });
          }}
        // onValueChange={(val) => {
        //   if (mode == 'initial')
        //     setPin(val);
        //   else
        //     setConfirmPin(val);
        //   console.log({ val });
        // }}

        />
      </View>
    </Root>
  )
}
