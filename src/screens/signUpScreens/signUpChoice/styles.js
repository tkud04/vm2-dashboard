import { StyleSheet } from "react-native"

import colors from "../../../theme/colors"
import { fontScale } from "../../../theme/fonts"
import metrics from "../../../theme/metrics"

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
    width: metrics.screenWidth/1.4,
    lineHeight: 24,
    marginBottom: 20
  },
  optionWrapper: {
    backgroundColor: colors.bgSection1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginVertical: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.darkerInputBorder,
    borderRadius: 6
  },
  logoWrapper: {
    height: '100%',
    justifyContent: 'flex-start'
  },
  logo: {
    width: metrics.screenWidth/15,
    height: metrics.screenWidth/15,
    marginRight: 10
  },
  optionTitle: {
    fontSize: fontScale(16),
    fontWeight: 'bold',
    width: metrics.screenWidth/1.5,
    lineHeight: 24
  }
})

export default styles
