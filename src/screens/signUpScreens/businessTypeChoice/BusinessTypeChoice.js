import React, { useEffect } from "react"
import { Image, View } from "react-native"

import { Button, Root, Text, TouchItem } from "../../../components"
import generateHeader from "../../../utils/generateHeader"
import styles from "./styles"
import { RadioIcon } from "../../../components/button/RadioButton"
import colors from "../../../theme/colors"
import { useOnboardingStore } from "../../../store/onboarding"

export const BusinessTypeChoice = ({ navigation }) => {
  useEffect(() => {
    generateHeader('', navigation)
  }, []);

  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const { setHasVbank, setIsRegistered } = useOnboardingStore(({ ...rest }) => ({
    ...rest
  }));

  const handleSubmit= ()=>{
    setHasVbank(false);
    if(selectedIndex==0){
      setIsRegistered(true);
      navigation.navigate("PersonalInfo")
    }else if (selectedIndex==1){
      setIsRegistered(false);
      navigation.navigate("CompanyInfoNew")
    }
  }

  const options = [
    {
      title: "I have a registered business",
      subtitle: "You will be required to provide:",
      requirements: [
        "Business registration number",
        "Tax Identification number",
        "Directors information",
      ]
    },
    {
      title: "I want to register a business",
      subtitle: "You will be required to provide:",
      requirements: [
        "Your company's name",
        "Shareholders details",
        "Directors information",
      ]
    },
  ]
  return (
    <Root style={styles.container}>
      <View>
        <Text style={styles.title}>Setup business account</Text>
        <Text style={styles.desc}>Select the type of account that applies to you</Text>
      </View>
      <View>
        {options.map((option, index)=>(
          <TouchItem 
          key={"index-"+index} 
          onPress={() => { setSelectedIndex(index)}} 
          style={[styles.optionWrapper, selectedIndex==index?{borderColor: colors.primaryColor}: {}]}>
          <View style={[styles.logoWrapper, { marginTop: 15, marginRight: 10 }]}>
            <RadioIcon checked={index == selectedIndex} />
          </View>
          <View>
            <Text style={[styles.optionTitle, selectedIndex==index && {color: colors.primaryColor}]}>{option.title}</Text>
            <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            {option.requirements.map(requirement=>(
              <Text style={{ lineHeight: 24 }}> . {requirement}</Text>
            ))}
          </View>
        </TouchItem>
        ))} 
      </View>
      <Button
        text="PROCEED"
        onPress={handleSubmit}
        disabled={selectedIndex < 0}
      />
    </Root>
  )
}
