import { StyleSheet } from 'react-native'
import colors from '../../../../theme/colors'

const styles = StyleSheet.create({
  container: {
     width: 100,
     height: 100,
     borderRadius: 10,
     borderWidth: 1,
     borderColor: '#ddd',
     justifyContent: "center",
     alignItems: "center",
     shadowColor: '#dedede',
     shadowRadius: 5
  },
  icon: {
    width: "50%",
    color: colors.primaryColor,
    marginBottom: 5,
    alignSelf: 'center'
  },
  text: {
    fontSize: 16,
    color: "#888",
    textAlign: 'center'
  }
})

export default styles
