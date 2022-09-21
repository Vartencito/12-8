import React from "react";
import { StyleSheet, View, Image, Text, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Comments = ({navigation}) => {
  
    return (
      <>
        <View style={styles.container}>
            <Text>TTTTT</Text>
          <View style={styles.cuadrado}>
            <TextInput style={styles.input} placeholder="Write your comment"/>
            <Ionicons name="send" color="#fff" size={35} style={{ padding: "2%", marginLeft: "4%" }} />
          </View>
        </View>
      </>
    );
  }
  
  export default Comments;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E49C7A",

    },
    img:{
        width: 500,
        height: "100%"
    },
    input:{
      color: "#fff",
      backgroundColor: "#fff",
      fontSize: 17,
      width: "80%",
      height: "50%",
      borderRadius: 20,        
      marginLeft: "2%"
    },
    cuadrado: {
      backgroundColor: "#9D2932",
      height: "9%",
      marginTop: "160%",
      flexDirection: "row",
      alignItems: "center",
    
    }
  });