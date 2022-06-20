import React from "react"
import { View } from "react-native"
import { Text } from "../../../../components"
import styles from "./styles"

export const ScreenTitle = props => {
    console.log(props)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    )
}