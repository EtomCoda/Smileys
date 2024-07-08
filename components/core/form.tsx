import { TextInput, StyleSheet, ScrollView,TouchableOpacity } from "react-native";
import { Text } from "../Themed";
import { View } from "../Themed";
import React from "react";
import { Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";


type Props = {
  caption1?: string;
  subcaption1?: string;
  caption2?: string;
  subcaption2?: string;
  caption3?: string;
  subcaption3?: string;
  caption4?: string;
  subcaption4?: string;
  caption5?: string;
  subcaption5?: string;
  multiline?: boolean;
  onChangeText1?: (text: string) => void;
  value1?: string;
  onChangeText2?: (text: string) => void;
  value2?: string;
  onChangeText3?: (text: string) => void;
  value3?: string;
  onChangeText4?: (text: string) => void;
  value4?: string;
  onChangeText5?: (text: string) => void;
  value5?: string;
  onDatePress?: () => void;
  onClinicDatePress?: () => void;
  clinicimage?: boolean;

}

const Form: React.FC<Props> = ({
  caption1, subcaption1, caption2, subcaption2, caption3, subcaption3,
  caption4, subcaption4, caption5, subcaption5, multiline,
  onChangeText1, value1, onChangeText2, value2,
  onChangeText3, value3, onChangeText4, value4,
  onChangeText5, value5,onDatePress, onClinicDatePress,clinicimage
}) => {



  return (
    <ScrollView style={styless.maincontainer}>
      <View style={styless.formmaincontainer}>
        <View style={styless.formgroups}>
          <View style={styless.formcontainer}>
            <Text style={styless.formcaption}>{caption1}</Text>
              <TextInput
                style={styless.forminput}
                placeholder={subcaption1}
                placeholderTextColor="#888"
                onChangeText={onChangeText1}
              value={value1}
              
              
            />
            {/* makes the image show on only the clinic date input  by assing a boolean prop*/}

            {clinicimage && (
                <TouchableOpacity onPress={onClinicDatePress} style={styless.calendarIcon2}>
                  <FontAwesome name="calendar" size={24} color="#888" />
                </TouchableOpacity>
              )}
           
          </View>
          <View style={styless.formcontainer}>
            <Text style={styless.formcaption}>{caption2}</Text>
            <TextInput
              style={styless.forminput}
              placeholder={subcaption2}
              placeholderTextColor="#888"
              multiline={multiline}
              onChangeText={onChangeText2}
              value={value2}
              
            />
          </View>
          <View style={styless.formcontainer}>
            <Text style={styless.formcaption}>{caption3}</Text>
            <TextInput
              style={styless.forminput}
              placeholder={subcaption3}
              placeholderTextColor="#888"
              multiline={multiline}
              onChangeText={onChangeText3}
              value={value3}
            />
          </View>
        </View>
        <View style={styless.formgroups2}>
          <View style={styless.formcontainer}>
            <Text style={styless.formcaption}>{caption4}</Text>
            <View style={styless.dobContainer}>
            <TextInput
              style={styless.forminput}
              placeholder={subcaption4}
              placeholderTextColor="#888"
              onChangeText={onChangeText4}
              value={value4}
            />
            <TouchableOpacity onPress={onDatePress} style={styless.calendarIcon}>
                <FontAwesome name="calendar" size={24} color="#888" />
            </TouchableOpacity>
            </View>
          </View>
          <View style={styless.formcontainer}>
            <Text style={styless.formcaption}>{caption5}</Text>
            <TextInput
              style={styless.forminput}
              placeholder={subcaption5}
              placeholderTextColor="#888"
              multiline={multiline}
              onChangeText={onChangeText5}
              value={value5}
            />
          </View>

          
        </View>
      </View>
    </ScrollView>
  );
}

const styless = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#FFD23F",
    padding: 23,
  

  },
  formmaincontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: 4,
    width: 350,
    height: 400,
    backgroundColor: "#FFD23F",
  },
  formgroups: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 10,
    backgroundColor: "#FFD23F",
  },
  formgroups2: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 10,
    paddingLeft:5,
    backgroundColor: "#FFD23F",
  },
  formcontainer: {
    backgroundColor: "#FFD23F",

  },
  formcaption: {
    color: "#35524A",
    fontWeight: "bold",
    marginTop: 1,
    fontSize:15
  },
  forminput: {
    borderRadius: 6,
    backgroundColor: "beige",
    borderWidth: 1.5,
    borderColor: "#35524A",
    padding: 5,
    marginVertical: Platform.OS === 'ios'?25:37,
    width: 150,
  },
  dobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FFD23F"

  },
  calendarIcon: {
    position: 'absolute',
    right: 30,
  },
  calendarIcon2: {
    position: 'absolute',
    right: 30,
    top:47,
  },

});

export default Form;
