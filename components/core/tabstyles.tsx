import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    borderline: {
      borderBottomWidth: 1,
      borderColor: "#35524A",
      borderStyle: "solid",
      width: "80%",
      marginVertical: 20,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFD23F",
    },
    title: {
      textAlign: "center",
      fontSize: 45,
      fontWeight: "bold",
      color: "#35524A",
      fontFamily: "HammersmithOne-Regular",
      width: "100%",
      paddingTop: 100,
      marginLeft: 10,
    },
  
    subtitle: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      color: "#35524A",
      fontFamily: "HammersmithOne-Regular",
    },
    positionbutton: {
      flex: 0.3,
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingRight: 20,
      backgroundColor: "#FFD23F",
      width: 360,
    },
    
    button: {
     
      backgroundColor: "#FFD23F",
    },
  
    separator: {
      marginVertical: 8,
      height: 1,
      width: "80%",
    },
  });
  
  export default styles