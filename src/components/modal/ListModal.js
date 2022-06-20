import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { View, Image } from 'react-native'
import AntIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import colors from '../../theme/colors';
import { HEIGHT } from '../../theme/metrics'
import { Icons, Images } from '../../utils/assets/assets'
import { Button } from '../button'
import { SlideModal } from '../SlideModal/SlideModal'
import { Text } from '../text'
import { TouchItem } from '../touchItem'
import styles from './styles'

export const ListModal = forwardRef(({
    title,
    message,
    callback,
    map = {
        desc: "name",
        val: "id",
    },
    type = "director",
    data = []
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
            scrollEnabled
            //  header="Delete" 
            fullhHeight={false}
            height='auto'
            // height={HEIGHT < 790 ? HEIGHT * 0.52 : HEIGHT * 0.43}
            //   close={() => this.modalClosing()}
            noScrollView>
            <View style={{ justifyContent: 'space-between', paddingVertical: 24 }}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{title || 'Delete'}</Text>
                    <Text
                        style={styles.modalTitle}
                        onPress={closeModal}
                    >
                        <AntIcon name="close" size={22} />
                    </Text>
                </View>
                <View style={{ padding: 20 }}>
                    {data.map(item => (
                        <TouchItem
                            onPress={() => callbackFunction(item)}
                            style={[styles.optionWrapper, { justifyContent: 'flex-start' }]}>
                            {type == "director" && <View style={[styles.logoWrapper, {}]}>
                                <FeatherIcon name="user" size={22} style={styles.logo} />
                            </View>}
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={styles.optionTitle}>{item[map.desc]} </Text>
                                {type == "role" && <Text style={[styles.desc, { color: 'orange' }]}>({item[map.extra]})</Text>}
                            </View>
                        </TouchItem>
                    ))}
                </View>
            </View>
        </SlideModal>
    )
}
)
