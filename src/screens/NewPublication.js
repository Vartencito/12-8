import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Linking, StyleSheet, Text, View, Button, Image, StatusBar, TextInput, ScrollView } from "react-native";
import "../img/ejemplo.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const NewPublication = props => {

  const IP = "192.168.0.130";
  const [name, setName] = useState([]);
  // const [url, setUrl] = useState([]);
  const [description, setDescription] = useState([]);
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [data, setData] = useState([])
  const [publication, setPublication] = useState([]);
  const [image, setImage] = useState(null);
  const [imgurImage, setImgurImage] = useState(null);

  useEffect(() => {
    const traerDatos = async () => {
      await getDataUser(user);
    }
    traerDatos();
    if (imgurImage != null) {
      const publicacion = {
        name: name,
        image: imgurImage,
        fkUser: data.Id,
        description: description
      }
      subirPublicacion(publicacion)
    }
  }, [publication, imgurImage])

  const subirPublicacion = async (publicacion) => {
    const res = await axios.post
      (
        `http://${IP}:4000/publicaciones`,
        publicacion,
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        },
      );
    alert('publicacion subida');
  }

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

  const toImgur = async (name) => {
    if (name.length < 1) {
      return alert('los campos nombre y url son obilgatorios, complételos')
    } else {
      console.log('imagen normal: ', image);
      const manipResult = await ImageManipulator.manipulateAsync(
        image,
        [],
        { compress: 1, base64: true }
      );
      const formData = new FormData();
      formData.append('image', manipResult.base64);
      formData.append('type', 'file');
      fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: "Client-ID 338d028975ccc94"
        },
        Authorization: "5eeae49394cd929e299785c8805bd168fc675280",
        body: formData
      }).then(response => response.json()).then(response => setImgurImage(response.data.link)
      )
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <>
      <View style={styles.cuadrado}>
        <Ionicons name="arrow-back" color="#fff" size={45} style={{ padding: 7 }} />
        <Ionicons name="notifications" color="#fff" size={35} style={{ padding: 7, paddingRight: 15, marginTop: 5 }} />
      </View>
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.picturee} source={image ? { uri: `${image}` } : require('../img/User.png')}/>
          <View style={styles.linea} >
            <Text style={{ marginLeft: 10, color: "#fff" }}>Select a photo ↓</Text>
            <View style={{ flexDirection: "column-reverse" }}>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Name"
          onChangeText={(value) => setName(value)} ></TextInput>
        <TextInput style={styles.input} placeholder="Description"
          onChangeText={(value) => setDescription(value)}></TextInput>
        <Button style={styles.boton} title="Search from gallery" color={"#9D2932"}
          onPress={pickImage}
          borderRadius={30} />
        <Button style={styles.boton} title="Submit" color={"#9D2932"}
          onPress={() => toImgur(name)}
          borderRadius={30} />
      </View>
    </>
  );
}

export default NewPublication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E49C7A",
    alignItems: "center",
  },
  picturee: {
    height: 400,
    width: 435,
    zIndex: 2
  },
  linea: {
    height: 23,
    width: 435,
    backgroundColor: "#9D2932"
  },
  cuadrado: {
    zIndex: 2,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: -60,
    width: 435,
    height: 60,
    backgroundColor: "#80341E",
    borderBottomWidth: 7,
    borderColor: "#9D2932"
  },
  input: {
    marginRight: 110,
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 60,
    width: 300,
    marginLeft: 120,
    textAlign: 'center'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#E49C7A'
  },

  boton: {
    backgroundColor: "#9D2932",
    borderRadius: 20,
  }
});

