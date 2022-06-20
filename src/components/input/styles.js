import { Platform, StyleSheet } from "react-native"

import colors from "../../theme/colors"
import { size } from '../../theme/fonts'

const styles = StyleSheet.create({
  wrapperStyle: {
    marginTop: 4,
    paddingBottom: 0,
  },
  labelError: {
    color: colors.primaryColor,
    fontSize: size.font12,
    backgroundColor: "transparent",
    paddingRight: 0,
    position: "absolute",
    bottom: 0,
    right: 4,
  },
  containerRightN: {
    backgroundColor: "#ECECEC",
    borderRadius: 3,
    margin: 6,
    paddingHorizontal: 7,
    paddingVertical: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  textDescrpt: {
    flex: 1,
    color: colors.darkGray,
    fontSize: size.font12,
    marginTop: 5,
    textAlign: "right",
  },
  textRightN: {
    color: "#575757",
    fontSize: size.font14,
  },
  rightIcon: {
    paddingRight: 2,
    zIndex: 20,
  },
  textInputStyle: {
    backgroundColor: "transparent",
    color: colors.textPrimary,
    fontSize: size.font14,
    // lineHeight: 24,
    flex: 1,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    // fontFamily: Platform.OS === "ios" ? "Gotham Book" : "Gotham-Book",
  },
  validatePositioning: {
    position: "absolute",
    right: 0,
    bottom: 3,
  },
  rightIconPosition: {
    height: 30,
    width: 40,
    backgroundColor: "transparent",
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 4,
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  normalBorder: {
    borderColor: colors.inputBorder,
  },
  lightBorder: {
    borderColor: "rgba(255,255,255,0.5)",
    zIndex: 1,
  },
  lightValidatedBorder: {
    borderColor: colors.inputBorder,
    zIndex: 2,
  },
  focusBorder: {
    zIndex: 3,
  },
  errorBorder: {
    borderColor: colors.primaryColor,
    zIndex: 4,
  },
  validatedBorder: {
    borderColor: colors.textPrimary,
    zIndex: 2,
  },
  disabled: {
    opacity: 0.25,
  },
  inputInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 20,
    padding: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 0,
    height: 55,
  },
  currencyLabel: {
    alignSelf: "center",
    color: colors.inputBorder,
    fontSize: size.font16,
    marginLeft: 10,
    marginTop: -12,
  },
  input: {
    paddingBottom: 0,
    margin: 0,
    marginTop: 20,
    fontSize: size.font16,
    color: colors.black
  },
  label: {
    fontSize: size.font14,
    color: colors.black,
    lineHeight: 24
  },
  normalBar: {
    height: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  focusBar: {
    height: 3,
    width: "100%",
    position: "absolute",
    backgroundColor: colors.primaryColor,
    bottom: -1,
    opacity: 1,
    zIndex: 2,
  },
  errorBar: {
    height: 3,
    width: "100%",
    position: "absolute",
    backgroundColor: colors.primaryColor,
    bottom: -1,
    zIndex: 3,
  },
  errorLabel: {
    position: "absolute",
    bottom: 0,
  },
  errorLabelText: {
    fontSize: size.font12,
    color: colors.primaryColor,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightContent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: '64%',
    marginTop: -5,
    zIndex: 10
  },
  icon: {
    paddingTop: 3,
    // alignSelf: 'center'
  },
})

export default styles
