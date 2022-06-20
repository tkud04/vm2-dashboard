import React, { useEffect } from 'react'
import { View } from 'react-native'

import { Button, Input, Root, Text } from '../../../components'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles from './styles'

export const CompanyInfoNew = ({ navigation }) => {
  const initialState = {
    // rcNumber: '',
    // tinNumber: '',
    companyName: '',
    email: '',
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
    navigation.navigate('DirectorInfo')
  }

  return (
    <Root style={styles.container}>
      <View>
        <Text style={styles.title}>Company details</Text>
        <Text style={styles.desc}>Please provide the following information</Text>
      </View>
      <View style={{ height: metrics.screenHeight / 2.5, }}>
        <Input
          onChangeText={handleInputChange('companyName')}
          wrapperStyle={{
            marginBottom: 20,
          }}
          placeholder="Enter Company Name"
          label="Company Name"
          hint="Business registration number"
          maxLength={10}
          value={formState.companyName}
          validationMode="req"
          // format="number"
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
      </View>
      <Button
        text="SUBMIT"
        onPress={handleSubmit}
      />
    </Root>
  )
}
