import { StyleSheet } from "react-native"

import colors from '../../theme/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    width: '100%',
    height: 50,
    borderRadius: 4
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: colors.white,
    fontWeight: 'bold'
  },
  clearContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 50,
    borderColor: colors.textPrimary,
    borderWidth: 1,
    borderRadius: 4
  },
  clearText: {
    color: colors.textPrimary,
    fontWeight: 'bold'
  }
})

export default styles
