import { StyleSheet } from 'react-native'

import { fontScale } from "../../../theme/fonts"
import metrics from "../../../theme/metrics"

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  screenPadding: {
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
  directorTitle: {
    fontSize: fontScale(14),
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom:5
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
  }
})

export default styles
