import React, { useEffect } from 'react'
import { View } from 'react-native'

import { Button, Input, Root, Text } from '../../../components'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles from './styles'

export const AccountInfo = ({ navigation }) => {
  const initialState = {
    email: '',
    businessEmail: '',
    password: '',
    confirmPassword: ''
  };

  const [formState, setFormState] = React.useState(initialState);

  const isNewRegistration = true;

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
    // navigation.navigate(isNewRegistration? 'CompanyInfo': 'DirectorInfo')
    navigation.navigate('CreatePin')
  }

  return (
    <Root style={styles.container}>
      <View>
        <Text style={styles.title}>Account details</Text>
        <Text style={styles.desc}>Enter a new email address and password</Text>
      </View>
      <View style={{ height: metrics.screenHeight / 2.5, justifyContent: 'space-between' }}>
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
        {/* <Input
          wrapperStyle={{
            marginBottom: 20,
          }}
          onChangeText={handleInputChange('email')}
          label="Business mail (Optional)"
          placeholder="Enter email address (Optional)"
          value={formState.email}
          // validationMode="req"
          autoCapitalize={"none"}
          keyboardType="email-address"
          returnKeyType="next"
        /> */}

        <Input
          wrapperStyle={{
            marginBottom: 20,
          }}
          onChangeText={handleInputChange('password')}
          placeholder="Enter password"
          label="Password"
          value={formState.password}
          onSubmitEditing={handleSubmit}
          secureTextEntry
          autoCapitalize={"none"}
          returnKeyType="next"
        />
        <Input
          wrapperStyle={{
            marginBottom: 20,
          }}
          onChangeText={handleInputChange('confirmPassword')}
          placeholder="Enter password"
          label="Password"
          value={formState.confirmPassword}
          onSubmitEditing={handleSubmit}
          secureTextEntry
          autoCapitalize={"none"}
        // returnKeyType="next"
        />
        <Button
          text="CONFIRM"
          onPress={handleSubmit}
        />
      </View>
    </Root>
  )
}
