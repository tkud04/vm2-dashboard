import React,{useState} from "react"
import { View } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from "./styles"
import { Text } from '../../../../components'

export const AccountPicker = (props) => {
    const countries = ["Brent Technologies"]

    return (
        <View style={styles.container}>
          <View style={{flexDirection: "row"}}>
              <View style={styles.accountInitials}>
                <Text style={styles.accountInitialsText}>BT</Text>
              </View>
              <SelectDropdown
	            data={countries}
                defaultButtonText="Select an account"
                onSelect={(selectedItem, index) => {
		          console.log(`selectedItem: ${selectedItem}, index: ${index}`)
	            }}
                renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={{marginTop: 10, paddingBottom: 5}}>
                      <View style={styles.dropdownChildStyle}>
                        <Text style={styles.dropdownChildText}>{selectedItem ? selectedItem : 'Select account'}</Text>
                        <Ionicons name="chevron-down-outline" size={20} style={{marginLeft: props.fullWidth ? 100 : 5}} color="#000" />
                       </View>
                       <Text style={styles.greetingText}>Good morning</Text>
                      </View>
                    );
                }}
                renderCustomizedRowChild={(item, index) => {
                    return (
                     <View style={styles.dropdown3RowChildStyle}>
                       <Text style={styles.dropdownText}>{item}</Text>
                     </View>
              );
            }}
	            buttonTextAfterSelection={(selectedItem, index) => {
		          // text represented after item is selected
		          // if data array is an array of objects then return selectedItem.property to render after item is selected
		          return selectedItem
	            }}
                rowTextForSelection={(item, index) => {
		          // text represented for each item in dropdown
		          // if data array is an array of objects then return item.property to represent item in dropdown
		          return item
	            }}
                buttonStyle={styles.buttonStyle}
              />
            </View>
           
        </View>
    )
}