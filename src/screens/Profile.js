import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, RefreshControl, ScrollView, Dimensions, FlatList } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserContext from "../context/UserContext";
import TokenContext from "../context/AuthContext";
import PublicationInProfile from "../components/PublicationInProfile";

const Profile = ({ navigation }) => {

  const IP = '192.168.0.130';
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext)
  const [data, setData] = useState([]);
  const [dataPublication, setDataPublication] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getDataUser(user);
    if (data !== null) {
      getDataPublication(user);
    }
  }, [user]);

  const getDataUser = async (user) => {
    const res = await axios.post
      (
        `http://${IP}:4000/usuarios/usuario`,
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        setData(response.data)
      }, error => {
        console.log(error)
      });
  }

  const getDataPublication = async (user) => {
    const res = await axios.post
      (
        `http://${IP}:4000/publicaciones/username`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        }
      ).then(response => {
        console.log('esta es la respuesta', response.data)
        setDataPublication(response.data)
      }, error => {
        console.log(error)
      });
  }

  const onRefresh = async () => {
    getDataUser(user);
    getDataPublication(user);
    setRefreshing(false);
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <>
      <View style={styles.cuadrado}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" color="#fff" size={35} style={{ padding: 7 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewPublication')}
          >
            <Ionicons name="add" color="#fff" size={35} style={{ padding: 7, paddingRight: "10%", marginTop: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.user}> {data.username} </Text>
          <Ionicons name="create" color="#fff" size={35} />
        </View>
        <Image source={data.profilePicture ? { uri: data.profilePicture } : require('../img/User.png')} style={styles.image} />
        <Text style={styles.occupation}>{data.occupation}</Text>
        <View style={{ flexDirection: "row", textAlign: "center", marginTop: "5%" }}>
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
        <Ionicons name="grid" color="#160F0A" size={35} style={{ marginTop: "10%" }} />
        {
          <FlatList
            data={dataPublication}
            numColumns={2}
            key={dataPublication.id}
            contentContainerStyle={styles.contenedorDePublicaciones}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              onRefresh();
            }}
            renderItem={({ item }) => (
              <PublicationInProfile url={item.image} />
            )}
          />
        }
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
  image: {
    width: "45%",
    height: "25%",
    borderRadius: 200
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
  user: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C2211"
  },
  occupation: {
    color: "white",
    fontSize: 16
  },
  numbers: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30
  },
  numbers2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  align: {
    textAlign: "center"
  },
  contenedorDePublicaciones: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  publicacion: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').height / 5,
  }
});

export default Profile;