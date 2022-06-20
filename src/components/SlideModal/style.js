import { Platform, StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import { HEIGHT } from "../../theme/metrics";

const {
  white,
  primaryColor,
  border,
  text,
  smallText,
} = colors;

const style = StyleSheet.create({
  mask: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  modal: {
    backgroundColor: white,

    position: "absolute",
    zIndex: 1,
    overflow: "hidden",
    alignSelf: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

    flexShrink: 1,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    width: "100%",
    height: HEIGHT - (Platform.OS === "android" ? StatusBar.currentHeight : 0),
    position: "absolute",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: border,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: smallText,
    color: text,
  },
  closeText: {
    fontSize: smallText,
    color: primaryColor,
  },
});

export default style;
