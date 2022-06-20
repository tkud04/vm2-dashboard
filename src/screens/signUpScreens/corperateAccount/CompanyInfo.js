import React, { useEffect } from 'react'
import { View } from 'react-native'

import { Button, Input, Root, Text } from '../../../components'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles from './styles'

export const CompanyInfo = ({ navigation }) => {
  const initialState = {
    rcNumber: '',
    tinNumber: '',
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
          onChangeText={handleInputChange('rcNumber')}
          wrapperStyle={{
            marginBottom: 20,
          }}
          placeholder="Enter RC Number"
          label="RC Number"
          hint="Business registration number"
          maxLength={10}
          value={formState.rcNumber}
          validationMode="len10|number"
          format="number"
        />
        <Input
          onChangeText={handleInputChange('tinNumber')}
          wrapperStyle={{
            marginBottom: 20,
          }}
          placeholder="Enter TIN Number"
          label="TIN Number"
          hint="Tax Identification number"
          maxLength={10}
          value={formState.tinNumber}
          validationMode="len10|number"
          format="number"
        />
      </View>
      <Button
        text="SUBMIT"
        onPress={handleSubmit}
      />
    </Root>
  )
}
