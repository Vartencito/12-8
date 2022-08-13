import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import TokenContext from "../context/AuthContext";

const IP = "192.168.0.130";

const Home = () => {

  const { token } = useContext(TokenContext);
  const [publicacion, setPublicacion] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [cantLikes, setCantLikes] = useState([]);
  const [cantDislikes, setCantDislikes] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    obtenerPublicacion();
    obtenerUsuario();
    obtenerLikes();
    obtenerDislikes();
    obtenerComentarios();
  }, []);

  const obtenerPublicacion = () => {
    axios.get(`http://${IP}:4000/publicaciones/7`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setPublicacion(res.data)
      })
      .catch(err => console.log(err));
  }

  const obtenerUsuario = () => {
    axios.get(`http://${IP}:4000/usuarios/2`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setUsuario(res.data)
      })
      .catch(err => console.log(err));
  }

  const obtenerLikes = () => {
    axios.get(`http://${IP}:4000/publicaciones/Likes/7`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setCantLikes(res.data);
      })
      .catch(err => console.log(err));
  }

  const obtenerDislikes = () => {
    axios.get(`
    http://${IP}:4000/publicaciones/Disikes/7`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setCantDislikes(res.data);
      })
      .catch(err => console.log(err));
  }

  const obtenerComentarios = () => {
    axios.get(`
    http://${IP}:4000/comentarios/publicacion/7`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setComentarios(res.data);
      })
      .catch(err => console.log(err));
  }


  return (
    <>
      <View style={styles.cuadrado}>
        <Ionicons name="ellipsis-vertical" color="#fff" size={35} style={{ padding: 10 }} />
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="funnel" color="#fff" size={35} style={{ padding: 7, paddingRight: "5%", marginTop: 5 }} />
          <Ionicons name="notifications" color="#fff" size={35} style={{ padding: 7, paddingRight: "10%", marginTop: 5 }} />
        </View>
      </View>

      <View style={styles.container}>
        <ScrollView>

          <View style={{ flexDirection: "row", padding: 10 }}>{/*EMPIEZA LA PUBLICACION*/}
            <Image style={styles.profilePic} source={{ uri: `${usuario.profilePicture}` }} />
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.username}> {usuario.username}</Text>
                <Ionicons name="checkmark-circle" color="#26CBFF" size={25} style={{ marginTop: 8 }} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#fff", margin: 11 }}>{usuario.occupation}</Text>
                <Text style={styles.follow}> Following </Text>
              </View>
            </View>
          </View>
          <Image style={styles.picture} source={{ uri: publicacion.image }}
            onPress={() => Linking.openURL('http//:localhost:3000/ImgDetail.js')}></Image>
          <View style={styles.likes}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="heart" color="#fff" size={35} />
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17 }}>{cantLikes.Likes ? cantLikes.Likes : 0}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="heart-dislike" color="#fff" size={35} style={{ marginLeft: 60 }} />
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17 }}>{cantDislikes.Dislikes ? cantDislikes.Dislikes : 0}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="chatbubble-ellipses" color="#fff" size={35} style={{ marginLeft: 60 }} />
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17 }}>{comentarios.length ? comentarios.length : 0}</Text>
            </View>
          </View>
          <Text style={{ color: "#fff", marginLeft: 17, marginTop: 10, fontSize: 16 }}>{usuario.description}</Text>
          <Text style={{ justifyContent: "flex-start", color: "#fff", marginTop: 10, marginLeft: 15 }}>{usuario.desc}</Text>
          <Text style={styles.fecha}>Se creó: {publicacion.created_at}</Text>{/*TERMINA LA PUBLICACION*/}
          <Text></Text>
          <Text></Text>
          <Text></Text>

          <View style={{ flexDirection: "row", padding: 10 }}>
            <Image style={styles.profilePic} source={{ uri: `${usuario.profilePicture}` }} />
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.username}> {usuario.name}</Text>
                <Ionicons name="checkmark-circle" color="#26CBFF" size={25} style={{ marginTop: 8 }} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#fff", margin: 11 }}>{usuario.occupation}</Text>
                <Text style={styles.follow}> Following </Text>
              </View>
            </View>
          </View>
          <Image style={styles.picture} source={{ uri: publicacion.image }} />
          <View style={styles.likes}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="heart" color="#fff" size={35} />
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17 }}>489</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="heart-dislike" color="#fff" size={35} style={{ marginLeft: 60 }} />
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17 }}>489</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="chatbubble-ellipses" color="#fff" size={35} style={{ marginLeft: 60 }} />
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17 }}>489</Text>
            </View>
          </View>
          <Text style={{ color: "#fff", marginLeft: 17, marginTop: 10, fontSize: 16 }}>{usuario.description}</Text>
          <Text style={{ justifyContent: "flex-start", color: "#fff", marginTop: 10, marginLeft: 15 }}>{usuario.desc}</Text>
          <Text style={styles.fecha}>Se creó: {publicacion.created_at}</Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>

          <View style={{ flexDirection: "row", padding: 10 }}>
            <Image style={styles.profilePic} source={{ uri: `${usuario.profilePicture}` }} />
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.username}> {usuario.name}</Text>
                <Ionicons name="checkmark-circle" color="#26CBFF" size={25} style={{ marginTop: 8 }} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#fff", margin: 11 }}>{usuario.occupation}</Text>
                <Text style={styles.follow}> Following </Text>
              </View>
            </View>
          </View>
          <Image style={styles.picture} source={{ uri: publicacion.image }} />
          <View style={styles.likes}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="heart" color="#fff" size={35} />
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17 }}>489</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="heart-dislike" color="#fff" size={35} style={{ marginLeft: 60 }} />
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17 }}>489</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="chatbubble-ellipses" color="#fff" size={35} style={{ marginLeft: 60 }} />
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17 }}>489</Text>
            </View>
          </View>
          <Text style={{ color: "#fff", marginLeft: 17, marginTop: 10, fontSize: 16 }}>{usuario.description}</Text>
          <Text style={{ justifyContent: "flex-start", color: "#fff", marginTop: 10, marginLeft: 15 }}>{usuario.desc}</Text>
          <Text style={styles.fecha}>Se creó: {publicacion.created_at}</Text>

        </ScrollView>

      </View>
    </>

  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: "#E49C7A",
    justifyContent: "center",
  },
  picture: {
    width: 435,
    height: 500
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    color: "#fff",
    justifyContent: "flex-start",
    fontSize: 20,
    margin: 7,
    marginTop: 10,
  },
  likes: {
    marginTop: 5,
    flexDirection: "row",
    marginLeft: 10,
  },
  profilePic: {
    borderRadius: 100,
    borderColor: "#9D2932",
    height: 70,
    width: 70,
  },
  cuadrado: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "10%",
    width: 435,
    zIndex: 2,
    height: 60,
    backgroundColor: "#80341E",
    borderBottomWidth: 7,
    borderColor: "#9D2932",
  },
  fecha: {
    color: "#fff",
    fontSize: 10,
    marginLeft: 17,
    fontWeight: "bold"
  },
  follow: {
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

