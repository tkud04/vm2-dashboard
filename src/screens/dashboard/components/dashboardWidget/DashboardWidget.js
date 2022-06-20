import React from 'react'
import { Text, View, TouchableOpacity, Switch } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from './styles'

export const DashboardWidget = (props) => {
  const press = () => {
    props.onPress()
  }

  const renderTransactionCount = num => {
    return (
      <View style={styles.transactionCount}>
        <Text style={styles.transactionCountText}>{num}</Text>
        </View>
    )
  }

  const renderSwitch = state => {
    return (
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={state.value ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={state?.setValue}
        value={state?.value}
      />
    )
  }

  const renderNavigation = () => (
    <Ionicons name="md-chevron-forward" size={30} style={{marginTop: 5}} color="#000" />
  )
  
    return (
        <View style={[styles.container,props.style]}>
           <TouchableOpacity
              onPress={press}
             >  
              <View style={styles.widgetContentWrapper}>
                 <View style={styles.leftSide}>
                  <Text style={styles.text}><Ionicons name={props.icon} size={20} style={[styles.icon,props.iconStyle]} /> {props.text}</Text>
                 </View>
                 <View style={styles.rightSide}>
                    {
                       props.type == "transaction" && (
                      renderTransactionCount(props.transactionCount)
                   )}
                   {
                     props.type == "navigation" && (
                      renderNavigation()
                     )
                   }
                   {
                     props.type == "switch" && (
                      renderSwitch({
                        value: props.value,
                        setValue: props.setValue
                      })
                     )
                   }
                 </View>
              </View>
            </TouchableOpacity>
        </View>
    )
  }
