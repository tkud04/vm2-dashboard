import React, { PureComponent } from "react";
import {
  View,
  Animated,
  Easing,
  UIManager,
  Platform,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";

import CustomKeyboard from "../CustomKeyboard";
import style from "./style";
import { WIDTH, HEIGHT } from "../../theme/metrics";
import { Text } from "../../components";
import colors from "../../theme/colors";

const { lightGray, black, white } = colors
export class PINBoxes extends PureComponent {
  constructor(props) {
    super(props);

    this.initialState = {
      pinValue: "",
      mode: 1,
      completed: false
    };

    this.state = {
      ... this.initialState,
      mode: typeof props.mode == 'number' ? props.mode: this.initialState.mode
    };
    this.boxAnimation = new Animated.Value(1);

    // UIManager.setLayoutAnimationEnabledExperimental &&
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidUpdate(nextProps) {
    if (nextProps === this.props) return;

    Animated.parallel([
      Animated.timing(this.boxAnimation, {
        toValue: this.props.loading ? 0 : 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
    console.log({ "nextProps": nextProps, state: this.state, props: this.props })
    //listen to delete after user has already reached end
    if (this.state.completed) {
      return this.setState({
        completed: false,
      }, () => {
        this.onDelete(this.props);
      })
    }
    if (
      this.state.pinValue.length !== validationData[this.state.mode].length
    ) {
      if (this.props.pinValue.length < this.state.pinValue.length) {
        //delete
        this.onDelete(this.props);
      } else {
        //added
        this.onAdd(this.props);

        if (
          this.props.pinValue.length === validationData[this.state.mode].length
        ) {
          //limit reached
          setTimeout(() => {
            const { mode, pinValue } = this.state;
            const pin = mode === 0 ? pinValue : "";
            const token = mode === 1 || mode === 2 ? pinValue : "";
            this.setState({
              completed: true
            })

            this.props.enteredPIN(pin, token);
          }, 300);
          setTimeout(() => {
            if (this.props.action !== undefined) {
              this.props?.action(this.state?.pinValue);
            }
          }, 800);
        }
      }
    }

  }

  onAdd(props) {
    this.setState(
      {
        // pinValue: (props.pinValue += v),
        pinValue: (props.pinValue),
      }, () => {
        Animated.timing(
          this["animationValue" + (this.state.pinValue.length - 1)],
          // this["animationValue" + (props.pinValue.length)],
          {
            toValue: 1,
            duration: 250,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
          }
        ).start();
        console.log("Index add", (this.state.pinValue.length - 1),
          (props.pinValue.length),
          (this.state.pinValue),

        );
      });
  }

  onDelete(props) {
    this.setState(
      {
        pinValue: (props.pinValue),
      }, () => {
        Animated.timing(
          this["animationValue" + this.state.pinValue.length],
          // this["animationValue" + (props.pinValue.length)],
          {
            toValue: 0,
            useNativeDriver: false,
          }
        ).start();

        console.log("Index del", (this.state.pinValue.length),
          (props.pinValue.length),
          this["animationValue" + (props.pinValue.length)]

        );
      });
  }

  clear() {
    for (let i = 0; i < this.getPINData("length"); i++) {
      Animated.timing(this["animationValue" + i], {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
    setTimeout(() => {
      this.setState({ pinValue: "" });
    }, 200);
  }

  renderBoxes() {
    const boxes = [];

    for (let i = 0; i < validationData[this.state.mode].length; i++) {
      this["animationValue" + i] = new Animated.Value(0);
    }

    for (let i = 0; i < validationData[this.state.mode].length; i++) {
      let transform = [
        {
          scale: this["animationValue" + i].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ];

      boxes.push(
        <View
          key={i}
          style={[
            style.box,
            {
              width:
                (WIDTH - validationData[this.state.mode].length * 10) /
                validationData[this.state.mode].length,
              borderColor: '#D1D5DB',
            },
          ]}
        >
          <Animated.View
            style={{
              opacity: this["animationValue" + i],
              transform: transform,
              // backgroundColor: 'red'
            }}
          >
            {this.props.showValue?
            <Text
            style={style.boxText}>{this.state.pinValue[i]}</Text>:
          
            <View
              style={{
                backgroundColor: black,
                opacity: 0.7,
                height: 10,
                maxWidth: 10,
                minWidth: 10,
                borderRadius: 5,
              }}
            />}
          </Animated.View>
        </View>
      );
    }
    return (
      <View>
        <Text weight="medium" style={{ margin: 5 , marginTop: 0,}}>{this.props.label || 'Enter Pin'}</Text>
        <Animated.View
          style={[
            style.innerBoxContainer,
            {
              opacity: this.boxAnimation,
              transform: [{ scaleX: this.boxAnimation }],
            },
          ]}
        >
          {boxes}
        </Animated.View>
      </View>
    );
  }

  render() {
    return this.renderBoxes();
  }

}

export class PINPad extends PureComponent {
  constructor(props) {
    super(props);

    this.initialState = {
      pinValue: "",
      mode: 1,
    };

    this.state = {
      ... this.initialState,
      mode: typeof props.mode == 'number' ? props.mode: this.initialState.mode
    };
  }

  keyPressed = (v) => {
    const { onValueChange = (val) => { } } = this.props;
    if (v === "biometric") {
    } else if (v === "del") {
      if (this.state.pinValue.length > 0) {
        this.setState(
          {
            pinValue: this.state.pinValue.substring(
              0,
              this.state.pinValue.length - 1
            ),
          },
          () => {
            onValueChange(this.state.pinValue);
            // Animated.timing(
            //   this["animationValue" + this.state.pinValue.length],
            //   {
            //     toValue: 0,
            //     useNativeDriver: false,
            //   }
            // ).start();
          }
        );
      }
    } else {
      if (
        this.state.pinValue.length !== validationData[this.state.mode].length
      ) {
        this.setState(
          {
            pinValue: (this.state.pinValue += v),
          },
          () => {
            onValueChange(this.state.pinValue);
            // Animated.timing(
            //   this["animationValue" + (this.state.pinValue.length - 1)],
            //   {
            //     toValue: 1,
            //     duration: 250,
            //     easing: Easing.out(Easing.exp),
            //     useNativeDriver: true,
            //   }
            // ).start();
          }
        );
        if (
          this.state.pinValue.length === validationData[this.state.mode].length
        ) {
          setTimeout(() => {
            const { mode, pinValue } = this.state;
            const pin = mode === 0 ? pinValue : "";
            const token = mode === 1 || mode === 2 ? pinValue : "";

            this.props.enteredPIN(pin, token);
          }, 300);
          setTimeout(() => {
            if (this.props.action !== undefined) {
              this.props?.action(this.state?.pinValue);
            }
          }, 800);
        }
      }
    }
  };

  renderPinPadModal = () => {
    return (
      <CustomKeyboard onPress={this.keyPressed} />
    );
  };

  render() {
    return this.renderPinPadModal();
  }

}

export default class _PINModal extends PureComponent {
  constructor(props) {
    super(props);

    this.initialState = {
      pinValue: "",
      mode: 1,
    };

    this.state = {
      ... this.initialState,
      mode: typeof props.mode == 'number' ? props.mode: this.initialState.mode
    };

    this.boxAnimation = new Animated.Value(1);

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // const { lightGray, black, white } = colors
  componentDidUpdate(nextProps) {
    if (nextProps === this.props) return;

    Animated.parallel([
      Animated.timing(this.boxAnimation, {
        toValue: this.props.loading ? 0 : 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }

  getPINData() {
    return PINDATA[this.props.validationType].PIN;
  }

  keyPressed = (v) => {
    if (v === "biometric") {
    } else if (v === "del") {
      if (this.state.pinValue.length > 0) {
        this.setState(
          {
            pinValue: this.state.pinValue.substring(
              0,
              this.state.pinValue.length - 1
            ),
          },
          () => {
            Animated.timing(
              this["animationValue" + this.state.pinValue.length],
              {
                toValue: 0,
                useNativeDriver: false,
              }
            ).start();
          }
        );
      }
    } else {
      if (
        this.state.pinValue.length !== validationData[this.state.mode].length
      ) {
        this.setState(
          {
            pinValue: (this.state.pinValue += v),
          },
          () => {
            Animated.timing(
              this["animationValue" + (this.state.pinValue.length - 1)],
              {
                toValue: 1,
                duration: 250,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
              }
            ).start();
          }
        );
        if (
          this.state.pinValue.length === validationData[this.state.mode].length
        ) {
          setTimeout(() => {
            const { mode, pinValue } = this.state;
            const pin = mode === 0 ? pinValue : "";
            const token = mode === 1 || mode === 2 ? pinValue : "";

            this.props.enteredPIN(pin, token);
          }, 300);
          setTimeout(() => {
            if (this.props.action !== undefined) {
              this.props?.action(this.state?.pinValue);
            }
          }, 800);
        }
      }
    }
  };

  renderBoxes() {
    const boxes = [];

    for (let i = 0; i < validationData[this.state.mode].length; i++) {
      this["animationValue" + i] = new Animated.Value(0);
    }

    for (let i = 0; i < validationData[this.state.mode].length; i++) {
      let transform = [
        {
          scale: this["animationValue" + i].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ];

      boxes.push(
        <View
          key={i}
          style={[
            style.box,
            {
              width:
                (WIDTH - validationData[this.state.mode].length * 10) /
                validationData[this.state.mode].length,
              borderColor: '#D1D5DB',
            },
          ]}
        >
          <Animated.View
            style={{
              opacity: this["animationValue" + i],
              transform: transform,
            }}
          >
            <View
              style={{
                backgroundColor: black,
                opacity: 0.7,
                height: 10,
                maxWidth: 10,
                minWidth: 10,
                borderRadius: 5,
              }}
            />
          </Animated.View>
        </View>
      );
    }
    return (
      <View>
        <Text weight="medium" style={style.subline}>
          {this.props.title ?? `Enter your ${validationData[this.state.mode].name} code`}
        </Text>
        <View style={{ borderBottomWidth: 1.3, borderColor: '#F2F2F2', marginTop: 15 }} />
        <Text weight="medium" style={{ marginTop: 20, margin: 10 }}>{this.props.label || 'Enter Pin'}</Text>
        <Animated.View
          style={[
            style.innerBoxContainer,
            {
              opacity: this.boxAnimation,
              transform: [{ scaleX: this.boxAnimation }],
            },
          ]}
        >
          {boxes}
        </Animated.View>
      </View>
    );
  }

  renderChildren() {
    if (this.props.children) {
      return (
        <View
          style={{
            paddingBottom: 15,
            borderBottomWidth:
              Platform.OS === "ios" ? StyleSheet.hairlineWidth : 1,
            borderBottomColor: lightGray,
          }}
        >
          {this.props.children}
        </View>
      );
    }
  }

  renderPinPadModal = () => {
    return (
      <View style={{ padding: 20 }}>
        {this.renderChildren()}
        {this.renderBoxes()}
        <CustomKeyboard onPress={this.keyPressed} />
      </View>
    );
  };

  clear() {
    for (let i = 0; i < this.getPINData("length"); i++) {
      Animated.timing(this["animationValue" + i], {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
    setTimeout(() => {
      this.setState({ pinValue: "" });
    }, 200);
  }

  toggle() {
    this.setState({ pinValue: "" }, () => this.modal.toggle());
  }

  modalClosing() {
    this.setState(this.initialState);
  }

  modeChange = (value) => {
    this.setState({ mode: value });
  };

  render() {
    return (
      // <SlideModal
      //   height={HEIGHT < 790 ? HEIGHT * 0.72 : HEIGHT * 0.63}
      //   close={() => this.modalClosing()}
      //   ref={(e) => {
      //     this.modal = e;
      //   }}
      // >
      <View style={{ paddingBottom: 0, backgroundColor: white }}>{this.renderPinPadModal()}</View>
      // </SlideModal>
    );
  }
}

const PINDATA = {
  PIN: { length: 4, description: "PIN" },
};

_PINModal.propTypes = {
  title: PropTypes.string,
  length: PropTypes.number,
  closingWithoutPIN: PropTypes.func,
  validationType: PropTypes.string,
  enteredPIN: PropTypes.func,
};

_PINModal.defaultProps = {
  length: 4,
  closingWithoutPIN: () => { },
  enteredPIN: () => { },
};

const validationData = [
  { name: "PIN", length: 4 },
  { name: "OTP", length: 6 },
];
