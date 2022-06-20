import { Platform, StyleSheet } from 'react-native'
import colors from '../../../theme/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 30 : 10,
  },
  mainWrapper: {
    padding: 20,
    paddingTop: 0
  },
  text: {
    textAlign: 'justify',
    lineHeight: 22,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  transactOverview: {
    marginTop: 2,
    width: "90%",
    marginHorizontal: "5%"
 },
})

export default styles
