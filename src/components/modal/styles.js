//@ts-check
import { StyleSheet } from 'react-native'
import colors from '../../theme/colors'
import { fontScale } from '../../theme/fonts'
import metrics from '../../theme/metrics'


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: fontScale(24),
        fontWeight: 'bold',
        lineHeight: 38
    },
    desc: {
        // width: metrics.screenWidth / 1.4,
        lineHeight: 24,
        // marginBottom: 20
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderBottomColor: "#F3F5F6",


    },
    modalTitle: {
        fontSize: fontScale(16),
        fontWeight: 'bold',
        lineHeight: 28,
        marginBottom: 5
    },
    modalContent: {
        fontSize: fontScale(16),
        fontWeight: '400',
        lineHeight: 28,
        marginBottom: 5
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    directorContainer: {
        borderBottomWidth: 3.5,
        borderBottomColor: "#F5F5F5",
        paddingTop: 19,
        paddingBottom: 20
        // backgroundColor: 'red',
        // marginHorizontal: -20,
        // paddingHorizontal:20
    },
    optionWrapper: {
        backgroundColor: colors.bgSection1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // height: 100,
        // marginVertical: 10,
        marginBottom: 10,
        padding: 18,
        borderWidth: 2,
        borderColor: colors.darkerInputBorder,
        borderRadius: 6
    },
    optionTitle: {
        fontSize: fontScale(16),
        fontWeight: 'bold',
        // width: metrics.screenWidth / 1.5,
        lineHeight: 24
    },
    logoWrapper: {
        height: '100%',
        justifyContent: 'flex-start'
    },
    logo: {
        width: metrics.screenWidth / 15,
        height: metrics.screenWidth / 15,
        marginRight: 10
    },
})

export default styles
