import { Platform, StyleSheet } from "react-native"
import colors from "../../../../theme/colors"

import metrics from "../../../../theme/metrics"

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 38,
    textAlign: "center",
    marginTop: 20
  },
  desc: {
    width: metrics.screenWidth/1.4,
    lineHeight: 24,
    textAlign: "center",
  },
  image: {
    width: Platform.OS === 'ios' ? metrics.screenWidth/1.345 : metrics.screenWidth/1.5,
    height: Platform.OS === 'ios' ? metrics.screenWidth/1.345 : metrics.screenWidth/1.5,
    marginBottom: Platform.OS  === 'ios' ? 30 : 10
  },
  logo: {
    position: "absolute",
    width: 41,
    height: 21.5,
    marginLeft: 40,
    marginTop: 30
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
  }
})

export default styles
