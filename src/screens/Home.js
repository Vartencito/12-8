import React, {useEffect, useState, useContext} from "react";
import { StyleSheet, Text, View, Button, Image,TextInput } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import TokenContext from "../context/AuthContext";

//https://pbs.twimg.com/media/EtMyremWQAEcl08.jpg
const IP = "192.168.0.130"; 
const Home= (props) => {

const {token} = useContext(TokenContext);
const [publicacion, setPublicacion] = useState([]);
const [usuario, setUsuario] = useState([]);
// const [cantLikes, setCantLikes] = useState([]);
// const [cantDislikes, setCantDislikes] = useState([]);
// const [comentarios, setComentarios] = useState([]);

useEffect(() => {
    obtenerPublicacion();
    // obtenerUsuario(publicacion.fkUser);//fkuser
    // obtenerDislikes(publicacion.Id);//publication.id
    // obtenerLikes(publicacion.Id);//publication.id
    // obtenerComentarios(publicacion.Id);//publication.id
  },[]);
  
  const obtenerPublicacion = () => {
    axios.get(`http://192.168.0.130:4000/publicaciones`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('respuesta: ', res.data);
      setPublicacion(res.data)
      console.log('publicacion',publicacion);
    })
    .catch(err => console.log(err));
  }

  const obtenerUsuario = (fkUser) => {
    axios.get(`http://${IP}:4000/usuarios/${fkUser}`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('respuesta: ',res.data)
      setUsuario(res.data);
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
  
  // console.log('dislikes: ', cantDislikes)
  // console.log('likes: ', cantLikes)
  // console.log("resultado de la petición ",publicacion);
  // console.log(publicacion);
  // console.log(publicacion[1]);
  // console.log('foto de perfil: ', usuario.profilePicture)
  
  console.log('usuario afuera del map:  ', usuario)
  return (
    <>
        {
           
        }
            {/* <View style={styles.cuadrado}>
            <Ionicons name="ellipsis-vertical" color="#fff" size={35} style={{padding:7}}/>
            <View style={{flexDirection:"row"}}>
            <Ionicons name="funnel" color="#fff" size={35} style={{padding:7, paddingRight:"5%", marginTop:5 }}/>
            <Ionicons name="notifications" color="#fff" size={35} style={{padding:7, paddingRight:"10%", marginTop:5 }}/>
            </View>
           </View>


        <View style={styles.container}>
          <ScrollView>

          <View style={{flexDirection:"row", padding: 10}}>
          <Image style={styles.profilePic} source={{uri:`${usuario.profilePicture}`}}/>
          <View style= {{flexDirection:"column"}}>
          <View style= {{flexDirection: "row"}}> 
          <Text style={styles.username}> {usuario.username}</Text> 
          <Ionicons name="checkmark-circle" color="#26CBFF" size = {25} style={{marginTop: 8}}/>
          </View>
          <View style={{flexDirection:"row"}}>
          <Text style={{color:"#fff",   margin: 11}}>{usuario.occupation}</Text>
          <Text style={styles.follow}> Following </Text>
          </View>
          </View>
          </View>
          <Image style={styles.picture} source={{uri: publicacion.image}} 
           onPress={() => Linking.openURL('http//:localhost:3000/ImgDetail.js')}></Image>
          <View style={styles.likes}>
          <View style={{flexDirection:"row"}}>
          <Ionicons name="heart" color="#fff" size={35}/>
          <Text style={{color: "#fff", marginTop: 10, fontSize:17}}>{cantLikes.Likes}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
          <Ionicons name="heart-dislike" color="#fff" size={35} style={{marginLeft:60}}/>
          <Text style={{color: "#fff", marginTop: 10, fontSize:17}}>{cantDislikes.Dislikes}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
          <Ionicons name="chatbubble-ellipses" color="#fff" size={35} style={{marginLeft:60}}/>
          <Text style={{color: "#fff", marginTop: 10, fontSize:17}}>{comentarios.length}</Text>
          </View>
          </View>
          <Text style={{color: "#fff", marginLeft: 17, marginTop:10, fontSize: 16}}>{publicacion.description}</Text>
          <Text style={{justifyContent:"flex-start", color: "#fff", marginTop: 10, marginLeft: 15}}>{usuario.desc}</Text>
          <Text style={styles.fecha}>Se creó: {publicacion.created_at}</Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
      
          <View style={{flexDirection:"row", padding: 10}}>
          <Image style={styles.profilePic} source={{uri:`${usuario.profilePicture}`}}/>
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
          <Image style={styles.picture} source={{uri: publicacion.image}}/>
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
          <Text></Text>
          <Text></Text>
          <Text></Text>
     
          <View style={{flexDirection:"row", padding: 10}}>
          <Image style={styles.profilePic} source={{uri:`${usuario.profilePicture}`}}/>
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
          <Image style={styles.picture} source={{uri: publicacion.image}}/>
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
          <Text></Text>
          <Text></Text>
          <Text></Text>
      

           <TextInput style={styles.input} placeHolder="id"/>
          <Button
            onPress={() => useEffect(() => {
              obtenerPublicacion(TextInput.value);
              obetenerUsuario(TextInput.value);
            }
            ,[])}
            title="Buscar">
            </Button>    
            </ScrollView>

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
      }
  });

export default Home;