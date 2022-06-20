
import React, { useEffect } from 'react'
import { View, Image, StyleSheet, FlatList } from 'react-native'

import { Button, Input, PickerButton, RadioButton, Root, Text, TouchItem } from '../../../components'
import colors from '../../../theme/colors'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles_ from './styles'
import { Icons, Images } from '../../../utils/assets/assets'
import { DeleteModal } from '../../../components/modal/DeleteModal'
import { EditModal } from '../../../components/modal/EditModal'
import { useOnboardingStore } from '../../../store/onboarding'

export const PreviewDetails = ({ navigation }) => {

  const {
    isRegistered,
    hasVbank,
    hasOperators,
    setHasVbank,
    setIsRegistered,
    setHasOperators,
  } = useOnboardingStore(({ ...rest }) => ({
    ...rest
  }));

  const initialState = {
    id: '',
    name: '',
    email: '',
    bvn: '',
    nin: '',
    signature: {}
  };
  const [formState, setFormState] = React.useState({});
  const [directors, setDirectors] = React.useState([]);
  const [operators, setOperators] = React.useState([]);
  const [selectedField, setSelectedField] = React.useState('');

  const isMounted = React.useRef(false);
  const editModalRef = React.useRef();

  useEffect(() => {
    generateHeader('', navigation);
    if (!isMounted.current) {
      onAdd();
      onAdd();

      if (hasOperators) {

      }
    }
    isMounted.current = true;

  }, []);

  const handleInputChange = (key => (val) => {
    setFormState(state => ({
      ...state,
      [key]: val
    }))
  });

  const handleDirectorChange = ((id, key) => (val) => {
    setDirectors(prev => {
      let copy = [...prev];
      let targetIndex = copy.findIndex(item => item.id == id);
      copy[targetIndex][key] = val;
      return copy;
    })
  });

  const onAdd = () => {
    setDirectors(prev => ([
      ...prev,
      {
        ...initialState,
        id: 'director-' + (prev.length + 1)
      }
    ]))
  }

  const onRemove = (id, index = -1) => {
    setDirectors(prev => ([
      ...prev.filter(item => item.id !== id),
    ]))
  }
  const handleImagePicker = (directorId) => {
    setTimeout(() => {
      handleDirectorChange(directorId, 'signature')({
        name: Date.now() + '.jpeg',
      })
    }, 500);
  }

  const handleEditInfo = (fieldKey) => {
    setSelectedField(fieldKey);
    editModalRef.current?.toggle();
    // setTimeout(() => {
    //   handleDirectorChange(directorId, 'signature')({})
    // }, 500);
    // navigation.navigate('DirectorInfo')
  }

  const handleSubmit = () => {
    navigation.navigate('Success')
  }

  let coyDetails= (!hasVbank && !isRegistered)? 
  [
    { title: 'Company Name', content: 'Bentage Limited', editable: true }
  ]:[
    { title: 'RC Number', content: 'RC90667', editable: false },
    { title: 'TIN Number', content: '4567890', editable: false },
    { title: 'Company Name', content: 'Smart Systems Limited', editable: false },
    { title: 'Address', key: 'companyAddress', content: '67 Amuwo Odofin, festac Lagos', editable: true },
  ]


  return (
    <Root style={styles.containerz} scrollable>
      <View style={{ paddingHorizontal: 0 }}>
        <View style={styles.screenPadding}>
          <Text style={styles.title}>Preview</Text>
          <Text style={styles.desc}>Please preview your business details</Text>
        </View>
        <View style={[styles.directorContainer, styles.screenPadding]} key={"company-details"}>
          <Text style={[styles.directorTitle, { marginBottom: 10 }]}>Company Details </Text>
          {coyDetails.map(item => (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Text style={styles.desc}>{item.title}: <Text style={styles.directorTitle}>{item.content}</Text> </Text>
              {item.editable &&
                <TouchItem
                  onPress={() => handleEditInfo(item.key)}
                  style={[styles.addButtonContainer, { marginVertical: 0 }]}
                >
                  <View style={styles.addButton}>
                    <Text
                      weight="medium"
                      style={{ color: colors.primaryColor }}>EDIT</Text>
                  </View>
                </TouchItem>}
            </View>
          ))}
        </View>

        {/* <View style={{ height: metrics.screenHeight / 2.5, justifyContent: 'space-between' }}> */}
        <View style={styles.screenPadding}>
          <Text style={styles.directorTitle}>Management Details </Text>
        </View>
        {directors.map((director, index) => {
          return (
            <View style={[styles.directorContainer, styles.screenPadding]} key={director.id}>
              <Text style={styles.directorTitle}>Director {index + 1} </Text>
              <Image source={Images.image_placeholder} />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {[
                  { title: 'First Name', content: 'Patience', editable: false },
                  { title: 'Last Name', content: 'Adedayo', editable: false },
                  { title: 'Phone number', content: 'patience.adedayo@abc.xyz', editable: false },
                  { title: 'Email Address', content: '67 Amuwo Odofin, festac Lagos', editable: true },
                  { title: 'Date of birth', content: '01/01/1900', editable: false },
                  { title: 'Contact Address', content: '67 Amuwo Odofin, festac Lagos', editable: true },
                ].map((item, index) => (
                  <View style={{ width: index > 1 ? '100%' : '50%', marginBottom: 5, }}>
                    <Text style={[styles.desc, { marginBottom: 0 }]}>{item.title}</Text>
                    <Text style={[styles.directorTitle, { marginBottom: 0 }]}>{item.content}</Text>
                  </View>))}
              </View>
            </View>
          )
        })}
        {!isRegistered &&
          <>
            <View style={[styles.screenPadding,
            styles.rowBetween,
            { alignItems: 'center', marginVertical: 5 }]}>
              <Text style={styles.directorTitle}>Shareholders Details </Text>
              <TouchItem
                onPress={() => handleEditInfo('shareholder')}
                style={[styles.addButtonContainer, { marginVertical: 0 }]}
              >
                <View style={styles.addButton}>
                  <Text
                    weight="medium"
                    style={{ color: colors.primaryColor }}>EDIT</Text>
                </View>
              </TouchItem>
            </View>
            {directors.map((director, index) => {
              return (
                <View style={[styles.directorContainer, styles.screenPadding]} key={director.id}>
                  <Text style={styles.directorTitle}>Shareholder {index + 1} </Text>
                  <Image source={Images.image_placeholder} />
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {[
                      { title: 'First Name', content: 'Patience', editable: false },
                      { title: 'Last Name', content: 'Adedayo', editable: false },
                      { title: 'Phone number', content: 'patience.adedayo@abc.xyz', editable: false },
                      { title: 'Email Address', content: '67 Amuwo Odofin, festac Lagos', editable: true },
                      { title: 'Date of birth', content: '01/01/1900', editable: false },
                      { title: 'Contact Address', content: '67 Amuwo Odofin, festac Lagos', editable: true },
                    ].map((item, index) => (
                      <View style={{ width: index > 1 ? '100%' : '50%', marginBottom: 5, }}>
                        <Text style={[styles.desc, { marginBottom: 0 }]}>{item.title}</Text>
                        <Text style={[styles.directorTitle, { marginBottom: 0 }]}>{item.content}</Text>
                      </View>))}
                  </View>
                </View>
              )
            })}
          </>
        }
        <View style={[styles.directorContainer, styles.screenPadding]}>
          <Text style={styles.directorTitle}>Directors signatures </Text>
          <FlatList
            data={directors}
            contentContainerStyle={{ marginVertical: 20 }}
            renderItem={({ item: director, index }) => (
              <PickerButton
                text={director.signature?.name || "Ogunbade.jpeg"}
                style={{ marginBottom: 20 }}
                showDelete={false}
                // clear={!!director.signature?.name}
                clear={true}
                onClear={() => { }}
                onPress={() => { }}
              />
            )}
          />

        </View>
        {!isRegistered &&
          <View style={[styles.directorContainer, styles.screenPadding]}>
            <Text style={styles.directorTitle}>Shareholders signatures </Text>
            <FlatList
              data={directors}
              contentContainerStyle={{ marginVertical: 20 }}
              renderItem={({ item: director, index }) => (
                <PickerButton
                  text={director.signature?.name || "Ogunbade.jpeg"}
                  style={{ marginBottom: 20 }}
                  showDelete={false}
                  // clear={!!director.signature?.name}
                  clear={true}
                  onClear={() => { }}
                  onPress={() => { }}
                />
              )}
            />

          </View>
        }
        {hasOperators &&
          <>
            <View style={[styles.screenPadding,
            styles.rowBetween,
            { alignItems: 'center', marginVertical: 5 }]}>
              <Text style={styles.directorTitle}>Operators' Details </Text>
              <TouchItem
                onPress={() => handleEditInfo('operator')}
                style={[styles.addButtonContainer, { marginVertical: 0 }]}
              >
                <View style={styles.addButton}>
                  <Text
                    weight="medium"
                    style={{ color: colors.primaryColor }}>EDIT</Text>
                </View>
              </TouchItem>
            </View>
            {directors.map((director, index) => {
              return (
                <View style={[index < directors.length - 1 ? {} : styles.directorContainer, styles.screenPadding]} key={director.id}>
                  <Text style={styles.directorTitle}>Operator {index + 1} </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {[
                      // { title: 'First Name', content: 'Patience', editable: false },
                      // { title: 'Last Name', content: 'Adedayo', editable: false },
                      // { title: 'Phone number', content: 'patience.adedayo@abc.xyz', editable: false },
                      { title: 'Email Address', content: '67 Amuwo Odofin, festac Lagos', editable: true },
                      // { title: 'Date of birth', content: '01/01/1900', editable: false },
                      // { title: 'Contact Address', content: '67 Amuwo Odofin, festac Lagos', editable: true },
                    ].map((item, index) => (
                      <View style={{ width: '50%', marginBottom: 5, }}>
                        <Text style={[styles.desc, { marginBottom: 0 }]}>{item.content}</Text>
                        {/* <Text style={[styles.directorTitle, { marginBottom: 0 }]}>{item.content}</Text> */}
                      </View>))}
                  </View>
                  <Text style={styles.directorTitle}>{index % 2 == 0 ? 'Initiator' : 'Authorizer'} </Text>
                </View>
              )
            })}
          </>
        }
        <View style={styles.screenPadding}>
          <Button
            text="PROCEED"
            style={styles.screenPadding}
            onPress={handleSubmit}
          />
        </View>

        <EditModal
          ref={editModalRef}
          // data={savedDirectors}
          data={[
            { key: 'companyAddress', label: 'Company Address', value: '67 Amuwo' },
            // { key: 'companyEmail', label: 'Company Email', value: 'abc.kay@xyz.co' },
          ]}
          title="Edit details"
          map={{
            desc: "label",
            val: "key",
            filled: "value",
            // subline: ["account", "bank_name"],
          }}
          callback={
            (item) => {
              editModalRef.current?.toggle();
              setTimeout(() => {
                // console.log("dir", selectedDirector, directors[0]);
                if (Array.isArray(item)) {
                  item.map(item_ => {
                    // handleDirectorChange(item_.key, item_.key)(item_.val)
                  })
                } else {
                  // handleDirectorChange(selectedField, item.key)(item.val)
                }
              }, 0);
            }
          }
        />
        {/* </View> */}
      </View>
    </Root >
  )
}


const styles = StyleSheet.create({
  ...styles_,
  addButtonContainer: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    marginVertical: 20,
    borderRadius: 5,
    maxWidth: 133,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  consent: {
    lineHeight: 24,
    maxWidth: "90%",
    marginLeft: 10,
    color: colors.textPrimary
  }

})