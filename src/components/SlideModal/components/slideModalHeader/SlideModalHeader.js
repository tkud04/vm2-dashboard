//@ts-check
import React from 'react'
import { StatusBar, View, SafeAreaView } from 'react-native'
import { Text } from '../../../text'
import { TouchItem } from '../../../touchItem'
import styles from "../../style"

export const SlideModalHeader = ({ onClose, toggle, header }) => {
  return (
    <SafeAreaView forceInset={{ top: "always", bottom: "never" }}>
      <View
        style={[styles.header, { marginTop: StatusBar.currentHeight + 10 }]}
      >
        <TouchItem
          style={{ justifyContent: "center", marginRight: 20 }}
          onPress={() => {
            if (onClose) onClose()
            toggle()
          }}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchItem>
        <Text style={styles.headerText}>{header}</Text>
        <View style={{ width: 62 }} />
      </View>
    </SafeAreaView>
  )
}
