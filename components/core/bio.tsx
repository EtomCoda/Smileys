import { KeyboardAvoidingView, Platform,Button as RNButton } from "react-native";
import { Text, View } from "@/components/Themed";
import Form from "@/components/core/form";
import Logo from "@/components/core/logo";
import Button from "@/components/core/button";
import styles from "./tabstyles";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { createTable,db } from "./db";
import { router } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Bio() {
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    createTable();
 
  }, []);

 
//saving data
  const saveData = async () => {
    if (firstname.length == 0 || middlename.length == 0 || lastname.length == 0 ||
      dob.length == 0 || address.length == 0) {
      Alert.alert("Please fill in all fields.Use 'none' where nothing applies")
    } else {
      try {
        (await db).transaction(async (tx) => {
          await tx.executeSql(
            "INSERT INTO Patients (firstname, middlename, lastname, dateOfBirth, address) VALUES (?, ?, ?, ?, ?)",
            [firstname, middlename, lastname, dob, address]
          );
        });
        console.log("Data saved successfully");

        setFirstName("");
        setMiddleName("");
        setLastName("");
        setDob("");
        setAddress("");

        router.push('/two');
      } catch (error) {
        console.error(error);
        Alert.alert("Error saving data, please try again");
      }
    }
  };
//changing date
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate || new Date();
      const dateString = currentDate.toLocaleDateString(); // Format the date as needed
      setDob(dateString);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "padding"}
      style={styles.container}
    >
      <Logo />
      <Text style={styles.title}>Personal Details</Text>
      <Text style={styles.subtitle}>
        Please enter the patient’s data below as accurately as possible
      </Text>
      <View style={styles.borderline} />
      <Form
        caption1="FirstName:"
        subcaption1="Enter firstname"
        onChangeText1={setFirstName}
        value1={firstname}

        caption2="MiddleName:"
        subcaption2="Enter middlename"
        onChangeText2={setMiddleName}
        value2={middlename}

        caption3="LastName:"
        subcaption3="Enter lastname"
        onChangeText3={setLastName}
        value3={lastname}

        caption4="Date of Birth:"
        subcaption4="DD/MM/YY"
        onChangeText4={setDob}
        value4={dob}
        onDatePress={() => setShowDatePicker(true)}

        caption5="Home Address:"
        subcaption5="Enter address"
        onChangeText5={setAddress}
        value5={address}

      />

    

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={styles.positionbutton}>
        <View style={styles.button}>
          <Button title="Next" color={'#35524A'} onPress={saveData}></Button>
        </View>
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </KeyboardAvoidingView>
  );
}