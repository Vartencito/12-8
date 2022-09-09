import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity,  RefreshControl } from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserPFP from "../img/User.png"
import { ScrollView } from "react-native-web";
import UserContext from "../context/UserContext";
import TokenContext from "../context/AuthContext";

const IP = '10.152.2.116';

const Profile = ({ navigation }) => {

  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext)
  const [data, setData] = useState([]);
  const [dataPublication, setDataPublication] = useState([]);

  useEffect(() => {
    getDataUser(user);
  }, []);

  useEffect(() => {
    getDataPublication(user);
  }, [])



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

  console.log(dataPublication);

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
  }
});

export default Profile;