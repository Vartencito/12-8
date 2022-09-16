import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const likesAndDislikes = props => {
    let iconName;

    return (
      <>   
        <View style={styles.container}>
        <Ionicons name="heart"/>
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
  });

export default likesAndDislikes;