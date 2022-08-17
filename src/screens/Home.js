import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, Alert, TouchableOpacity } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

const IP = "192.168.0.130";

const Home = () => {

  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [publicacion, setPublicacion] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [cantLikes, setCantLikes] = useState([]);
  const [cantDislikes, setCantDislikes] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [likesFromUser, setLikesFromUser] = useState([]);
  const [dislikesFromUser, setDislikesFromuser] = useState([]);
  const [logedUser, setLogedUser] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    obtenerPublicacion();
    obtenerUsuario();
    obtenerLikes();
    obtenerDislikes();
    obtenerComentarios();
    obtenerLikesDelUser(user);
    obtenerDislikesDelUser(user);
    getDataFromLogedUser(user);
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

  const obtenerLikesDelUser = async (user) => {
    const res = await axios.post
      (
        `http://${IP}:4000/likesOrDislikes/likes/user`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        }
      ).then(response => {
        setLikesFromUser(response.data)
      }, error => {
        console.log(error)
      });
  }

  const obtenerDislikesDelUser = async (user) => {
    const res = await axios.post
      (
        `http://${IP}:4000/likesOrDislikes/dislikes/user`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        }
      ).then(response => {
        setDislikesFromuser(response.data)
      }, error => {
        console.log(error)
      });
  }

  const compararLikes = (publicacion, publicacionesVotadasPorUsuario) => {
    let like = false;
    for (let i = 0; i < publicacionesVotadasPorUsuario.length; i++) {
      if (publicacionesVotadasPorUsuario[i].Id == publicacion.Id) {
        return like = true;
        break;
      }
    }
  }

  const getDataFromLogedUser = (user) =>{
    axios.post(`http://${IP}:4000/usuarios/usuario`, 
    {
      username: user.username
    },
    {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setLogedUser(res.data)
      })
      .catch(err => console.log(err));
  }

  const darLike = async () => {
    const data = {
      fkUser: logedUser.Id,
      fkPublication: publicacion.Id
    }
    if (compararLikes(publicacion, likesFromUser)) {
      const res = await axios.delete(`http://${IP}:4000/likesOrDislikes`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest'
          },
          data
        })
      const actualizar = async () => obtenerLikes(); obtenerDislikes(); obtenerLikesDelUser(user); obtenerDislikesDelUser(user);
      await actualizar();
    }
    else {

      if (compararLikes(publicacion, dislikesFromUser)) {
        const res = await axios.put(`http://${IP}:4000/likesOrDislikes/likes`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        )
        const actualizar = async () => obtenerLikes(); obtenerDislikes(); obtenerLikesDelUser(user); obtenerDislikesDelUser(user);
        await actualizar();
      }
      else {
        const res = await axios.post(`http://${IP}:4000/likesOrDislikes/likes`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`
            }
          })
      }
      const actualizar = async () => obtenerLikes(); obtenerDislikes(); obtenerLikesDelUser(user); obtenerDislikesDelUser(user);
      await actualizar();
    }
  }

  const darDislike = async () => {
    const data = {
      fkUser: logedUser.Id,
      fkPublication: publicacion.Id
    }
    if (compararLikes(publicacion, dislikesFromUser)) {
      const res = await axios.delete(`http://${IP}:4000/likesOrDislikes`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
          },
          data
        },
      )
      const actualizar = async () => obtenerLikes(); obtenerDislikes(); obtenerLikesDelUser(user); obtenerDislikesDelUser(user);
      await actualizar();
    }
    else {
      if (compararLikes(publicacion, likesFromUser)) {
        const res = await axios.put(`http://${IP}:4000/likesOrDislikes/dislikes`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'X-Requested-With': 'XMLHttpRequest'
            }
          })
        const actualizar = async () => obtenerLikes(); obtenerDislikes(); obtenerLikesDelUser(user); obtenerDislikesDelUser(user);
        await actualizar();
      }
      else {
        const res = await axios.post(`http://${IP}:4000/likesOrDislikes/dislikes`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`
            }
          })
      }
      const actualizar = async () => obtenerLikes(); obtenerDislikes(); obtenerLikesDelUser(user); obtenerDislikesDelUser(user);
      await actualizar();
    }
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
          <TouchableOpacity  onPress={() => navigation.navigate('ImgDetail')}>
          <Image style={styles.picture} source={{ uri: publicacion.image }}></Image>
          </TouchableOpacity>
          <View style={styles.likes}>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <TouchableWithoutFeedback 
              onPress={darLike}
              >
                <Ionicons name="heart" color={compararLikes(publicacion, likesFromUser) ? '#ED4855' : '#fff'} size={35} />
              </TouchableWithoutFeedback>
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17, marginRight: 95 }}>{cantLikes.Likes ? cantLikes.Likes : 0}</Text>
              <TouchableWithoutFeedback 
              onPress={darDislike}
              >
                <Ionicons name="heart-dislike" color={compararLikes(publicacion, dislikesFromUser) ? '#ED4855' : '#fff'} size={35} />
              </TouchableWithoutFeedback>
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17, marginRight: 95 }}>{cantDislikes.Dislikes ? cantDislikes.Dislikes : 0}</Text>
              <TouchableWithoutFeedback>
                <Ionicons name="chatbubble-ellipses" color="#fff" size={35} />
              </TouchableWithoutFeedback>
              <Text style={{ color: "#fff", marginTop: 10, fontSize: 17, marginRight: 95 }}>{comentarios.length ? comentarios.length : 0}</Text>
            </View>
          </View>
          <Text style={{ color: "#fff", marginLeft: 17, marginTop: 10, fontSize: 16 }}>{publicacion.description}</Text>
          <Text style={{ justifyContent: "flex-start", color: "#fff", marginTop: 10, marginLeft: 15 }}>{usuario.desc}</Text>
          <Text style={styles.fecha}>Se creó: {publicacion.created_at}</Text>{/*TERMINA LA PUBLICACION*/}
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
    justifyContent: "space-around",
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
  }
});

