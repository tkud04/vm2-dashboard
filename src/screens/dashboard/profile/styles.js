import { Platform, StyleSheet } from 'react-native'
import colors from '../../../theme/colors'

const styles = StyleSheet.create({
    accountPickerView: {
        width: '100%'
    },
    topRow: {
        
        paddingBottom: 30,
        borderBottomWidth: 7,
        borderBottomColor: '#EBEBEB'
    },
    addBusinessView: {
        backgroundColor: '#E5E5E5',
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
        marginRight: 10, 
        alignSelf: 'flex-end'
    },
    addBusinessText: {
        color: colors.primaryColor,
        fontWeight: 'bold'
    },
    actionsRow: {
        marginTop: 10,
    },
    logoutView: {
        marginLeft: 10
    },
    logoutButton: {
        padding: 10, 
        flexDirection: 'row'
    },
    logoutIcon: {
        marginRight: 5,
        color: '#ff0000'
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default styles