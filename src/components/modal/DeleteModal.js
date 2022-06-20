import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { View } from 'react-native'
import { HEIGHT } from '../../theme/metrics'
import { Icons } from '../../utils/assets/assets'
import { Button } from '../button'
import { SlideModal } from '../SlideModal/SlideModal'
import { Text } from '../text'
import styles from './styles'

export const DeleteModal = forwardRef(({
    title, message, callback
}, ref) => {
    const modalRef = useRef()

    useImperativeHandle(ref, () => ({
        toggle: () => modalRef.current.toggle()
    }))

    const callbackFunction = (item) => {
        callback(item)
        modalRef.current.toggle()
    }
    const closeModal = React.useCallback(() => {
        modalRef.current.toggle();
    }, []);

    return (
        <SlideModal
            ref={modalRef}
            height='auto'
            // height={HEIGHT < 790 ? HEIGHT * 0.52 : HEIGHT * 0.43}
            //   close={() => this.modalClosing()}
            noScrollView>
            <View style={{ justifyContent: 'space-between', padding: 20, flexGrow: 1 }}>
                <View style={styles.rowBetween}>
                    <Text style={styles.modalTitle}>{title || 'Delete'}</Text>
                    <Text
                        style={styles.modalTitle}
                        onPress={closeModal}
                    > X </Text>
                </View>
                <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'space-between', }}>
                    <Icons.bin style={{ marginVertical: 20 }} />
                    <Text style={styles.modalContent}>{message || 'Are you sure you want to delete this file ?'}</Text>
                    {/* <TouchableOpacity onPress={onClear} style={{ marginLeft: 'auto', }}> */}
                    <View style={[styles.rowBetween, { marginTop: 30, width: '100%' }]}>
                        <Button
                            text="CANCEL"
                            clear
                            onPress={closeModal}
                            style={{ width: '48%' }}
                        />
                        <Button
                            text="CONTINUE"
                            onPress={callback}
                            style={{ width: '48%', backgroundColor: '#FF0009' }}
                        />
                    </View>
                </View>
            </View>
        </SlideModal>
    )
}
)
