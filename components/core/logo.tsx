import { View } from "../Themed";
import { StyleSheet, Image } from "react-native";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo2.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, 
    paddingLeft: 10, 
    position: "absolute", 
    top: 0,
    left: 0,
    backgroundColor: "#FFD23F",
  },
  logo: {
    width: 100, 
    height: 79, 
    backgroundColor: "#FFD23F",
  },
});

export default Logo;
