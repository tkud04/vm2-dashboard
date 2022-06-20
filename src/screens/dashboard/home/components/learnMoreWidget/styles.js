import { StyleSheet } from 'react-native'
import colors from '../../../../../theme/colors'

const styles = StyleSheet.create({
  container: {
     width: "100%",
     flexDirection: "row",
     borderRadius: 10,
     //borderWidth: 1,
     backgroundColor: '#180E04',
     justifyContent: 'space-evenly',
    // alignItems: "center",
  },
  icon: {
    width: "50%",
    marginTop: 5 
  },
  text: {
    fontSize: 18,
    color: "#000",
    marginLeft: 10
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: "100%",
    height: "100%"
  },
  learnMoreImage: {
    width: '50%',
    height: 150,
    //marginLeft: "20%",
    //elevation: 3,
    borderRadius: 10
  },
  header: {
    color: colors.white,
    fontSize: 14,
    marginTop: 10,
    marginLeft: 30,
    fontWeight: 'bold'
  },
  copy: {
    color: colors.white,
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 10
  },
  button: {
    marginTop: 10,
    width: 100,
    height: 30,
    borderRadius: 25,
    marginLeft: 30,
    backgroundColor: colors.white,
    alignContent: 'center'
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 5
  }
  
})

export default styles
