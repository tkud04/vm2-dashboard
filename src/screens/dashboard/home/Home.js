import React from 'react'
import { View, ScrollView } from 'react-native'
import { Button, Root, Text } from '../../../components'
import styles from './styles'
import { AccountPicker, DashboardWidget, QuickService } from '../components'
import { HomeOverview, SearchBar, LearnMoreWidget } from './components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../../../theme/colors'

export const Home = ({ navigation }) => {
  const transferToSelf = () => {
    console.log('transferring to self..')
  }

  const transferToOthers = () => {
    console.log('transferring to others..')
  }

  const bulkTransfers = () => {
    console.log('transferring bulk..')
  }

  const goToTransactions = () => {
    console.log('navigating to Transact screen..')
  }

  const learnMore = () => {
    console.log("learn more")
  }

  return (
    <Root
     noPadding
     scrollable={true}
    >
       <View style={styles.accountPickerView}>
       <AccountPicker/>
       <Ionicons name="notifications-outline" size={30} style={{marginTop: 5}} color="#000" />
       </View>
      
        <View style={styles.dashboardWidget}>
          <View style={{ width: '100%' }}>
            <HomeOverview/>
          </View>
          <View>
            <SearchBar
              placeholder="What are you looking for?"
              onSubmit={() => {console.log("Submitting..")}}
            />
          </View>
          <Text style={[styles.text,{marginBottom: 10}]}>Quick Services</Text>
          <ScrollView
            horizontal={true}
          >
            <QuickService
             icon="swap-horizontal"
             text="Transfers to self"
             style={{marginRight: 10}}
             onPress={transferToSelf}
            />
            <QuickService
             icon="md-person-outline"
             text="Transfers to others"
             style={{marginRight: 10}}
             onPress={transferToOthers}
            />
            <QuickService
             icon="md-people-outline"
             text="Bulk transfers"
             onPress={bulkTransfers}
            />
          </ScrollView>
          <View style={{marginTop: 10}}>
             <DashboardWidget
              icon="card-outline"
              iconStyle={{color: colors.primaryColor}}
              text="Transactions"
              type="transaction"
              transactionCount={6}
              onPress={goToTransactions}
             />
          </View>
          <View style={{marginTop: 10}}>
            <LearnMoreWidget
             onPress={learnMore}
            />
          </View>
        </View>
    </Root>
  )
}
