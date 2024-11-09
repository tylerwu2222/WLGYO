import { StyleSheet, Text, View } from 'react-native'
import { Switch } from 'react-native-paper';
import React from 'react'

interface ToggleSwitchProps {
    isSwitchOn: boolean,
    onSwitchFn?: () => void
}
const ToggleSwitch = ({
    isSwitchOn = false,
    // setIsSwitchOn, 
    onSwitchFn = () => { }
}: ToggleSwitchProps) => {
    return <Switch value={isSwitchOn} onValueChange={onSwitchFn} />;
}

export default ToggleSwitch

const styles = StyleSheet.create({})