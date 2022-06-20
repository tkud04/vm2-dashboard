import { Platform, StyleSheet } from 'react-native'
import colors from '../../../../../theme/colors'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: Platform.OS === 'ios' ? 30 : 10,
      backgroundColor: '#2244ff',
      borderRadius: 10,
    },
    greetingText: {
       color: colors.white,
       marginLeft: 10,
       fontWeight: 'bold',
       fontSize: 16
    },
    greetingTextWrapper: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.white
    },
    text: {
        color: colors.white,
        marginLeft: 10,
        marginVertical: 5
    },
    labelsWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        flexDirection: 'row',
        paddingBottom: 10
    },
    dateLabelWrapper: {
        backgroundColor: colors.white,
        width: "30%",
        marginVertical: 10,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        padding: 5
    },
    dateLabel: {
        fontWeight: '800'
    },
    analysisLabelWrapper: {
        backgroundColor: colors.primaryColor,
        width: "30%",
        marginVertical: 10,
        marginRight: 5,
        marginLeft: '35%',
        borderRadius: 5,
        alignItems: 'center',
        padding: 5
    },
    analysisLabel: {
      color: '#fff',
      fontWeight: '800'
    },
    transactionsView: {
        width: '50%',
       borderRightWidth: 1,
       borderRightColor: colors.white
    },
    debitCreditView: {

    },
    transactionsCount: {
        color: colors.white,
        fontSize: 25,
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 10
    },
    transactionsValue: {
        color: colors.white,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20

    },
    creditValue:{
        color: '#00ff00',
        fontSize: 18,
        marginTop: 15,
        marginLeft: 10,
        fontWeight: 'bold'

    },
    debitValue:{
        color: '#ff0000',
        fontSize: 18,
        marginTop: 15,
        marginLeft: 10,
        fontWeight: 'bold'

    }

})
export default styles