import React from 'react'
import { TextInput, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles'

export const SearchBar = (props) => {
  
  const search = () => {
    props.onSubmit()
  }
  
    return (
      <>
        <View style={styles.container}>
           <View style={styles.searchIconView}>
             <TouchableOpacity
              onPress={search}
             >
              <Ionicons name="search-outline" size={30} style={styles.searchIcon} />
             </TouchableOpacity>
           </View>
           <TextInput
             style={styles.input}
             placeholder={props.placeholder}
           />
        </View>
      </>
    )
  }
