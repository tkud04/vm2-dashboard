//@ts-check
import React, { 
  forwardRef, 
  useEffect,
  useImperativeHandle, 
  useRef, 
  useState,
} from "react"
import {
  View,
  Modal,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView
} from "react-native"
import PropTypes from "prop-types"

import styles from "./style"
// import _Text from "../Text"
import { SlideModalHeader } from './components'
import { HEIGHT } from "../../theme/metrics"
import ScrollContainer from "../ScrollContainer/index"
import colors from "../../theme/colors"

const DURATION = 400
const TRANSLATE_VAL = HEIGHT + 50
const getFullHeight = { height: HEIGHT }

export const SlideModal = forwardRef(({ 
  abortCallback, 
  header, 
  onClose,
  height, 
  fullHeight, 
  safeAreaView, 
  children, 
  call, 
  paddingAround, 
  bottom, 
  scrollEnabled,
  noScrollView
 }, ref) => {
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [abort, setAbort] = useState(false)
  const [active, setActive] = useState(false)
  const [didToggle, setDidToggle] = useState(false)

  const maskAnimation = useRef(new Animated.Value(0)).current
  const modalAnimation = useRef(new Animated.Value(TRANSLATE_VAL)).current

  useImperativeHandle(ref, () => ({
    toggle: () => toggle(),
    show: () => show(),
    getState: () => getState()
  }))

  useEffect(() => {
    let mounted = true

    if(mounted && didToggle) {
      if (!visible && abort && abortCallback) {
        setTimeout(() => {
          abortCallback()
        }, 400)
  
        setAbort(false)
      }
  
      animate()
      setTimeout(
        () => {
          setModalVisible(!modalVisible)
        },
        visible ? 0 : DURATION
      )
      setDidToggle(false)     
    }

    return () => mounted = false
  }, [didToggle])

  const animate = () => {
    Animated.parallel([
      Animated.timing(modalAnimation, {
        toValue: visible ? 0 : TRANSLATE_VAL,
        easing: Easing.inOut(Easing.circle),
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(maskAnimation, {
        toValue: visible ? 1 : 0,
        duration: DURATION,
        easing: Easing.linear(),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!visible) {
        setActive(false)
      }
    })
  }

  const getState = () => {
    return visible
  }

  const requestClose = () => {
    toggle(true)
  }

  const toggle = (isAbort) => {
    Keyboard.dismiss()
    setVisible(!visible)
    setAbort(isAbort)
    setDidToggle(true)
  }

  const show = () => {
    Keyboard.dismiss()
    setVisible(true)
    animate()
    setTimeout(
      () => {
        setModalVisible(true)
      },
      visible ? 0 : DURATION
    )
  }

  const renderNoScrollView = () => {
    if(noScrollView) {
      return <View style={{ flex: 1, flexShrink: 1 }}>
        {children}
      </View>
    } else {
      return <ScrollContainer
        noPadding
        forceInset={{ top: "never", bottom: "always" }}
        scrollEnabled={scrollEnabled || false}
        style={{
          flexShrink: 1,
          flex: 1,
          backgroundColor: colors.screenBackground,
        }}
      >
        {children}
      </ScrollContainer>
    }
  }

  return (
    <Modal
      visible={modalVisible}
      transparent
      onRequestClose={requestClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback
          noFeedback
          onPress={() => toggle(true)}
        >
          <Animated.View
            style={[styles.mask, { opacity: maskAnimation }]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.modal,
            {
              bottom: bottom ? HEIGHT / 3 : 0,
              width: paddingAround ? "90%" : "100%",
              marginBottom: paddingAround ? 14 : 0,
              height: call
                ? 120
                : height
                  ? height
                  : HEIGHT,
            },
            fullHeight ? getFullHeight : height,
            { transform: [{ translateY: modalAnimation }] },
          ]}
        >
          {
            header 
              ? <SlideModalHeader 
                onClose={onClose}
                toggle={() => toggle(true)}
                header={header}
              />
              : null
          }
          
          {
            safeAreaView 
              ? (
                <SafeAreaView style={{ flex: 1 }}>
                  <ScrollContainer
                    noPadding
                    forceInset={{ top: "never", bottom: "always" }}
                    style={{
                      flexShrink: 1,
                      flex: 1,
                      backgroundColor: colors. screenBackground,
                    }}
                  >
                    {children}
                  </ScrollContainer>
                </SafeAreaView>
              ) 
              : renderNoScrollView()
          }
        </Animated.View>
      </View>
    </Modal>
  )
})

SlideModal.propTypes = {
  children: PropTypes.object.isRequired,
  close: PropTypes.func,
  header: PropTypes.string,
}

SlideModal.defaultProps = {
  close: () => { },
}
