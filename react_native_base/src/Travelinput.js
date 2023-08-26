import { Text, View, StyleSheet} from 'react-native';
import Btn from './Btn';

export default function Travelinput(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
         Lets go
        </Text>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      marginHorizontal:40,
      marginVertical:250
    },
    paragraph: {
      color:'black',
      fontSize: 64
    },
   
  });
  
  