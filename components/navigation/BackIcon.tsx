import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';


const BackIcon = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity onPress={() => {
        router.back();
      }}>
        <Ionicons name="arrow-back" size={40} color={Colors.light.buttonPrimaryBackgroundOrange} />
      </TouchableOpacity>
    </View>
  )
}

export default BackIcon

const styles = StyleSheet.create({})