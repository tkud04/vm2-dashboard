import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles'

export const QuickService = (props) => {
  const press = () => {
    props.onPress()
  }
  
    return (
        <View style={[styles.container,props.style]}>
           <TouchableOpacity
              onPress={press}
             >
              <Ionicons name={props.icon} size={20} style={styles.icon} />
              <Text style={styles.text}>{props.text}</Text>
             </TouchableOpacity>
        </View>
    )
  }
