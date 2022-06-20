import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  smallDevice: HEIGHT < 600 ? true : false
}

export const WIDTH = width;
export const HEIGHT = height;

export default metrics
