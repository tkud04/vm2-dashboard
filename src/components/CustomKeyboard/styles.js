import { StyleSheet } from "react-native";
import metrics, { WIDTH } from "../../theme/metrics"
import colors, { smallText, textRegular, title } from "../../theme/colors";

const style = StyleSheet.create({
  wrapperStyle: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonStyle: {
    backgroundColor: "#F6F6F6",
    width: WIDTH / 4.5,
    height: WIDTH / (metrics.smallDevice ? 8.5 : 7),
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5
  },
  labelStyle: {
    fontSize: title,
    color: colors.black,
  },
});

export default style;
