import React from "react";
import { StyleSheet, Text, View, Button, Image, useState, useEffect } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";


const IP = "192.168.0.130"; 
const ImgDetail = props => {
  
  // const [publicacion, setPublicacion] = useState([]);

  
  // useEffect(() => {
  //     obtenerPublicacion();
  //   },[]);
  
  // const obtenerPublicacion = () => {
  //     axios.get(`http://${IP}:4000/publicaciones/7`)
  //     .then(res => {
  //     setPublicacion(res.data);
  // })
  // .catch(err => console.log(err));
  // }

    return (
      <>
        <View style={{backgroundColor: "#6e0a03" }}>
        <Ionicons name="arrow-back" color="#fff" size={50} style={{paddingRight:"5%", marginTop:"5%" }}/>
        </View>
        <View style={styles.container}>
        
        <Image style={styles.img} source={{uri:"https://pbs.twimg.com/media/EtMyremWQAEcl08.jpg"}}/>
        {/* <Image source={{uri:`${usuario.profilePicture}`}}/> */}
        
        <View style={{flexDirection:"row", marginLeft: "60%"}}>
        
          <Ionicons name="heart" color="#fff" size={50}/>
          <Ionicons name="heart-dislike" color="#fff" size={50} style={{marginLeft:"10%"}}/>
          </View>
        </View>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#6e0a03",
      alignItems: "center",
      justifyContent: "center",
    },
    img:{
        width: 400,
        height: 400
    }
  });

export default ImgDetail;