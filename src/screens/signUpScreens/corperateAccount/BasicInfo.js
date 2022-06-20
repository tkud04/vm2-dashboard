import React, { useEffect } from 'react'
import { View } from 'react-native'

import { Button, Input, Root, Text } from '../../../components'
import { useOnboardingStore } from '../../../store/onboarding'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles from './styles'

export const BasicInfo = ({ navigation }) => {

  const {
    isRegistered,
    hasVbank,
    setHasVbank,
    setIsRegistered
  } = useOnboardingStore(({ ...rest }) => ({
    ...rest
  }));

  const initialState = {
    email: '',
    businessEmail: '',
    password: '',
    confirmPassword: ''
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
    navigation.navigate(hasVbank? 'DirectorInfo': 'CompanyInfo')
  }

  return (
    <Root style={styles.container}>
      <View>
        <Text style={styles.title}>Confirm details</Text>
        <Text style={styles.desc}>Set your login email and password</Text>
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
        <Input
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
        />

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
