import { Text, View, StyleSheet, Image } from 'react-native';
import Btn from './Btn';
import { darkGreen } from './Constant';

export default function Home(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
         Lets go
        </Text>
        <Text style={styles.paragraph}>
         for a Trip
        </Text>
        <Btn bgColor={darkGreen} textColor='white' btnLabel="Login" Press={()=>props.navigation.navigate("Login")}/>
        <Btn bgColor='orange' textColor='white' btnLabel="Signup" Press={()=>props.navigation.navigate("Signup")}/>
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
  
  