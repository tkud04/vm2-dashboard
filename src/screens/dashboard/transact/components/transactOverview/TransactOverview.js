import React, { useState, useEffect } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import { Text } from '../../../../../components'
import { toCurrency } from '../../../../../utils/helpers'

import styles from './styles'

export const TransactOverview = () => {

    return (
        <>
          <View style={styles.container}>
            <View style={styles.greetingTextWrapper}>
               <Text style={styles.greetingText}>
                 Hey Tobi,
               </Text>
               <Text style={styles.text}>
                 Here is a review of your transaction activities so far.
               </Text>
            </View>
            <View style={styles.labelsWrapper}>
                <View style={styles.dateLabelWrapper}>
                  <Text style={styles.dateLabel}>February 2022</Text>
                </View>
                <View style={styles.analysisLabelWrapper}>
                  <Text style={styles.analysisLabel}>Analytics</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
            <View style={styles.transactionsView}>
               <Text style={styles.transactionsCount}>45</Text>
               <Text style={styles.text}>Transactions worth:</Text>
               <Text style={styles.transactionsValue}>&#8358;{toCurrency(657000)}</Text>
            </View>
            <View style={styles.debitCreditView}>
               <Text style={styles.creditValue}>&#8358;{toCurrency(657000)}</Text>
               <Text style={styles.text}>in Credits</Text>

               <Text style={styles.debitValue}>&#8358;{toCurrency(217000)}</Text>
               <Text style={styles.text}>in Debits</Text>
            </View>
            </View>
          </View>
        </>
    )
}