import { StyleSheet } from 'react-native'

import { fontScale } from "../../../theme/fonts"
import metrics, { WIDTH } from "../../../theme/metrics"
import colors, { smallText, textRegular } from "../../../theme/colors";

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

  btn: {
    height: metrics.smallDevice ? 45 : 55,
    backgroundColor: colors. primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: metrics.smallDevice ? 10 : 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  btnText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: metrics.smallDevice ? smallText : textRegular,
  },
  fullWidth: {
    borderRadius: 0,
    width: WIDTH,
    shadowOpacity: 0,
  },
  leftIcon: {
    marginRight: 14,
  },
})

export default styles
