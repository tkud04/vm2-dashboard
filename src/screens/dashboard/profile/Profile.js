import React, {useState} from 'react'
import { View, ScrollView, Switch, TouchableOpacity, Image} from 'react-native'
import { Root, Text } from '../../../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AccountPicker, DashboardWidget } from '../components'
import colors from '../../../theme/colors'

import styles from './styles'

export const Profile = ({ navigation }) => {
    const [biometricLogin, setBiometricLogin] = useState(false)
   
    const addBusiness = () => {
        console.log('Adding a business')
    }

    const goToPasswordChange = () => {
        console.log('Go to change password..')
    }

    const goToPinChange = () => {
        console.log('Go to pin change..')
    }

    const goToTransactionNotification = () => {
        console.log('Go to transaction notification..')
    }

    const gotoPolicies = () => {
        console.log('Go to rules and policies..')
    }

    const gotoHelp = () => {
        console.log('Go to help and support')
    }

    const updateBiometricLogin = () => {
        console.log('Updating biometric login..')
        setBiometricLogin(!biometricLogin)
    } 

    const logout = () => {
        console.log('loggin out..')
    }

    return (
    <Root
        noPadding
        scrollable={true}
    >
        <View style={styles.topRow}>
         <View style={styles.accountPickerView}>
          <AccountPicker
           fullWidth={true}
          />
        </View>
        <View style={styles.addBusinessView}>
                <TouchableOpacity
                 onPress={addBusiness}
                 >
                  <Text style={styles.addBusinessText}>
                  Add business <Ionicons name="add" size={15} style={styles.addBusinessIcon}  /> 
                  </Text>
                 </TouchableOpacity>
        </View>
        </View>
        <ScrollView style={styles.actionsRow}>
           <DashboardWidget
              icon="md-lock-closed-outline"
              iconStyle={{color: colors.black}}
              text="Password change"
              type="navigation"
              transactionCount={6}
              onPress={goToPasswordChange}
            />
            <DashboardWidget
              icon="ios-phone-portrait-outline"
              style={{marginTop: 20}}
              iconStyle={{color: colors.black}}
              text="PIN change"
              type="navigation"
              transactionCount={6}
              onPress={goToPinChange}
            />
            <DashboardWidget
              icon="md-notifications"
              style={{marginTop: 20}}
              iconStyle={{color: colors.black}}
              text="Transaction Notification"
              type="navigation"
              transactionCount={6}
              onPress={goToTransactionNotification}
            />
            <DashboardWidget
              icon="md-finger-print"
              style={{marginTop: 20}}
              iconStyle={{color: colors.black}}
              text="Biometric Login"
              type="switch"
              value={biometricLogin}
              setValue={updateBiometricLogin}
              transactionCount={6}
              onPress={updateBiometricLogin}
            />
            <DashboardWidget
              icon="md-lock-closed-outline"
              style={{marginTop: 20}}
              iconStyle={{color: colors.black}}
              text="Application rules and policies"
              transactionCount={6}
              onPress={gotoPolicies}
            />
            <DashboardWidget
              icon="md-lock-closed-outline"
              style={{marginTop: 20}}
              iconStyle={{color: colors.black}}
              text="Help and Support"
              transactionCount={6}
              onPress={gotoHelp}
            />
            <View style={styles.logoutView}>
               <TouchableOpacity
                onPress={logout}
               >
                   <View style={styles.logoutButton}>
                   <Ionicons name="md-arrow-back-circle-outline" size={20} style={styles.logoutIcon}  /> 
                    <Text style={styles.logoutText}>Logout</Text>
                   </View>
               </TouchableOpacity>
            </View>
        </ScrollView>
    </Root>
    )
}