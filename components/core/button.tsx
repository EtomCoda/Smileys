import React, { useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Link } from "expo-router";
type Props = {
  title: string;
  onPress?: any;
  color?: any;
  
};

const Button: React.FC<Props> = ({ title, color, onPress }) => {
  return (
   
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#2B8068" : color,
          },
          styles.button,
        ]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    
  );
};

const styles = StyleSheet.create({
  // button: {
  //   padding: 10,
  //   borderRadius: 15,
  //   borderWidth: 3,
  //   borderColor: "#FFFCF2",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 10,
  //   width: 100,
  // },
  button: {
    padding: 8,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#FFFCF2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    width: 150,
    height: 45,
   
    
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Button;
