import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { View, Image } from 'react-native'
import { HEIGHT } from '../../theme/metrics'
import { Icons, Images } from '../../utils/assets/assets'
import { Button } from '../button'
import { Input } from '../input'
import { SlideModal } from '../SlideModal/SlideModal'
import { Text } from '../text'
import styles from './styles'

export const EditModal = forwardRef(({
    title,
    message,
    callback,
    map = {
        desc: "name",
        val: "id",
        // subline: ["account", "bank_name"],
    },
    type = "director",
    data = []
}, ref) => {
    const modalRef = useRef();

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        setItems(data);
    }, [data]);

    useImperativeHandle(ref, () => ({
        toggle: () => modalRef.current.toggle()
    }))

    const handleItemChange = ((id, key) => (val) => {
        setItems(prev => {
            let copy = [...prev];
            let targetIndex = copy.findIndex(item => item.id == id);
            if (targetIndex < 0)
                return copy;
            copy[targetIndex][key] = val;
            return copy;
        })
    });

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
                    > X </Text>
                </View>
                <View style={{ padding: 20 }}>
                    {items.map((item, index) => (
                        <Input
                            wrapperStyle={{
                                marginBottom: 20,
                            }}
                            onChangeText={handleItemChange(index, item[map.val])}
                            placeholder={item.placeholder || "Enter value"}
                            label={item[map.desc]}
                            value={item[map.filled || "value"]}
                            validationMode="req"
                            autoCapitalize={"none"}
                        // keyboardType="email-address"
                        // returnKeyType="next"
                        // onSubmitEditing={() => passwordInput.current.focusInput()}
                        />
                    ))}
                    <View style={[styles.rowBetween, { marginTop: 30, width: '100%' }]}>
                        <Button
                            text="CANCEL"
                            clear
                            onPress={closeModal}
                            style={{ width: '48%' }}
                        // disabled={account.length !== 10} 
                        />
                        <Button
                            text="SAVE"
                            onPress={() => callbackFunction(items)}
                            style={{ width: '48%', }}
                        // disabled={account.length !== 10} 
                        />

                    </View>
                </View>
            </View>
        </SlideModal>
    )
}
)
