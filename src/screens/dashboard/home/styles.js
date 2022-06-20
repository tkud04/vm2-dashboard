import { Platform, StyleSheet } from 'react-native'
import colors from '../../../theme/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 30 : 10,
  },
  accountPickerView: {
    marginTop: 2,
    flexDirection: "row",
    width: "80%"
 },
  dashboardWidget: {
    //flex: 1,
    //justifyContent: 'space-between',
    //alignItems: 'center',
    padding: 20,
    paddingTop: 0
  },
  text: {
    textAlign: 'justify',
    lineHeight: 22,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default styles
