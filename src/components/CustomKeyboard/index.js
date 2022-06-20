// @ts-check
import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Input, Root, Text, TouchItem } from '../../components'
import { textRegular } from "../../theme/colors";
import style from "./styles";

const keyArr = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "",
  "0",
  "del",
];

export default class CustomKeyboard extends React.Component {
  renderKey = () => {
    const { onPress } = this.props;
    return keyArr.map((val, key) => {
      if (val === "") {
        return (
          <View
            key={key}
            style={[style.buttonStyle, { borderBottomWidth: 0, backgroundColor: 'transparent' }]}
          />
        );
      }
      return (
        <TouchItem
          key={key}
          onPress={() => onPress(val, key)}
          style={style.buttonStyle}
        >
          {val === "del" ? (
            <Icon name="backspace" color={textRegular} size={22} />
          ) : val === "biometric" ? (
            // <Face />
            <View />
          ) : (
            <Text style={[style.labelStyle, {}]}>{val}</Text>
          )}
        </TouchItem>
      );
    });
  };

  render() {
    return <View style={style.wrapperStyle}>{this.renderKey()}</View>;
  }
}

CustomKeyboard.propTypes = {
  onPress: PropTypes.func,
};
