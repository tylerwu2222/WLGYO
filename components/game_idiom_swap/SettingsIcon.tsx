import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
// import { useNavigation } from 'expo-router';

const SettingsIcon = () => {

  return (
    <View>
      <TouchableOpacity onPress={() => {
        console.log('pressed settings')
      }}>
        <Ionicons name="menu" size={40} color={Colors.light.buttonPrimaryBackgroundOrange} />
      </TouchableOpacity>
    </View>
  )
}

export default SettingsIcon

const styles = StyleSheet.create({})