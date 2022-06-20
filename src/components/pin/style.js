import { StyleSheet } from "react-native";

import { textRegular } from "../../theme/colors";
import { fontScale } from "../../theme/fonts";

const style = StyleSheet.create({
  box: {
    maxWidth: 45,
    height: 50,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  innerBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 10
  },
  subline: {
    color: textRegular,
    marginTop: 10,
    textAlign: "center",
    fontSize: textRegular,
  },
  boxText: {
    fontSize: fontScale(16),
    fontWeight: 'bold',
    lineHeight: 24
  },
});
export default style;
