import { StyleSheet } from 'react-native'
import colors from '../../../../theme/colors'

const styles = StyleSheet.create({
  container: {
     width: "90%",
     marginLeft: '5%',
     height: 50,
     borderRadius: 10,
     borderWidth: 1,
     borderColor: '#ddd',
     justifyContent: "center",
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
  widgetContentWrapper: {
    flexDirection:'row',
    alignContent: 'space-between',
  },
  leftSide: {
    flexDirection:'row',
    alignContent: 'flex-start',
    marginTop: 5,
    width: "85%"
  },
  rightSide: {
    marginRight: 10,
  },
  
  transactionCount: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.black,
    justifyContent: 'center'
  },
  transactionCountText: {
    color: colors.white,
    textAlign: 'center',
  }
})

export default styles
