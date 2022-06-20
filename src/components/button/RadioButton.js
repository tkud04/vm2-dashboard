import React from "react"
import { View } from "react-native"
import colors from "../../theme/colors"
import { fontScale } from "../../theme/fonts"
import { TouchItem } from "../touchItem"
import { Text } from "../text"

export const RadioButton = ({ label, checked, style, onPress, primary = true }) => {
    return (
        <TouchItem
            onPress={() => {
                if (onPress) onPress()
            }}
            style={style}
        >
            <View style={[{
                flexDirection: "row",
                alignItems: 'center',
                // padding: Fonts.h(10),
                padding: fontScale(10),
                borderWidth: 1,
                borderColor: (primary && checked) ? colors.primaryColor : '#DADADA',
                borderRadius: 10,
                // minHeight: 68
            }]}>
                <RadioIcon checked={checked} />
                <Text
                    //  numberOfLines= {2} 
                    style={[{
                        marginLeft: fontScale(10),
                        textAlign: 'justify',
                        fontSize: fontScale(14),
                        lineHeight: 24,
                        maxWidth: '70%',
                        color: colors.placeholder
                    }, checked && primary && {
                        // fontWeight: 'bold',
                        color: checked ? colors.primaryColor : colors.textPrimary
                    }]}>{label}</Text>
            </View>
        </TouchItem>
    )
}

export const RadioIcon = ({checked})=>(
    <View
    style={{
        width: fontScale(18),
        height: fontScale(18),
        borderWidth: 1,
        borderRadius: fontScale(11),
        borderColor: checked? colors.primaryColor: colors.placeholder,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
    }}
>
    <View
        style={[
            {
                width: fontScale(14),
                borderRadius: fontScale(10),
                height: fontScale(14),
                padding: 0,
            },
            checked
                ? {
                    width: fontScale(10),
                    borderRadius: fontScale(10),
                    height: fontScale(10),
                    padding: 0,
                    backgroundColor: colors.primaryColor,
                }
                : {},
        ]}
    />
    </View>
)
export default RadioButton
