import React, { useEffect } from 'react'
import { View } from 'react-native'

import { Button, Input, Root, Text } from '../../../components'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles from './styles'

export const CorperateAccount = ({ navigation }) => {
  const [account, setAccount] = React.useState('')

  useEffect(() => {
    generateHeader('', navigation)
  }, [])

  return (
    <Root style={styles.container} showLogin>
      <View>
        <Text style={styles.title}>Confirm details</Text>
        <Text style={styles.desc}>Enter your SME account details below</Text>
      </View>
      <View style={{ height: metrics.screenHeight/2.5, justifyContent: 'space-between' }}>
        <Input 
          onChangeText={(value) => setAccount(value)} 
          placeholder="Enter account" 
          label="Corporate Vbank account number"
          maxLength={10}
          value={account}
          validationMode="len10|number"
          format="number"
        />
        <Button 
          text="Continue" 
          onPress={()=> navigation.navigate('VerifyOtp')}
          disabled={account.length !== 10} 
        />
      </View>
    </Root>
  )
}
