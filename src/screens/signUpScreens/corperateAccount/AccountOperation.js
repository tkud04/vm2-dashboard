import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { Button, Input, PickerButton, RadioButton, Root, Text, TouchItem } from '../../../components'
import colors from '../../../theme/colors'
import metrics from '../../../theme/metrics'
import generateHeader from '../../../utils/generateHeader'
import styles_ from './styles'
import { Icons, Images } from '../../../utils/assets/assets'
import { ListModal } from '../../../components/modal/ListModal'
import { useOnboardingStore } from '../../../store/onboarding'

export const AccountOperation = ({ navigation }) => {

  const {
    isRegistered,
    hasVbank,
    hasOperators,
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
  const initialFormState = {
    flow: '',
    role: '',
  };
  const [formState, setFormState] = React.useState(initialFormState);
  const [directors, setDirectors] = React.useState([]);
  const [selectedDirector, setSelectedDirector] = React.useState('');
  const [operatorMode, setOperatorMode] = React.useState('sole');
  const [listMode, setListMode] = React.useState('flow'); //flow,role

  const isMounted = React.useRef(false);
  const listModalRef = React.useRef();

  const savedDirectors = [
    {
      id: "director-1-adeb",
      name: "Adebisi Agunwa",
      email: "adevb@gmai.com"
    },
    {
      id: "director-2-biol",
      name: "Biola Banwo",
      email: "biolban@gmai.com"
    },
    {
      id: "director-3-mkay",
      name: "Mkay Agunwa",
      email: "mkay@gmai.com"
    },
    {
      id: "director-4-nife",
      name: "Nifemi Awe",
      email: "nifemawe@gmai.com"
    },
  ]

  useEffect(() => {
    generateHeader('', navigation);
    if (!isMounted.current) {
      onAdd();
      onAdd();
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
        id: 'director-' + (prev.length + 1)
      }
    ]))
  }

  const onRemove = (id, index = -1) => {
    setDirectors(prev => ([
      ...prev.filter(item => item.id !== id),
    ]))
  }

  const handleSelectRole = () => {
    setListMode("role");
    listModalRef.current?.toggle();
  }

  const handleSelectFlow = () => {
    setListMode("flow");
    listModalRef.current?.toggle();
  }

  const handleSelectDirector = (directorId) => {
    setSelectedDirector(directorId);
    listModalRef.current?.toggle();
  }

  const handleSubmit = () => {
    if(operatorMode=="sole"){
      setHasOperators(false);
      if(hasVbank){
        return navigation.navigate('CreatePin');
      }
      navigation.navigate('AccountInfo')
    }else {
      navigation.navigate('OperatorInfo')
    }
    
  }


  return (
    <Root style={styles.container} scrollable>
      <View>
        <Text style={styles.title}>Account operation</Text>
        <Text style={styles.desc}>How will this account be operated</Text>
      </View>
      {/* <View style={{ height: metrics.screenHeight / 2.5, justifyContent: 'space-between' }}> */}
      <View style={styles.rowBetween}>
        <RadioButton
          label="I will be the sole operator"
          checked={operatorMode == 'sole'}
          style={{ width: '48%' }}
          onPress={() => {
            setOperatorMode('sole')
          }}
        />
        <RadioButton
          label="There will be other operators"
          checked={operatorMode == 'other'}
          style={{ width: '49%' }}
          onPress={() => {
            setOperatorMode('other')
          }}
        />
      </View>
      <Text style={[styles.directorTitle, { marginTop: 20 }]}>{operatorMode == "sole" ?
        "Who will sign the consent letter ? " :
        "Select approved flow for operation"}
      </Text>
      <Text style={[styles.desc, { marginBottom: 5 }]}>{operatorMode == "sole" ?
        "Select director" : ""}</Text>
      {operatorMode == "sole" ?
        directors.map((director, index) => {
          console.log("dir", director.name);
          return (
            <View style={{ paddingBottom: 0 }} key={director.id}>
              <Input
                wrapperStyle={{
                  marginBottom: 20,
                }}
                type="select"
                onClickRightIcon={() => handleSelectDirector(director.id)}
                // onChangeText={handleDirectorChange(director.id, 'email')}
                placeholder={"Select director " + (index + 1)}
                // value="Email address ss"
                value={director.name}
                validationMode="req"
              // onSubmitEditing={() => passwordInput.current.focusInput()}
              />

            </View>
          )
        }) :
        <>
          <Input
            wrapperStyle={{
              marginBottom: 20,
            }}
            type="select"
            label={"Select preferred flow"}
            onClickRightIcon={() => handleSelectFlow()}
            placeholder={"Select operations flows"}
            // value={formState.flow}
            value={findItem(flowsOption,"id",formState.flow).name}
            // validationMode="req"
          />
          <Input
            wrapperStyle={{
              marginBottom: 20,
            }}
            type="select"
            label={"Select your role"}
            onClickRightIcon={() => handleSelectRole()}
            // onChangeText={handleDirectorChange(director.id, 'email')}
            placeholder={"What is your role?"}
            value={findItem(rolesOption,"id",formState.role).name}
            // validationMode="req"
          />

        </>}

      <Button
        text="CONFIRM"
        onPress={handleSubmit}
      // disabled={account.length !== 10} 
      />
      <ListModal
        ref={listModalRef}
        // scrollable
        data={operatorMode =="sole"? savedDirectors: listMode=="flow"? flowsOption: rolesOption}
        title={"Choose "+(operatorMode =="sole"? "director": listMode=="flow"? "Approval flow": "Role")}
        type={operatorMode=="sole"?"director":listMode}
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
              // console.log("dir", selectedDirector, directors[0]);
              // handleDirectorChange(selectedDirector, 'name')('Adebisi lll')
              console.log({item});
              if(operatorMode == "sole"){
                handleDirectorChange(selectedDirector, 'all')(item)
              }else {
                handleInputChange(listMode)(item.id);
              }
            }, 0);
          }
        }
      />
    </Root>
  )
}

const findItem = (data=[], key="", val="")=>{
  return data.find(item => item[key]==val) || {};
}

const flowsOption = [
  {
    id: "initiator-authorizer",
    name: "Initiator - Authorizer",
  },
  {
    id: "initiator-verifier",
    name: "Initiator - Verifier - Authorizer",
  },
]

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