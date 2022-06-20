import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { OnboardNavigator, DashboardNavigator } from '.'
import { AccountInfo, AccountOperation, BasicInfo, BusinessTypeChoice, CompanyInfo, CompanyInfoNew, CorperateAccount, CreatePin, DirectorInfo, Login, PersonalInfo, PreviewDetails, SignUpChoice, Success, VerifyOtp,  } from '../screens'

const Stack = createStackNavigator()

const renderScreen = ({ name, component, options = {}, path, initialParams }, index) => {
  return (
    <Stack.Screen
      name={name}
      key={index}
      options={options}
      path={path}
      component={component}
      initialParams={initialParams}
    />
  )
}

const RootNavigator = () => {
  let initialRouteName = 'Onboard'
  //let initialRouteName = 'BusinessTypeChoice'
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
    {routes.map((item, index) => {
      return renderScreen(item, index)
    })}
  </Stack.Navigator>
  )
}

const routes = [
  {
    name: 'Onboard',
    component: OnboardNavigator,
    options: { headerShown: false }
  },
  {
    name: 'SignUpChoice',
    component: SignUpChoice
  },
  {
    name: 'BusinessTypeChoice',
    component: BusinessTypeChoice
  },
  {
    name: 'SignUpCorperate',
    component: CorperateAccount
  },
  {
    name: 'VerifyOtp',
    component: VerifyOtp
  },
  {
    name: 'PersonalInfo',
    component: PersonalInfo
  },
  {
    name: 'BasicInfo',
    component: BasicInfo
  },
  {
    name: 'CompanyInfo',
    component: CompanyInfo
  },
  {
    name: 'CompanyInfoNew',
    component: CompanyInfoNew
  },
  {
    name: 'AccountInfo',
    component: AccountInfo
  },
  {
    name: 'DirectorInfo',
    component: DirectorInfo,
    initialParams: {type: "director"}
  },
  {
    name: 'ShareholderInfo',
    component: DirectorInfo,
    initialParams: {type: "shareholder"}
  },
  {
    name: 'OperatorInfo',
    component: DirectorInfo,
    initialParams: {type: "operator"}
  },
  {
    name: 'AccountOperation',
    component: AccountOperation
  },
  {
    name: 'CreatePin',
    component: CreatePin
  },
  {
    name: 'PreviewDetails',
    component: PreviewDetails
  },
  {
    name: 'Success',
    component: Success
  },
  {
    name: 'Login',
    component: Login
  },
  {
    name: 'Dashboard',
    component: DashboardNavigator,
    options: { headerShown: false }
  }
]

export { RootNavigator as default}
