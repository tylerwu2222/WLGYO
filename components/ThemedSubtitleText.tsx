import { Colors } from '@/constants/Colors';
import { Text, TextProps, useColorScheme } from 'react-native';

const ThemedSubtitleText = ({ style, children, ...rest }: TextProps) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? 'light'].subtitleTextOrange;
  
  return (
    <Text style={[style, { color }]} {...rest}>
      {children}
    </Text>
  );
};
export default ThemedSubtitleText;