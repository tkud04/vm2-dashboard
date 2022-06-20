import React, { useEffect } from 'react'
import { View } from 'react-native'

import { Button, Input, Root, Text } from '../../../components'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles from './styles'

export const PersonalInfo = ({ navigation }) => {
  const initialState = {
    bvn: '',
    nin: '',
    dob: '',
    email: ''
  };

  const [formState, setFormState] = React.useState(initialState);

  useEffect(() => {
    generateHeader('', navigation)
  }, [])

  const handleInputChange = (key => (val) => {
    setFormState(state => ({
      ...state,
      [key]: val
    }))
  });
  const handleSubmit = () => {
    navigation.navigate('VerifyOtp')
  }

  return (
    <Root style={styles.container}>
      <View>
        <Text style={styles.title}>Personal details</Text>
        <Text style={styles.desc}>Kindly provide the following information</Text>
      </View>
      <View style={{ height: metrics.screenHeight / 2.5, justifyContent: 'space-between' }}>
        <Input
          onChangeText={handleInputChange('bvn')}
          wrapperStyle={{
            marginBottom: 20,
          }}
          placeholder="Enter BVN"
          label="BVN"
          maxLength={10}
          value={formState.bvn}
          validationMode="len10|number"
          format="number"
        />
        <Input
          onChangeText={handleInputChange('nin')}
          wrapperStyle={{
            marginBottom: 20,
          }}
          placeholder="Enter NIN"
          label="NIN"
          maxLength={10}
          value={formState.nin}
          validationMode="len10|number"
          format="number"
        />
        <Input
          onChangeText={handleInputChange('nin')}
          wrapperStyle={{
            marginBottom: 20,
          }}
          placeholder="DD/MM/YY"
          label="Date of birth"
          maxLength={10}
          value={formState.nin}
          validationMode="len10|number"
          format="number"
        />
        <Input
          wrapperStyle={{
            marginBottom: 20,
          }}
          onChangeText={handleInputChange('email')}
          placeholder="Enter email address"
          label="Email address"
          value={formState.email}
          validationMode="req"
          autoCapitalize={"none"}
          keyboardType="email-address"
          returnKeyType="next"
        // onSubmitEditing={() => passwordInput.current.focusInput()}
        />
        <Button
          text="CONTINUE"
          onPress={handleSubmit}
        />
      </View>
    </Root>
  )
}
