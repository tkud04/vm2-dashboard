import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import colors from '../../theme/colors'
import { Icons, Images } from '../../utils/assets/assets'

import styles_ from './styles'

export const PickerButton = ({ clear = false, showDelete = true, onPress, onClear, style, text, disabled }) => {
  const textStyle = clear ? styles.clearText : styles.text
  const disabledButtonStyle = disabled
    ? { ...styles.container, backgroundColor: 'rgba(198, 20, 94, 0.5)' }
    : styles.container
  const containerStyle = clear ? styles.clearContainer : disabledButtonStyle
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      // style={[containerStyle, { marginVertical: 10 }, style]} 
      style={[styles.pickerContainer, style]}
      onPress={onPress}
      disabled={disabled}
    >{clear ?
      <>
        <Icons.file style={{ marginRight: 20 }} />
        <Text style={styles.placeholderTitle}>{text}</Text>
        <TouchableOpacity onPress={onClear} style={{ marginLeft: 'auto', }}>
          {showDelete && <Icons.bin width={16} height={20} />}
        </TouchableOpacity>
      </> :
      <>
        <Image source={Images.image_placeholder} style={{ width: 46, height: 46, marginRight: 'auto', }} />
        <View style={[styles.wrapper, { flexDirection: 'column' }]}>
          <Text style={styles.placeholderTitle}>{"Browse file"}</Text>
          <Text style={styles.placeholderSubTitle}>{"File format: JPG, PNG, GIF, PNG"}</Text>
        </View>
      </>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ...styles_,
  pickerContainer: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.inputBorder,
    padding: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical:10,
    flexDirection: 'row',
    overflow: 'hidden',


    width: '100%',
    minHeight: 64,
  },
  placeholderTitle: {
    color: colors.placeholder,
    fontWeight: 'bold'
  },
  placeholderSubTitle: {
    color: colors.placeholder,
    // fontWeight: 'bold'
  },

})
