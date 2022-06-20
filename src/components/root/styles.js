import { StyleSheet } from 'react-native'

import colors from '../../theme/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 20
  },
  showLoginWrapper: {
    flex: 1, 
    justifyContent: 'flex-end',
    paddingVertical: 10
  }
})

export default styles