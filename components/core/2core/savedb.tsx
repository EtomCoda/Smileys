import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { db } from "../db";

const [Id, setId] = useState(1);
const [clinicDate, setClinicDate] = useState("");
const [ailment, setAilment] = useState("");
const [procedure, setProcedure] = useState("");
const [nextDate, setNextDate] = useState("");
const [prescribed, setPrescribed] = useState("");

const [firstname, setFirstName] = useState("");
const [middlename, setMiddleName] = useState("");
const [lastname, setLastName] = useState("");
const [dob, setDob] = useState("");
const [address, setAddress] = useState("");

//SAVES DATA FROM BIO DETAILS FORM
const saveBioData = async () => {
  if (
    firstname.length == 0 ||
    middlename.length == 0 ||
    lastname.length == 0 ||
    dob.length == 0 ||
    address.length == 0
  ) {
    Alert.alert("Please fill in all fields.Use 'none' where nothing applies");
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

      router.push("/two");
    } catch (error) {
      console.error(error);
      Alert.alert("Error saving data, please try again");
    }
  }
};

//SAVES DATA FROM VISIT DETAILS FORM
const saveVisitData = async () => {
  if (
    clinicDate.length == 0 ||
    ailment.length == 0 ||
    procedure.length == 0 ||
    nextDate.length == 0 ||
    prescribed.length == 0
  ) {
    Alert.alert("Please fill in all fields.Use 'none' where nothing applies");
  } else {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Visits ( clinicDate, ailment, procedure, nextDate, prescribed) VALUES (?, ?, ?, ?, ?)",
          [clinicDate, ailment, procedure, nextDate, prescribed]
        );
      });
      console.log("Data saved successfully");
      Alert.alert("Patient data charted successfully");

      setClinicDate("");
      setAilment("");
      setProcedure("");
      setNextDate("");
      setPrescribed("");
      router.push("/one");
    } catch (error) {
      console.error(error);
      Alert.alert("Error saving data, please try again");
    }
  }
};

export { saveVisitData, saveBioData };
