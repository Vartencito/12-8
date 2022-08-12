import React, {useEffect, useState, useContext, ScrollView} from "react";
import { StyleSheet, Text, View, Button, Image,TextInput, SafeAreaView, FlatList } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import TokenContext from "../context/AuthContext";

//https://pbs.twimg.com/media/EtMyremWQAEcl08.jpg
const IP = "10.152.2.140"; 
const Home= (props) => {

const {token} = useContext(TokenContext);
const [publicacion, setPublicacion] = useState([]);
const [usuario, setUsuario] = useState([]);
const [cantLikes, setCantLikes] = useState([]);
const [cantDislikes, setCantDislikes] = useState([]);
const [comentarios, setComentarios] = useState([]);


useEffect(() => {
    obtenerPublicacion();
    obtenerUsuario(publicacion[0].fkUser)
  },[]);
  
  const obtenerPublicacion = () => {
    axios.get(`http://${IP}:4000/publicaciones`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('respuesta: ', res.data);
      setPublicacion(res.data)
    })
    .catch(err => console.log(err));
  }

  const obtenerUsuario = (publicacion) => {
    axios.get(`http://${IP}:4000/usuarios/${publicacion}`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setUsuario(res.data)
    })
    .catch(err => console.log(err));
  }
  
  const obtenerLikes = (publicationId) => {
    axios.get(`http://${IP}:4000/publicaciones/Likes/${publicationId}`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setCantLikes(res.data);
      console.log('estos son los likes: ',res.data)
    })
    .catch(err => console.log(err));
  }
  
  const obtenerDislikes = (publicationId) => {
    axios.get(`
    http://${IP}:4000/publicaciones/Disikes/${publicationId}`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setCantDislikes(res.data);
      console.log('estos son los Dislikes: ',res.data)
    })
    .catch(err => console.log(err));
  }

  const obtenerComentarios = (publicationId) => {
    axios.get(`
    http://${IP}:4000/comentarios/publicacion/${publicationId}`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setComentarios(res.data);
      console.log('estos son los comentarios: ', res.data.length)
    })
    .catch(err => console.log(err));
  }
  
  console.log('usuario',usuario)

  return (

    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={publicacion}
          renderItem={({item})=>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.usuario}</Text>
              <Image source={{uri: `${item.image}`}} style={{width: 160, height: 150}}/>
            </View>
          }
          keyExtractor={publicacion => publicacion.Id}
        />
      </SafeAreaView>

      {/* <View style={styles.container}>
        <View style={{flexDirection:"row", padding: 10}}>
        <Image style={styles.profilePic} source={{uri:${usuario.profilePicture}}}/>
        <View style= {{flexDirection:"column"}}>
        <View style= {{flexDirection: "row"}}> 
        <Text style={styles.username}> {usuario.name}</Text> 
        <Ionicons name="checkmark-circle" color="#26CBFF" size = {25} style={{marginTop: 8}}/>
        </View>
        <View style={{flexDirection:"row"}}>
        <Text style={{color:"#fff",   margin: 11}}>{usuario.occupation}</Text>
        <Text style={styles.follow}> Following </Text>
        </View>
        </View>
        </View>
        <Image style={styles.picture} source={{uri: publicacion.image}}
          onPress={()=>{navigation.navigate('ImgDetail')}}
        />
        <View style={styles.likes}>
        <View style={{flexDirection:"row"}}>
        <Ionicons name="heart" color="#fff" size={35}/>
        <Text style={{color: "#fff", marginTop: 10, fontSize:17}}>489</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <Ionicons name="heart-dislike" color="#fff" size={35} style={{marginLeft:60}}/>
        <Text style={{color: "#fff", marginTop: 10, fontSize:17}}>489</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <Ionicons name="chatbubble-ellipses" color="#fff" size={35} style={{marginLeft:60}}/>
        <Text style={{color: "#fff", marginTop: 10, fontSize:17}}>489</Text>
        </View>
        </View>
        <Text style={{color: "#fff", marginLeft: 17, marginTop:10, fontSize: 16}}>{usuario.description}</Text>
        <Text style={{justifyContent:"flex-start", color: "#fff", marginTop: 10, marginLeft: 15}}>{usuario.desc}</Text>
        <Text style={styles.fecha}>Se creó: {publicacion.created_at}</Text>
        </View> */}
        </>
    );

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E49C7A",
      justifyContent: "center",
    },
    picture:{
      width: 435,
      height: 500
    },

    input : {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },

    username:{
      fontWeight: "bold",
      color: "#fff",
      justifyContent: "flex-start",
      fontSize: 20,
      margin: 7,
      marginTop:10,
    },
    likes:{
      marginTop:5,
      flexDirection:"row",
      marginLeft: 10,

    },
    profilePic:{
      borderRadius:100,
      borderColor: "#9D2932",
        height: 70,
        width: 70,
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
    fecha:{
      color:"#fff",
      fontSize: 10,
      marginLeft: 17,
      fontWeight: "bold"
    },
    follow:{
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#C4C4C4",
      borderRadius: 5,
      marginTop: 20,
      justifyContent: "space-evenly",
      marginLeft: 140
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
  });

export default Home;