import React from "react";
import { StyleSheet, Text, View, Button, Image, useState, useEffect } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import User from "../img/User.png"
import { ScrollView } from "react-native-web";

const img = "../img/User.png";

const IP = "192.168.0.130"; 
const Profile = props => {

    return (
      <>
      
      <View style={styles.cuadrado}>
            <Ionicons name="arrow-back" color="#fff" size={35} style={{padding:7}}/>
            <View style={{flexDirection:"row"}}>
            <Ionicons name="add" color="#fff" size={35} style={{padding:7, paddingRight:"10%", marginTop:5 }}/>
            </View>
           </View> 
        <View style={styles.container}>
        <View style={{flexDirection: "row"}}>
          <Text style={styles.user}> Caitpivy </Text>
          <Ionicons name="create" color="#fff" size={35}/>
        </View>
          <Image source={require('../img/User.png') } style={styles.image} />
          <Text style={styles.occupation}>Designer</Text>

          <View style={{flexDirection: "row", textAlign: "center", marginTop: "5%"}}>
            <View style={styles.align}>
              <Text style={styles.numbers}>300</Text>
              <Text style={styles.numbers2}>Followers</Text>
            </View>
            <View>
            <Text style={styles.numbers}>300</Text>
            <Text style={styles.numbers2}>Followers</Text>
            </View>
            <View>
            <Text style={styles.numbers}>300</Text>
            <Text style={styles.numbers2}>Followers</Text>
            </View>

          </View>
          <Ionicons name="grid" color="#160F0A" size={35} style={{marginTop: "10%"}}/>        
          

          
        </View>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E49C7A",
      alignItems: "center",
      justifyContent: "center",
    },
    image:{
        width: "40%",
        height: "25%"
    },
    cuadrado:{
      justifyContent: "space-between",
      flexDirection:"row",
      marginTop: "5%",
      width:435,
      zIndex:2,
      height:60,
      backgroundColor: "#80341E",
      borderBottomWidth: 7,
      borderColor: "#9D2932",

    },
    user:{
      fontSize: 24 ,
      fontWeight: "bold",
      color: "#5C2211"
    },
    occupation:{
      color: "white",
      fontSize:16
    },
    numbers:{
      color: "white",
      fontWeight: "bold",
      fontSize:30 
    },
    numbers2:{
      color: "white",
      fontWeight: "bold",
      fontSize:18 
    },
    align:{
      textAlign: "center"
    }
  });

export default Profile;