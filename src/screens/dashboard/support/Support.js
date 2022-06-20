import React from 'react'
import { View, ScrollView , TouchableOpacity, Image} from 'react-native'
import { Root, Text } from '../../../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import googleLogo from '../../../assets/images/google-logo.png'
import facebookLogo from '../../../assets/images/facebook-logo.png'
import twitterLogo from '../../../assets/images/twitter-logo.png'
import linkedinLogo from '../../../assets/images/linkedin-logo.png'

import styles from './styles'

export const Support = ({ navigation }) => {

    const socialGoogle = () => {
        console.log('Following us on Google')
    }
    const socialFacebook = () => {
        console.log('Following us on Facebook')
    }
    const socialTwitter = () => {
        console.log('Following us on Twitter')
    }
    const socialLinkedin = () => {
        console.log('Following us on Linkedin')
    }
    return (
        <Root
         noPadding
         scrollable={true}
        >
            <View style={styles.chatView}>
            <Ionicons name="chatbox-outline" size={30} style={{marginTop: 5}} color="#000" />
            <Text style={[styles.text,{marginBottom: 10}]}>Chat with a support representative</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
               <View style={[styles.contactView,{width: '45%', marginLeft: '5%'}]}>
                 <Ionicons name="call-outline" size={30} style={{marginTop: 5}} color="#000" />
                 <Text style={[styles.text,{marginBottom: 10}]}>Call us</Text>
               </View>
               <View style={[styles.contactView,{width: '45%', marginLeft: '2.5%'}]}>
                 <Ionicons name="help-circle-outline" size={30} style={{marginTop: 5}} color="#000" />
                 <Text style={[styles.text,{marginBottom: 10}]}>FAQ</Text>
               </View>
            </View>
            <Text style={[styles.text,{marginLeft: '5%'}]}>You can also follow us on:</Text>
            <View style={styles.socialView}>
                <TouchableOpacity
                 onPress={socialGoogle}
                >
                  <View style={styles.socialBox}>
                    <Image source={googleLogo} style={styles.socialBoxImage}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={socialFacebook}
                >
                  <View style={styles.socialBox}>
                    <Image source={facebookLogo} style={styles.socialBoxImage}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={socialTwitter}
                >
                  <View style={styles.socialBox}>
                    <Image source={twitterLogo} style={styles.socialBoxImage}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={socialLinkedin}
                >
                  <View style={styles.socialBox}>
                    <Image source={linkedinLogo} style={styles.socialBoxImage}/>
                  </View>
                </TouchableOpacity>
                
            </View>
        </Root>
    )
}