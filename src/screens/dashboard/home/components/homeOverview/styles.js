import { Platform, StyleSheet } from 'react-native'
import colors from '../../../../../theme/colors'

const styles = StyleSheet.create({
  container: {
     paddingVertical: Platform.OS === 'ios' ? 30 : 10,
     backgroundColor: colors.primaryColor,
     width: "90%",
     borderRadius: 10,
     justifyContent: "space-between",
     alignItems: "flex-start",
     marginTop: 30
  },
  descriptionText: {
    color: colors.white,
    textAlign: "justify",
    fontSize: 10,
    marginLeft: 10
  },
  availableBalanceText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10
  },
  overdraftAmountText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10
  },
  paginationContainer: {},
  paginationDot: {
    backgroundColor: colors.primaryColor,
    width: 15,
    height: 6
  },
  paginationInactiveDot: {
    backgroundColor: '#C4C4C4',
    width: 6,
    height: 6
  },
  overviewRow: {
    margin: 10,
    marginBottom: 1,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between"
  },
  showFiguresIcon: {
    marginTop: 5,
    color: colors.white
  },
  addBusinessIcon: {
    marginTop: 5,
    color: colors.white
  },
  addBusinessText: {
    marginTop: 20,
    color: colors.white,
     fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5
  },
})

export default styles
