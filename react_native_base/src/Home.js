import { Text, View, StyleSheet, Image } from 'react-native';
import Btn from './Btn';
import { darkGreen } from './Constant';

export default function Home(props) {

  const getstartedbtn = () =>{
    props.navigation.navigate("Login");
}
    return (
    <View style={styles.container}>
      <View>
        <Image source={require('./assets/travel.png')} style={styles.appLogo} />
      </View>
      <View>
      <Text style={styles.title}>Welcome to Sample App</Text>
      </View>
      <View>
      <Text style={styles.description}>Confuse how to plan a trip, no problem</Text>
      </View>
      <View>
       <Btn bgColor={darkGreen} textColor='white' btnLabel="Let's get started" Press={getstartedbtn}/>
      </View>
    </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      marginHorizontal:40,
      marginVertical:250,
    },
    appLogo: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    description: {
      fontSize: 40,
      marginBottom: 20,
      marginTop: 20,
      marginBottom:20
    },
    getStartedButton: {
      backgroundColor: '#007bff',
      borderRadius: 5,
      padding: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
   
  });
  
  