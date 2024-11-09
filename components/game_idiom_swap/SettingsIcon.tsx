import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useContext } from 'react'

import { IdiomContext } from '@/app/_layout';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';


const SettingsIcon = () => {
  const { sideMenuVisible, setSideMenuVisible } = useContext(IdiomContext);


  return (
    <View>
      <TouchableOpacity onPress={() => {
        console.log('pressed settings')
        setSideMenuVisible(true);
      }}>
        <Ionicons name="menu" size={40} color={Colors.light.buttonPrimaryBackgroundOrange} />
      </TouchableOpacity>
    </View>
  )
}

export default SettingsIcon

const styles = StyleSheet.create({})