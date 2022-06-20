import React from "react";
import { Platform, ScrollView } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../theme/colors";

export default ({ noPadding, containerStyle, children, style, ...props }) => (
  // <KeyboardAwareScrollView
  <ScrollView
    style={{
      backgroundColor: props.white ? colors.white: colors.screenBackground,
      ...style,
    }}
    contentContainerStyle={[
      noPadding ? "" : { padding: 20 },
      { ...containerStyle },
    ]}
    alwaysBounceVertical={false}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
    extraScrollHeight={Platform.OS === "ios" ? (props.noExtra ? 0 : 90) : 0}
    enableOnAndroid={true}
    {...props}
  >
    {children}
  </ScrollView>
);
