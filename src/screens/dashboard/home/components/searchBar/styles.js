import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
     backgroundColor: "#dedede",
     width: "100%",
     height: 40,
     borderRadius: 10,
     justifyContent: "center",
     //alignItems: "flex-start",
     flexDirection: "row"
  },
  searchIconView: {
    marginRight: 10
  },
  searchIcon: {
    width: "100%",
    marginTop: 5,
    color: "#888"
  },
  input: {
    width: "80%"
  }
})

export default styles
