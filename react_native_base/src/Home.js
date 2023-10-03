import { Text, View, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import Btn from './Btn';
import { darkGreen } from './Constant';

export default function Home(props) {

  const getstartedbtn = () => {
    props.navigation.navigate("Login");
  }
  return (
    // <View style={styles.container}>
      <ImageBackground source={require('./assets/purple.png')} resizeMode="cover" style={styles.bgImage}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center", paddingTop: 150, paddingBottom: 250 }}>
            <Text style={{ fontSize: 60 }}>Welcome</Text>
          </View>
          <View>
            <View>
              <Text style={styles.description}>Confuse how to plan a trip!</Text>
            </View>
          </View>
          <View style={{alignItems: "center", marginTop: 20}}>
            <Btn bgColor={'#a75bfe'} textColor='white' btnLabel="Let's get started" Press={getstartedbtn} />
          </View>
        </View>
      </ImageBackground>
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // marginVertical: 250,
  },
  appLogo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    // color: "white"
  },
  description: {
    fontSize: 35,
    // marginBottom: 20,
    // marginTop: 20,
    marginLeft:50,
    marginRight:50,
     marginBottom: 20,
    textAlign: "justify",
    // color: "white"

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
  bgImage: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center"
  }

});