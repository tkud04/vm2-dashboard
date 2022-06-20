import React from 'react'
import { Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import learnMoreImage from '../../../../../assets/images/boardroom.png'

import styles from './styles'

export const LearnMoreWidget = (props) => {
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
  
    return (
         <View
            style={styles.container}
           >
              <View style={{ width: "60%", marginBottom: 10}}>
              <Text style={styles.header}>Business Loans</Text>
              <Text style={styles.copy}>Quick access to small business loans to meet your business needs</Text>
                 <TouchableOpacity
                   onPress={press}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Learn more</Text>
                    </View>
                  </TouchableOpacity>
              </View>
               <Image
                source={learnMoreImage}
                style={styles.learnMoreImage}
               />
           </View>
    )
  }
