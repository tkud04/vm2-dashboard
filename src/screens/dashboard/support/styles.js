import { Platform, StyleSheet } from 'react-native'
import colors from '../../../theme/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 30 : 10,
  },
  mainWrapper: {
    padding: 20,
    paddingTop: 0
  },
  text: {
   // textAlign: 'justify',
    lineHeight: 22,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  chatView: {
    width: '90%',
    borderRadius: 10,
    marginHorizontal: '5%',
    marginTop: 30,
    backgroundColor: '#eee',
     alignItems: 'center'
  },
  contactView: {
    //width: '90%',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#eee',
     alignItems: 'center'
  },
  socialView: {
    marginTop: 20,
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignContent: 'center'
  },
  socialBox: {
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10
  },
  socialBoxImage: {
    width: 30,
    height: 30
  }
})

export default styles
