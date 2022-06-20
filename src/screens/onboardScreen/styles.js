import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 30 : 10,
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0
  },
  termsText: {
    textAlign: 'center',
    lineHeight: 22
  }
})

export default styles
