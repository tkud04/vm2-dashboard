import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { View, TextInput, Platform, Animated, Easing } from 'react-native'
import PropTypes from 'prop-types'
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Text, TouchItem } from '../'
import styles from './styles'
import colors from '../../theme/colors'
import { RightContent } from './components'
import { formatMoney } from '../../utils/moneyFormat'
import { asyncCallback } from '../../utils/helpers'
import { Icons } from '../../utils/assets/assets'

export const Input = ({
  format,
  label,
  max,
  maxLength,
  min,
  multiline,
  secureTextEntry,
  textStyle,
  value,
  placeholder,
  type = "input", //select
  ...props
}) => {
  const [hasError, setHasError] = useState(false)
  const [userError, setUserError] = useState('')
  const [isFirstFill, setIsFirstFill] = useState(true)
  const [resetKey, setResetKey] = useState(null)
  const [isFilled, setIsFilled] = useState(false)
  const [isBlurred, setIsBlurred] = useState(true)
  const [isFocused, setIsFocused] = useState(true)
  const [secureTextVisible, setSecureTextVisible] = useState(false)
  const [text, setText] = useState('')
  const [rawValue, setRawValue] = useState('')
  const [prevSelection, setPrevSelection] = useState({ start: 0, end: 0 })
  const [selection, setSelection] = useState({ start: 0, end: 0 })

  const textInput = useRef()
  const focusBorder = new Animated.Value(0)
  const errorBorder = new Animated.Value(0)
  const errorAnim = new Animated.Value(0)

  const triggerAnimation = () => {
    Animated.timing(focusBorder, {
      duration: 300,
      toValue: isFocused ? 1 : 0,
      easing: Easing.inOut(Easing.circle),
      useNativeDriver: true,
    }).start()

    Animated.timing(errorBorder, {
      duration: 200,
      toValue: hasError ? 1 : 0,
      useNativeDriver: true,
    }).start()
  }

  const triggerError = (hasErr) => {
    asyncCallback(handleErrors(hasErr)).then(() => triggerAnimation())

    Animated.timing(errorAnim, {
      toValue: hasErr ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.linear),
      useNativeDriver: true,
    }).start()
  }

  const inputChange = (type) => {
    var state = type

    if (type === 'focus') {
      asyncCallback(() => {
        setIsFocused(true)
        setIsBlurred(false)
      }).then(() => triggerAnimation())

      if (props?.onFocus) {
        props?.onFocus()
        asyncCallback(() => {
          setIsFocused(true)
          setIsBlurred(false)
        }).then(() => triggerAnimation())
      }

      state = 'focus'
    } else if (type === 'blur') {
      if (props?.onBlur) props?.onBlur()
      if (value && value.length) {
        state = 'filled'
        setIsFilled(true)
        setIsFocused(false)
        setText(value)
      } else {
        state = 'nofocus'
        asyncCallback(() => {
          setIsFilled(false)
          setIsFocused(false)
        }).then(() => triggerAnimation())
      }
    }
    else if (type === 'filled' && isFilled === false) {
      state = 'filled'
      asyncCallback(() => {
        setIsFilled(false)
      }).then(() => triggerAnimation())
    }
  }

  const onBlur = () => {
    if (format === "amount") {
      amountBlur()
    }

    inputChange("blur")
  }

  const clearValidationErrorState = () => {
    asyncCallback(handleErrors(false, "")).then(() => triggerAnimation())
  }

  const focusInput = () => {
    textInput.current?.focus()
  }

  const onFocus = () => {
    inputChange("focus")
  }

  const reset = () => {
    if (textInput) {
      textInput.current?.clear()
    }

    setHasError(false)
    setIsFirstFill(true)
    setResetKey(null)
    setSecureTextVisible(false)
    setIsFilled(false)
    setIsBlurred(true)
    setIsFocused(true)
    setText('')
    setRawValue('')
    setPrevSelection({ start: 0, end: 0 })
    setSelection({ start: 0, end: 0 })
  }

  const generateRawValue = (t) => {
    let start, end, value, selection

    if (
      prevSelection.start === prevSelection.end &&
      t.length < rawValue.length
    ) {
      start = rawValue.substring(0, prevSelection.start - 1)
      end = rawValue.substring(
        prevSelection.end,
        rawValue.length
      )
      value = start + end
    } else {
      start = rawValue.substring(0, prevSelection.start)
      end = rawValue.substring(
        prevSelection.end,
        rawValue.length
      )
      selection = t.substring(
        prevSelection.start,
        t.length - (rawValue.length - prevSelection.end)
      )
      value = start + selection + end
    }
    return value
  }

  const formatNumber = (n) => {
    if (n === null || n === undefined) {
      return ''
    }

    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const clearNonNumbers = (n) => {
    if (n === null || n === undefined) {
      return ''
    }

    return n.replace(/\D/g, '')
  }

  const amountFormatter = (input_val) => {
    if (input_val === undefined) {
      return
    }

    const decimal_pos = input_val.indexOf('.')
    if (decimal_pos >= 0 && !props?.noDecimals) {
      let left_side = input_val.substring(0, decimal_pos)
      let right_side = input_val.substring(decimal_pos)
      left_side = formatNumber(left_side)
      right_side = formatNumber(right_side)
      right_side = right_side.substring(0, 2)
      input_val = left_side + '.' + right_side
    } else {
      input_val = props?.noDecimals
        ? formatNumber(input_val.replace(/\./g, ''))
        : formatNumber(input_val)
    }
    return input_val
  }

  const amountBlur = () => {
    let input_val = value
    if (input_val === '' || input_val === undefined) {
      return
    }
    const decimal_pos = input_val.indexOf('.')
    const left_side = input_val.substring(0, decimal_pos)
    let right_side = input_val.substring(decimal_pos)
    if (props?.noDecimals) return
    if (decimal_pos >= 0) {
      right_side += '00'
      right_side = right_side.substring(0, 3)
      input_val = left_side + '.' + right_side
    } else {
      input_val += '.00'
    }
    onChangeText(input_val)
  }

  const creditCardFormatter = (text) => {
    if (text === null || text === undefined) {
      return ''
    }

    if (text.length < 12) {
      text = textReplace(/[^\D]/g, '*')
    } else {
      text =
        text.substr(0, 12).replace(/[^\D]/g, '*') +
        text.substr(12, text.length)
    }
    return text
  }

  const handleErrors = (hasErr, userErr) => {
    setHasError(hasErr)
    if (userErr !== undefined) setUserError(userErr)
  }

  const buildError = (error) => {
    if (userError !== "" && !userError?.includes(error)) {
      return userError + " & " + error
    }

    return error
  }

  const validationSwitch = (validationType) => {
    let textLength = text.length
    const textReplace = (searchValue, replaceValue) => text.replace(searchValue, replaceValue)
    const valueText = text
    switch (validationType) {
      case 'min4':
        if (textLength < 4) {
          handleErrors(true, buildError('4 characters required'))
          return true
        }
        break
      case 'min':
        if (parseFloat(textReplace(/,/g, '')) < min) {
          handleErrors(true, buildError('Minimum Amount required'))
          return true
        }
        break
      case 'max':
        if (parseFloat(textReplace(/,/g, '')) > max) {
          handleErrors(true, buildError('Maximum Amount required'))
          return true
        }
        break
      case 'maxLoan':
        if (parseFloat(textReplace(/,/g, '')) > max) {
          handleErrors(true, buildError('Maximum loan amount exceeded'))
          return true
        }
        break
      case 'len4':
        if (textLength !== 4) {
          handleErrors(true, buildError('4 digits required'))
          return true
        }
        break
      case 'len6':
        if (textLength !== 6) {
          handleErrors(true, buildError('6 digits required'))
          return true
        }
        break
      case 'len10':
        if (textLength !== 10) {
          handleErrors(true, buildError('10 digits required'))
          return true
        }
        break
      case 'cvv':
        if (textLength !== 3) {
          se
          handleErrors(true, buildError('3 digits required'))
          return true
        }
        break
      case 'expiry':
        const text = valueText
        if (text) {
          const textArray = text.split('/')
          if (textArray.length) {
            const today = moment()
            const enteredDate = moment.utc(
              `01-${textArray[0]}-${textArray[1]}}`,
              'DD-MM-YY'
            )

            const isInvalid = moment(today).isAfter(enteredDate)

            if (isInvalid) {
              handleErrors(true, buildError('Expiry date invalid'))
              return true
            }
          }
        }
        break
      case 'amountRange':
        const { range } = props
        const amount = textReplace(/,/g, '')
        if (
          parseFloat(amount) < parseFloat(range.min) ||
          parseFloat(amount) > parseFloat(range.max)
        ) {
          handleErrors(true, buildError('Amount not in range (Min/Max)'))
          return true
        }
        break
      case 'number':
        var number = /^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/
        if (!number.test(valueText) && valueText !== '') {
          handleErrors(true, buildError('Not a number'))
          return true
        }
        break
      case 'bvn':
        var number = /^[0-9]*$/
        if (!number.test(valueText) && valueText !== '') {
          handleErrors(true, buildError('Not a valid BVN'))
          return true
        }
        break
      case 'creditcard':
        var number = /^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/
        if (
          !number.test(rawValue) ||
          rawValue.length < 15
        ) {
          handleErrors(true, buildError('Not a valid PAN'))
          return true
        }
        break
      case 'money':
        var money = /^(.?\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/
        if (!money.test(valueText) && valueText !== '') {
          handleErrors(true, buildError('Not a money amount'))
          return true
        }
        break
      case 'mail':
        var mail = /^(([^<>()\[\]\\.,:\s@']+(\.[^<>()\[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!mail.test(valueText)) {
          handleErrors(true, buildError('Valid mail required'))
          return true
        }
        break
      case 'specialchar':
        const reg = /([A-Za-z0-9-]+)/
        if (!reg.test(valueText)) {
          handleErrors(true, buildError('Not special characters allowed'))
          return true
        }
        break
      case "phone":
        var numberPhone = /^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/
        if (
          (!numberPhone.test(valueText) && valueText !== "") ||
          (textLength < 11 && textLength > 15)
        ) {
          handleErrors(true, buildError("Please enter valid phone number"))
          return true
        }
        break
      case "opt":
        setHasError(false)
        return false
      case "nickname":
        const textRegex = /^[a-zA-Z]+( [a-zA-Z]+)*([.a-zA-Z0-9-_]+)?$/
        if (!valueText) {
          handleErrors(true, buildError("Cannot be empty"))
          return true
        }
        if (textLength < 2) {
          handleErrors(true, buildError("Cannot be less than 2 characters"))
          return true
        }
        if (!textRegex.test(valueText)) {
          handleErrors(true, buildError("Invalid characters used"))
          return true
        }

        return false
      case "req":
        if (!valueText) {
          handleErrors(true, buildError("Cannot be empty"))
          return true
        }
        if (
          textLength < 10 &&
          label === "Enter Destination Account" &&
          isFocused === false
        ) {
          handleErrors(true, buildError("Cannot be less than 10"))
          return true
        }
        if (textLength === 0) {
          handleErrors(true, buildError("Cannot be empty"))
          return true
        }

        if (format === "amount") {
          const amt = parseFloat(valueText || "")
          if (!(amt > 0)) {
            handleErrors(true, buildError("Amount not allowed"))
            return true
          }
        }

        return false
      case "balance":
        const balance = parseFloat(props?.checkBalance) || 0
        const val = parseFloat(valueText) || 0

        if (val > balance) {
          handleErrors(true, buildError("Total amount is bigger then available balance"))
          return true
        }
        return false
      case "custom":
        var response = props?.customInputValidation(valueText)
        if (response.state) {
          handleErrors(true, buildError(response.message))
          return true
        }
        return false
      default:
        if (textLength === 0) {
          handleErrors(true, buildError("Cannot be empty"))
          return true
        }

        handleErrors(false, buildError(""))
        return false
    }
  }

  const validate = (silent) => {
    var errorCounter = 0
    if (props?.validationMode !== undefined) {
      let validationModeArr = props?.validationMode.split('|')
      validationModeArr.map((validationType) => {
        if (validationSwitch(validationType)) {
          errorCounter++
        }
      })
    } else if (validationSwitch('')) {
      errorCounter++
    }

    if (!silent) {
      if (errorCounter > 0) {
        triggerError(true)
      } else {
        triggerError(false)
      }
    } else {
      return errorCounter
    }
  }

  const check = () => {
    if (props?.noCheck) {
      return
    }

    asyncCallback(handleErrors(false, "")).then(() => {
      if (props?.validateFn) {
        props?.onChangeText(value, rawValue)
        setTimeout(() => {
          let userError = props?.validateFn()
          if (userError === "success") {
            validate()
          } else {
            asyncCallback(handleErrors(true, userError)).then(() => {
              triggerError(true)
              props?.onChangeText("")
            })
          }
        }, 200)
      } else {
        validate()
      }
    })
  }

  const checkValidation = () => {
    let errorCount = validate(true)
    check()

    return errorCount
  }

  const onChangeText = (t) => {
    setText(t)
    asyncCallback(setRawValue(generateRawValue(t))).then(() => {
      if (props.onChangeText) {
        let text = t
        if (format === 'amount') {
          text = amountFormatter(t)
        } else if (format === 'creditcard') {
          text = creditCardFormatter(rawValue)
        } else if (format === 'number') {
          text = clearNonNumbers(t)
        }

        props?.onChangeText(text, rawValue)
      }
    })
  }

  const renderLeftIcon = () => {
    if (props.leftIcon) {
      return <View style={styles.leftIcon}>{props.leftIcon}</View>
    }
  }

  const renderLeftContent = () => {
    if (props.leftContent) {
      return props.leftContent
    }
  }

  const renderDescription = () => {
    if (props.description)
      return <Text style={styles.textDescrpt}>{props.description}</Text>
    else return <View />
  }

  const onClickRightIcon = () => {
    if (props.onClickRightIcon) {
      props.onClickRightIcon()
    } else {
      setSecureTextVisible(!secureTextVisible)
    }
  }

  useEffect(() => {
    if (value && value.length) {
      asyncCallback(() => {
        setIsFilled(true)
        setText(value)
      }).then(() => triggerAnimation())
    }
    if (props.userError) {
      setUserError(props.userError)
    }
  }, [])

  useEffect(() => {
    if (format !== 'amount') {
      if (
        isFirstFill &&
        textInput.current?.isFocused() &&
        value
      ) {
        setIsFirstFill(false)
        setText(value)
      }
    }

    if (value) {
      inputChange('filled')
    } else {
      inputChange()
    }
  }, [format, isFirstFill, value])

  useEffect(() => {
    if (text.length) {
      check()
    }
  }, [text])

  return (
    <View>
      {!!label && (<Text style={styles.label}>{label}</Text>)}
      <View
        style={[
          styles.wrapperStyle,
          {
            marginTop: Platform.OS === "ios" ? 10 : 15,
            marginBottom: props?.noMargin
              ? 0
              : props?.smallMargin
                ? 5
                : 5,
            opacity: props?.editable === false ? 0.7 : 1,
            paddingHorizontal: props?.padding ? 20 : 0,
          },
          props?.wrapperStyle,
        ]}
        key={resetKey}
      >
        <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.borderContainer, styles.normalBorder, { zIndex: -1 }]} />
          <Animated.View
            style={[
              styles.borderContainer,
              styles.focusBorder,
              { opacity: focusBorder, borderColor: colors.textPrimary, zIndex: -1 },
            ]}
          />
          <Animated.View
            style={[
              styles.borderContainer,
              styles.errorBorder,
              { opacity: errorBorder, zIndex: -1 },
            ]}
          />
          <TouchItem noFeedback onPress={() => textInput.current?.focus()} style={{ flex: 1, zIndex: 100, backgroundColor: 'transparent' }}>
            <>
              <View
                style={[styles.inputInnerContainer, props?.innerContainerStyle]}
              >
                {props?.currency && (
                  <Text style={[styles.currencyLabel, props?.currencyStyle]}>
                    {formatMoney(null, props?.currency)}
                  </Text>
                )}
                {renderLeftContent()}
                <View style={{ marginRight: 8, }}>{renderLeftIcon()}</View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  {type !== "input" ?
                    <Text
                      style={[styles.textInputStyle,
                      !value && { color: colors.placeholder },
                        textStyle]}>{value || placeholder}</Text> :

                    <TextInput
                      {...props}
                      placeholder={placeholder}
                      ref={textInput}
                      style={[styles.textInputStyle, textStyle]}
                      value={text}
                      secureTextEntry={secureTextEntry ? !secureTextVisible : false}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChangeText={onChangeText}
                      maxLength={maxLength}
                      underlineColorAndroid="transparent"
                      spellCheck={false}
                      placeholderTextColor={colors.placeholder}
                      autoComplete="off"
                      multiline={multiline}
                      autoCorrect={false}
                      numberOfLines={3}
                      textAlignVertical="top"
                      onSelectionChange={({ nativeEvent: { selection: select } }) => {
                        setPrevSelection(
                          Platform.OS === "ios"
                            ? selection
                            : select
                        )
                        setSelection(select)
                      }}
                    />}
                  <RightContent
                    type="content"
                    rightContentStyle={props.rightContentStyle}
                    rightContent={props.rightContent}
                  />
                </View>
                <Animated.View
                  style={[
                    {
                      position: "absolute",
                      right: -4,
                      bottom: -20
                    },
                    props?.errorStyle,
                  ]}
                >
                  <Text style={styles.labelError}>{userError}</Text>
                </Animated.View>
              </View>
            </>
          </TouchItem>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8 }}>
              <RightContent type="notation" rightNotation={props.rightNotation} />
              <RightContent
                type="icon"
                rightIcon={type == "select" ?
                  () => 
                  <EntypoIcon
                    name="chevron-thin-down"
                    style={styles.icon}
                    // color={colors.primaryColor}
                    size={18}
                  />
                  :
                  props.rightIcon}
                showSecureIcon={secureTextEntry && value && value.length ? true : false}
                onClickRightIcon={onClickRightIcon}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginBottom: props?.description || props?.button ? -10 : 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            {renderDescription()}
          </View>
          {props.button ? props.button : null}
        </View>
      </View>
    </View>
  )
}

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  userError: PropTypes.string,
  placeholder: PropTypes.string,
  iconLib: PropTypes.string,
  rightIcon: PropTypes.elementType,
  format: PropTypes.string,
  iconStyle: PropTypes.object,
  multiline: PropTypes.bool,
  maxLength: PropTypes.number,
  validationMode: PropTypes.string,
  validateFn: PropTypes.func,
  customInputValidation: PropTypes.func,
  theme: PropTypes.string,
  onBlur: PropTypes.func,
  noCheck: PropTypes.bool,
  checkBalance: PropTypes.number,
  currency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  textStyle: PropTypes.object,
  noMargin: PropTypes.bool,
  noLabel: PropTypes.bool,
  leftIcon: PropTypes.elementType,
  rightContent: PropTypes.object,
  subTitleRight: PropTypes.string,
  padding: PropTypes.bool,
  secureTextEntry: PropTypes.bool
}

Input.defaultProps = {
  theme: "dark",
  maxLength: 50,
  currency: false,
  noCheck: false,
  noLabel: false,
  multiline: false,
  value: "",
}
