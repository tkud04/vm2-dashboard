import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
     paddingVertical: Platform.OS === 'ios' ? 30 : 10,
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0
  },
  accountInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 5
  },
  accountInitialsText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  buttonStyle: {
    width: "80%",
    backgroundColor: "#fff",
    alignContent: "flex-start",
  },
  buttonTextStyle: {
   // textAlign: "left",
    color: "#000"
  },
  greetingText: {
    color: "#000",
    fontSize: 14
  },
  dropdownChildStyle: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  dropdownChildText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  dropdownText: {
    fontSize: 20,
    marginLeft: 5,
    color: "#000"
  }
})

export default styles
