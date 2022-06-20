import { StyleSheet } from "react-native"

import { fontScale } from "../../theme/fonts"
import metrics from "../../theme/metrics"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: fontScale(24),
    fontWeight: 'bold',
    lineHeight: 38
  },
  desc: {
    width: metrics.screenWidth/1.4,
    lineHeight: 24,
    marginBottom: 20
  },
  forgotPasswordBtn: {
    alignItems: 'flex-end',
    marginBottom: 50
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default styles
