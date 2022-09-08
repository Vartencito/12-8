import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, Alert, TouchableOpacity, FlatList,  RefreshControl } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";


const IP = "10.144.1.13";
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Home = () => {

  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [publicacion, setPublicacion] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [likesFromUser, setLikesFromUser] = useState([]);
  const [dislikesFromUser, setDislikesFromuser] = useState([]);
  const [logedUser, setLogedUser] = useState([]);
  const [allDataPublications, setallDataPublications] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  
  const navigation = useNavigation();

  
  useEffect(() => {
    const traerData = async () => {
      // await obtenerUsuario();
      await obtenerLikesDelUser(user);
      await obtenerDislikesDelUser(user);
      await getDataFromLogedUser(user);
      await getAllDataFromPublication();
    }
    traerData();
  }, []);

  const obtenerPublicaciones = async () => {
    await axios.get(`http://${IP}:4000/publicaciones/get`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setPublicaciones(res.data)
      })
      .catch(err => console.log(err));
  }

  const obtenerUsuarios = async () => {
    let users = [];
    for (let i = 0; i < publicaciones.length; i++) {
      await axios.get(`http://${IP}:4000/usuarios/${publicaciones[i].fkUser}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }).then(res => {
        users.push(res.data)
        setUsuarios(users)
      })
        .catch(err => console.log(err));
    }
  }

  const obtenerPublicacion = async () => {
    await axios.get(`http://${IP}:4000/publicaciones/7`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setPublicacion(res.data)
      })
      .catch(err => console.log(err));
  }

  const obtenerUsuario = async () => {
    await axios.get(`http://${IP}:4000/usuarios/2`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setUsuario(res.data)
      })
      .catch(err => console.log(err));
  }

  const obtenerLikes = async () => {
    await axios.get(`http://${IP}:4000/publicaciones/Likes/7`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setCantLikes(res.data);
      })
      .catch(err => console.log(err));
  }

  const obtenerDislikes = async () => {
    await axios.get(`
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

  const obtenerComentarios = async () => {
    await axios.get(`
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

  const getDataFromLogedUser = async () => {
    console.log('a', user);
    await axios.post(`http://${IP}:4000/usuarios/usuario`,
      {
        username: user.username
      },
      {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        console.log('res.data', res);
        setLogedUser(res.data)
      })
      .catch(err => console.log(err));
  }

  const darLike = async (publicacion) => {
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

  const getAllDataFromPublication = async () => {
    await axios.get(`http://${IP}:4000/publicaciones`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setallDataPublications(res.data)
      })
      .catch(err => console.log(err));
  }

  const updateToLike = async (data) => {
    console.log('data que me llego: ',data)
    await axios.put(`http://${IP}:4000/likesOrDislikes/likes`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      },
    )
    await obtenerLikesDelUser(user);
    await obtenerDislikesDelUser(user);
    await getAllDataFromPublication();
  }

  const insertLike = async (data) =>{
    console.log(data);
    const res = await axios.post(`http://${IP}:4000/likesOrDislikes/likes`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      })
    await obtenerLikesDelUser(user);
    await obtenerDislikesDelUser(user);
    await getAllDataFromPublication();
  }

  const deleteLike = async (data) =>{
    const res = await axios.delete(`http://${IP}:4000/likesOrDislikes`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        },
        data
      })
    await obtenerLikesDelUser(user);
    await obtenerDislikesDelUser(user);
    await getAllDataFromPublication();
  }

  const updateToDislike = async (data) => {
    console.log('data que me llego: ',data)
    await axios.put(`http://${IP}:4000/likesOrDislikes/dislikes`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      },
    )
    await obtenerLikesDelUser(user);
    await obtenerDislikesDelUser(user);
    await getAllDataFromPublication();
  }

  const insertDislike = async (data) =>{
    const res = await axios.post(`http://${IP}:4000/likesOrDislikes/dislikes`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      })
    await obtenerLikesDelUser(user);
    await obtenerDislikesDelUser(user);
    await getAllDataFromPublication();
  }

  const deleteDislike = async (data) =>{
    const res = await axios.delete(`http://${IP}:4000/likesOrDislikes`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        },
        data
      })
    await obtenerLikesDelUser(user);
    await obtenerDislikesDelUser(user);
    await getAllDataFromPublication();
  }

  console.log('estos son los datos: ', allDataPublications);

  return (
    <>

      <View style={styles.cuadrado}>
        <Ionicons name="ellipsis-vertical" color="#fff" size={35} style={{ padding: 10 }} />
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="funnel" color="#fff" size={35} style={{ padding: 7, paddingRight: "5%", marginTop: 5 }} />
          <Ionicons name="notifications" color="#fff" size={35} style={{ padding: 7, paddingRight: "10%", marginTop: 5 }} />
        </View>
      </View>

  <RefreshControl
 refreshing={refreshing}
 onRefresh={onRefresh}
/>
      <View style={styles.container}>
      <ScrollView
      ontentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
        <FlatList
          data={allDataPublications}
          key={(item) => item.id}
          renderItem={({ item }) =>
            <>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Image style={styles.profilePic} source={item.profilePicture ? {uri: `${item.profilePicture}`}: require('../img/User.png')} />
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.username}> {item.Username}</Text>
                    <Ionicons name="checkmark-circle" color="#26CBFF" size={25} style={{ marginTop: 8 }} />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "#fff", margin: 11 }}>{item.occupation}</Text>
                    <Text style={styles.follow}> Following </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ImgDetail',{foto: item.image})}>
                <Image style={styles.picture} source={{ uri: item.image }}></Image>
              </TouchableOpacity>
              <View style={styles.likes}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <TouchableWithoutFeedback
                    onPress={async () => {
                      const data = {
                        fkUser: logedUser.Id,
                        fkPublication: item.Id
                      }
                      if (compararLikes(item, likesFromUser)) {
                        console.log('estos en el primer if');
                        await deleteLike(data);
                      }
                      else {
                        if (compararLikes(item, dislikesFromUser)) {
                          console.log('estos en el segudno if');
                          await updateToLike(data);
                        }
                        else {
                          console.log('estoy en el primer else');
                          await insertLike(data);
                        }
                      }
                    }}
                  >
                    <Ionicons name="heart" color=
                      {compararLikes(item, likesFromUser) ? '#ED4855' : '#fff'}
                      size={35} />
                  </TouchableWithoutFeedback>
                  <Text style={{ color: "#fff", marginTop: 10, fontSize: 17, marginRight: 95 }}>{item.likes ? item.likes : 0}</Text>
                  <TouchableWithoutFeedback
                  onPress={async () => {
                    const data = {
                      fkUser: logedUser.Id,
                      fkPublication: item.Id
                    }
                    if (compararLikes(item, dislikesFromUser)) {
                      await deleteDislike(data);
                    }
                    else {
                      if (compararLikes(item, likesFromUser)) {
                        await updateToDislike(data);
                      }
                      else {
                        await insertDislike(data);
                      }
                    }
                  }}
                  >
                    <Ionicons name="heart-dislike" color=
                      {compararLikes(item, dislikesFromUser) ? '#ED4855' : '#fff'}
                      size={35} />
                  </TouchableWithoutFeedback>
                  <Text style={{ color: "#fff", marginTop: 10, fontSize: 17, marginRight: 95 }}>{item.dislikes ? item.dislikes : 0}</Text>
                  <TouchableWithoutFeedback>
                    <Ionicons name="chatbubble-ellipses" color="#fff" size={35} />
                  </TouchableWithoutFeedback>
                  <Text style={{ color: "#fff", marginTop: 10, fontSize: 17, marginRight: 95 }}>{item.comments ? item.comments : 0}</Text>
                </View>
              </View>
              <Text style={{ color: "#fff", marginLeft: 17, marginTop: 10, fontSize: 16 }}>{item.description}</Text>
              <Text style={styles.fecha}>Se creó: {item.created_at}</Text>
            </>
          }
        />
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

