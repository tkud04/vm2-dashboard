//@ts-check
import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { Button, Input, PickerButton, RadioButton, Root, Text, TouchItem } from '../../../components'
import colors from '../../../theme/colors'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles_ from './styles'
import { Icons, Images } from '../../../utils/assets/assets'
import { DeleteModal } from '../../../components/modal/DeleteModal'
import { useOnboardingStore } from '../../../store/onboarding'
import { StackActions } from '@react-navigation/native'
import { ListModal } from '../../../components/modal/ListModal'

export const DirectorInfo = ({ navigation, route }) => {

  const {
    isRegistered,
    hasVbank,
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
    role: '', //optional: operator,
    shareholderType: '',//shareholder: individual, company
    signature: {}
  };
  const [formState, setFormState] = React.useState({});
  const [directors, setDirectors] = React.useState([]);
  const [selectedDirector, setSelectedDirector] = React.useState(0);
  const [entityType, setEntityType] = React.useState("director");
  const [listMode, setListMode] = React.useState('role'); //flow,role

  const isMounted = React.useRef(false);
  const deleteRef = React.useRef();
  const listModalRef = React.useRef();

  useEffect(() => {
    generateHeader('', navigation);
    if (!isMounted.current) {
      onAdd();
      onAdd();
    }
    isMounted.current = true;

    if (isMounted.current) {
      const { params } = route;
      //TODO: set entity type
      setEntityType(params?.type)
      console.log({ params, hasVbank, isRegistered });
    }

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
      if (key == "all") {
        copy[targetIndex] = {
          ...copy[targetIndex],
          ...val
        }
      } else {
        copy[targetIndex][key] = val;
      }
      return copy;
    })
  });

  const onAdd = () => {
    setDirectors(prev => ([
      ...prev,
      {
        ...initialState,
        id: entityType + '-' + (prev.length + 1)
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

  const handleImageDelete = (directorId) => {
    setSelectedDirector(directorId);
    deleteRef.current?.toggle();
    // setTimeout(() => {
    //   handleDirectorChange(directorId, 'signature')({})
    // }, 500);
    // navigation.navigate('DirectorInfo')
  }

  const handleSelectRole = (directorId) => {
    setSelectedDirector(directorId);
    setListMode("role");
    listModalRef.current?.toggle();
  }

  const navigationPush = (navigation, name, params) => {
    navigation.dispatch({
      ...StackActions.push(name, params)
    });
  }

  const handleSubmit = () => {
    if (hasVbank) {
      if (entityType == "director")
        navigation.navigate('AccountOperation');
      else if (entityType == "operator") {
        setHasOperators(true);
        navigation.navigate('CreatePin');
      }
      return;
    }
    if (isRegistered) {
      if (entityType == "director")
        navigationPush(navigation, 'VerifyOtp', { type: "management" });
      else if (entityType == "operator"){
        setHasOperators(true);
        navigation.navigate('AccountInfo');
      }
      return;
    }
    else {
      //TODO: persist info
      if (entityType == "director")
        navigation.navigate('ShareholderInfo');
      else if (entityType == "shareholder")
        navigation.navigate('PreviewDetails');
      return;
    }

  }

  const titleObj = {
    "director": "Management",
    "shareholder": "Shareholder",
    "operator": "Operator",
  }

  const entityTitle = {
    "director": "Director",
    "shareholder": "Shareholder",
    "operator": "Operator",
  }


  return (
    <Root style={styles.containerz} scrollable>
      <View style={{ paddingHorizontal: 0 }}>
        <View style={styles.screenPadding}>
          <Text style={styles.title}>{titleObj[entityType] || "..."} details</Text>
          <Text style={styles.desc}>Please provide a minimum of 2 {entityType}s' information</Text>
        </View>
        {/* <View style={{ height: metrics.screenHeight / 2.5, justifyContent: 'space-between' }}> */}
        {directors.map((director, index) => {
          return (
            <View style={[styles.directorContainer, styles.screenPadding]} key={director.id}>
              <View style={styles.rowBetween}>
                <Text style={styles.directorTitle}>{entityTitle[entityType]} {index + 1} </Text>
                {index > 1 && <Text
                  style={styles.directorTitle}
                  onPress={() => onRemove(director.id)}
                > X </Text>}
              </View>
              {entityType == "shareholder" &&
                <View style={{flexDirection:'row', marginBottom:20}}>
                  <RadioButton
                    label="Individual"
                    checked={director.shareholderType == 'individual'}
                    style={{ width: '40%' }}
                    // primary={false}
                    onPress={() => {
                      handleDirectorChange(director.id, 'shareholderType')('individual')
                      // setShareholderType('individual')
                    }}
                  />
                  <RadioButton
                    label="Company"
                    checked={director.shareholderType == 'company'}
                    style={{ width: '40%', marginLeft: 10 }}
                    onPress={() => {
                      handleDirectorChange(director.id, 'shareholderType')('company')
                    }}
                  />
                </View>
              }
              <Input
                wrapperStyle={{
                  marginBottom: 20,
                }}
                onChangeText={handleDirectorChange(director.id, 'email')}
                placeholder="Enter email address"
                label="Email address"
                value={director.email}
                validationMode="req"
                autoCapitalize={"none"}
                keyboardType="email-address"
                returnKeyType="next"
              // onSubmitEditing={() => passwordInput.current.focusInput()}
              />
              <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                // flex:1,
                // width: '100%'
              }}>
                <Input
                  onChangeText={handleDirectorChange(director.id, 'bvn')}
                  wrapperStyle={{
                    marginBottom: 20,
                    minWidth: '48%',
                  }}
                  placeholder="Enter BVN"
                  label="BVN"
                  maxLength={10}
                  value={director.bvn}
                  validationMode="len10|number"
                  format="number"
                />
                <Input
                  onChangeText={handleDirectorChange(director.id, 'nin')}
                  wrapperStyle={{
                    marginBottom: 20,
                    minWidth: '48%',
                  }}
                  placeholder="Enter NIN"
                  label="NIN"
                  maxLength={10}
                  value={director.nin}
                  validationMode="len10|number"
                  format="number"
                />
              </View>
              {entityType == "operator" ?
                <Input
                  wrapperStyle={{
                    marginBottom: 20,
                  }}
                  type="select"
                  label={"Select your role"}
                  onClickRightIcon={() => handleSelectRole(director.id)}
                  // onChangeText={handleDirectorChange(director.id, 'email')}
                  placeholder={"What is your role?"}
                  value={findItem(rolesOption, "id", director.role).name}
                // validationMode="req"
                /> :
                <>
                  <Text style={styles.directorTitle}>{entityTitle[entityType]}'s signature </Text>
                  <PickerButton
                    text={director.signature?.name || "Ogunbade.jpeg"}
                    clear={!!director.signature?.name}
                    onClear={() => handleImageDelete(director.id)}
                    onPress={() => handleImagePicker(director.id)}
                  // disabled={account.length !== 10} 
                  />
                </>
              }
            </View>
          )
        })}
        <View style={styles.screenPadding}>
          <TouchItem
            onPress={onAdd}
            style={styles.addButtonContainer}
          >
            <View style={styles.addButton}>
              <Text
                weight="medium"
                style={{ marginRight: 10, color: colors.primaryColor }}>Add {entityType}</Text>
              <Icons.plus />
            </View>
          </TouchItem>
          {entityType != "shareholder" &&
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icons.info_circle />
              <Text
                weight="medium"
                style={styles.consent}>
                {entityType == "director" ?
                  "Emails will be sent to your directors to give consent. This is required for the account to  become fully operational." :
                  entityType == "operator" ?
                    "Emails will be sent to the other operators to enable them set up their password and start using the portal." :
                    ""
                }
              </Text>
            </View>
          }
          <Button
            text="CONTINUE"
            onPress={handleSubmit}
          // disabled={account.length !== 10} 
          />
        </View>
        <DeleteModal
          ref={deleteRef}
          callback={
            (item) => {
              deleteRef.current?.toggle();
              setTimeout(() => {
                handleDirectorChange(selectedDirector, 'signature')({})
              }, 500);
            }
          }
        />
        <ListModal
          ref={listModalRef}
          data={rolesOption}
          // data={shareholderType == "sole" ? savedDirectors : listMode == "flow" ? flowsOption : rolesOption}
          title={"Choose " + (listMode == "flow" ? "Approval flow" : "Role")}
          type={listMode}
          map={{
            desc: "name",
            val: "id",
            extra: "desc",
            subline: ["desc"],
          }}
          callback={
            (item) => {
              listModalRef.current?.toggle();
              setTimeout(() => {
                console.log({ item });
                if (listMode == "role") {
                  handleDirectorChange(selectedDirector, listMode)(item.id);
                }
              }, 0);
            }
          }
        />
      </View>
    </Root>
  )
}

const findItem = (data = [], key = "", val = "") => {
  return data.find(item => item[key] == val) || {};
}

const rolesOption = [
  {
    id: "viewer",
    name: "Viewer",
    desc: "Descriptive texts here",
  },
  {
    id: "initiator",
    name: "Initiator",
    desc: "Descriptive texts here",
  },
  {
    id: "authorizer",
    name: "Authorizer",
    desc: "Descriptive texts here",
  }
]


const styles = StyleSheet.create({
  ...styles_,
  addButtonContainer: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    marginVertical: 20,
    borderRadius: 5,
    maxWidth: '50%',
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