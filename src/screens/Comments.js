import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

const Comments = (props) => {
  const IP = "192.168.0.130";
  const { navigation, route } = props;
  const { Id } = route.params;
  const { token } = useContext(TokenContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const [logedUser, setLogedUser] = useState([]);

  useEffect(() => {
    getComments();
    getDataFromLogedUser();
  }, []);

  const getComments = async () => {
    await axios
      .get(`http://${IP}:4000/comentarios/publicacion/${Id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataFromLogedUser = async () => {
    await axios
      .post(
        `http://${IP}:4000/usuarios/usuario`,
        {
          username: user.username,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLogedUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addComment = async () => {
    const comentario = {
      text: comment,
      fkPublication: Id,
      fkUser: logedUser.Id,
    };
    await axios
      .post(`http://${IP}:4000/comentarios`, comentario, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        getComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        {comments.length === 0 ? (
          <Text>No hay comentarios</Text>
        ) : (
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <View style={styles.containerComments}>
                <Image
                  source={
                    item.profilePicture
                      ? { uri: `${item.profilePicture}` }
                      : require("../img/User.png")
                  }
                  style={styles.profilePicture}
                />
                <View style={styles.containerText}>
                  <Text style={{ fontSize: 20 }}>{item.username}</Text>
                  <Text style={{ paddingTop: 5, width: "100%" }}>
                    {item.text}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.Id}
          />
        )}
        <View style={styles.cuadrado}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Write your comment"
              onChangeText={(value) => setComment(value)}
            />
            <Ionicons
              name="send"
              color="#fff"
              size={35}
              style={{ padding: "2%", marginLeft: "4%" }}
              onPress={() => addComment()}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E49C7A",
  },
  img: {
    width: 500,
    height: "100%",
  },
  input: {
    color: "black",
    backgroundColor: "#fff",
    fontSize: 17,
    width: "80%",
    height: "50%",
    borderRadius: 20,
    padding: 7,
    margin: 8,
  },
  cuadrado: {
    backgroundColor: "#9D2932",
    height: "auto",
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
    width: "100%",
  },
  containerComments: {
    backgroundColor: "#E49C7A",
    padding: 15,
    borderColor: "#9D2932",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  containerText: {
    flexDirection: "column",
    marginLeft: "5%",
  },
  profilePicture: {
    borderRadius: 100,
    borderColor: "#9D2932",
    height: 70,
    width: 70,
  },
});
