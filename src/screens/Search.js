import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, StatusBar, Alert, TouchableOpacity, FlatList, RefreshControl, TextInput } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create({
    cuadrado: {
        justifyContent: "flex-start",
        marginTop: "10%",
        width: 435,
        zIndex: 2,
        height: "6%",
        backgroundColor: "#80341E",
        borderBottomWidth: 7,
        borderColor: "#9D2932",
        },
        picture: {
            width: "100%",
            height: "100%"
          },
        input:{
            backgroundColor: "#fff",
            borderRadius: 20,
            width: "75%",
            height: 25,
            marginTop: "1.5%",


        },
        
        app: {
            flex: 4, // the number of columns you want to devide the screen into
            marginHorizontal: "auto",
            backgroundColor: "#E49C7A",
          },
          "1col":  {
            backgroundColor:  "lightblue",
            borderColor:   "#E49C7A",
            borderWidth:  4,
            flex:  1,
            width: 300,
            height: 200,
          },
          "2col":  {
            backgroundColor:  "green",
            borderColor:   "#E49C7A",
            borderWidth:  4,
            flex:  2,
            width: 100,
            height: 200,
          },
          "3col":  {
            backgroundColor:  "orange",
            borderColor:   "#E49C7A",
            borderWidth:  4,
            flex:  3
          },
          "4col":  {
            flex:  4
          }
    });






const Col = ({ numRows, children }) => {
    return  (
      <View style={styles[`${numRows}col`]}>{children}</View>
    )
  }

const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
  )

export default function Search() {
  return (
    <>
        <View style={styles.cuadrado}>
        <View style={{flexDirection: "row"}}>
        <Ionicons name="search" color="#fff" size={20} style={{ padding: "2%" }} />
        <TextInput style={styles.input} placeholder="  What'r you looking for?"/>
        <Ionicons name="funnel" color="#fff" size={20} style={{ padding: "2%", marginLeft: "1.5%" }} />
        </View>
        </View>
    

    <View style={styles.app}>
        <View style={{flexDirection: "row"}}>
        <Row>
        <Col numRows={2}>
          <Image style={styles.picture} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkXyrlZ0fhWrBU5NgEAGOzcccYdTMavNLsO0V9LSe&s"}}/>
        </Col>
        <Col numRows={2}>
        <Image style={styles.picture} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkXyrlZ0fhWrBU5NgEAGOzcccYdTMavNLsO0V9LSe&s"}}/>
        </Col>
        </Row>
        {/* <View style={{flexDirection: "row"}}> */}
        
        <Col numRows={1}>
        </Col>
        <Col numRows={3}>
        {/* <Image style={styles.picture} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa8556B4ZPNGRnCMC_kHLi6UkP1VeZyIdKS1ud2Ni4&s"}}/> */}
          <Text>Second Column</Text>
        </Col>
        {/* </View> */}
        
        </View>
        
    </View>    
    </>
  )
}
