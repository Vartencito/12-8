import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, Text, View, Pressable, TextInput, ImageBackground,ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { useMemo } from "react";


const img = "../img/LogIn.png";
const IP = "10.152.2.111"; 

const LogIn = ({navigation})=> {

 const {user, setUser} = useContext(UserContext);
 const {token, setToken} = useContext(TokenContext)
 const [username, setUsername] = useState('');
 const [contraseña, setContraseña] = useState('');

const getToken = async (user)=>{
  const body = {
    username: username,
    password: contraseña
  }
  setUser(body);
  const res = await axios.post
  (
    `http://${IP}:4000/usuarios/login`,
    body,
    {
      headers: {
          'Content-Type': 'application/json'
      }
    }     
  ).then(response => {
    if(response.data.token){
      setToken(response.data.token);
      navigation.navigate('Navbar');
    } else{
        alert(response.data)
    }
  },error =>{
    console.log(error)
  });
}

    return (
      <ImageBackground source={require('../img/LogIn.png')} resizeMode="cover" style={styles.image} >
        <View style={styles.container}>
        <View style={{paddingBottom: 25}}>
        <TextInput style={styles.input} placeholder="     User"
              onChangeText={(value) => setUsername(value)}
        />
        </View>  
        <View style={{paddingBottom: 25}}>
        <TextInput style={styles.input} placeholder="     Password" secureTextEntry={true}
              onChangeText={(value) => setContraseña(value)}
        />
        </View>
        <Pressable style={styles.button} title="Log in" borderRadius={30}
         onPress={() => {console.log(user);getToken(user)}}
        >
          <Text style={{color: '#733A26', fontWeight: 'bold'}}>
            Log In
          </Text>
        </Pressable>
            <TouchableOpacity 
             onPress={() => navigation.navigate('Register')}
            >
          <Text style={styles.texto}>No tengo cuenta</Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row", marginTop: 100}}>
            <Ionicons name="logo-facebook" color="#fff" size={70} style={{padding:7}}/>
            <Ionicons name="logo-google" color="#fff" size={70} style={{padding:7, paddingRight:15, marginTop:5 }}/>
            <Ionicons name="logo-apple" color="#fff" size={70} style={{padding:7, paddingRight:15, marginTop:5 }}/>
          </View>
        </View>
        </ImageBackground>
    );
  }

export default LogIn;
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 350,
      flex: 1,
      backgroundImage: "#000000",
      alignItems: "center",
      justifyContent: "center",
    },
    input:{
      backgroundColor: "#F4F3F1",
      marginRight:110,
      borderRadius:14,
     height:60,
     width: 300,
     marginLeft: 120,
    },
    button:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#F6E2D3',
    height: '15%',
    width: '35%',
      
    },image: {
      height: '100%',
      width: '100%',
      flex: 1,
      justifyContent: "center"
    },
    texto:{
      marginTop: "3%",
      color: "#FFF",
      fontSize:   20,
      fontWeight: "bold"
    }
    
  });

