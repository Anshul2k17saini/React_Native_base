import React from 'react';

const GetStarted = () => {

const getstartedbtn = () =>{
    props.navigation.navigate("Login");
}
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
};

export default GetStarted;