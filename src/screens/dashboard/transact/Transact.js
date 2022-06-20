import React from 'react'
import { View, ScrollView } from 'react-native'
import { Root, Text } from '../../../components'
import { QuickService } from '../components'
import { TransactOverview } from './components'
import styles from './styles'

export const Transact = ({ navigation }) => {
   const goToTransfers = () => {
    console.log("Navigating to transfers..");
   }

   const goToMyTransactions = () => {
    console.log("Navigating to my transactions..");
   }

   const goToBankStatement = () => {
    console.log("Navigating to bank statement..");
   }

   const goToUserManagement = () => {
    console.log("Navigating to user management..");
   }

   const goToManageAccounts = () => {
    console.log("Navigating to manage accounts..");
   }

    return (
        <Root
         noPadding
         scrollable={true}
        >
            <View style={styles.transactOverview}>
              <TransactOverview/>
            </View>
            <View style={styles.mainWrapper}>
              <Text style={[styles.text,{marginBottom: 10}]}>Quick Services</Text>
              <ScrollView
                horizontal={true}
              >
                <QuickService
                 icon="swap-horizontal"
                 text="Transfers"
                 style={{marginRight: 10}}
                 onPress={goToTransfers}
                />
                <QuickService
                 icon="ios-arrow-undo-outline"
                 text="My Transactions"
                 style={{marginRight: 10}}
                 onPress={goToMyTransactions}
                />
                <QuickService
                 icon="md-receipt-outline"
                 text="Bank Statement"
                 onPress={goToBankStatement}
                />
              </ScrollView>

              <ScrollView
                horizontal={true}
                style={{marginTop: 10}}
              >
                <QuickService
                 icon="md-person-outline"
                 text="User Management"
                 style={{marginRight: 10}}
                 onPress={goToUserManagement}
                />
                <QuickService
                 icon="md-people-outline"
                 text="Manage Accounts"
                 onPress={goToManageAccounts}
                />
              </ScrollView>
            </View>
        </Root>
      ) 
}