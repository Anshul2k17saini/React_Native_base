import { Text, View, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import Btn from './Btn';
import { darkGreen } from './Constant';

export default function Home(props) {

  const getstartedbtn = () => {
    //props.navigation.navigate("Login");
    props.navigation.navigate("Welcome");
  }
  return (
    // <View style={styles.container}>
      <ImageBackground  source={require('./assets/purple.png')} resizeMode="cover" style={styles.bgImage}>
        <View style={{ flex: 1, width:'100%',height: '100%'}}>
          <View style={{ alignItems: "center", paddingTop: 150, paddingBottom: 100 }}>
            <Text style={{ fontSize: 60 }}>TravelITR</Text>
            <View>
              <Image style={{height: 150, width: 150, marginTop: 50}} source={require('./assets/travel.png')} />
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.description}>Feeling lost in trip planning? Let's turn confusion into excitement! 🌍✨ Plan your adventure effortlessly with us.</Text>
              <Text></Text>
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
    fontSize: 20,
    marginLeft: 30,
    marginRight: 30,
    textAlign: "center",
    color: "black",
    lineHeight: 30,  // Adjust line height for better readability

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
    alignItems: "center",
    width:'100%',
    height:'100%'
  }

});