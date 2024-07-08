import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Text, View } from "@/components/Themed";
import Form from "@/components/core/form";
import Logo from "@/components/core/logo";
import Button from "@/components/core/button";
import styles from "./tabstyles";
import { useState, useEffect } from "react";
import { createTable,db} from "./db";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Visit() {
  const [Id, setId] = useState(1);
  const [clinicDate, setClinicDate] = useState('');
  const [ailment, setAilment] = useState('');
  const [procedure, setProcedure] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [prescribed, setPrescribed] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateType, setActiveDateType] = useState('')
  useEffect(() => {
    createTable();
  }, []);



  


  const saveData = async () => {
   
    if (clinicDate.length == 0 || ailment.length == 0 || procedure.length == 0 ||
      nextDate.length == 0 || prescribed.length == 0) {
      Alert.alert("Please fill in all fields.Use 'none' where nothing applies")
    }
    else {
      try {
         db.transaction( (tx) => {
           tx.executeSql(
            'INSERT INTO Visits ( clinicDate, ailment, procedure, nextDate, prescribed) VALUES (?, ?, ?, ?, ?)',
            [clinicDate, ailment, procedure, nextDate, prescribed]
          );
        });
        console.log('Data saved successfully');
        Alert.alert("Patient data charted successfully");
        
        setClinicDate('');
        setAilment('');
        setProcedure('');
        setNextDate('');
        setPrescribed('');
        router.push('/one')
        
      } catch (error) {
        console.error(error);
        Alert.alert("Error saving data, please try again");
      }
    }
  };

// the function called to show the claendar on image click
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate || new Date();
      const dateString = currentDate.toLocaleDateString(); // Formats the date 
      
      // conditional rendering so they dont show the same dates
      if (activeDateType === 'clinicDate') {
        setClinicDate(dateString);
      } else if (activeDateType === 'nextDate') {
        setNextDate(dateString);
      }
    }
  };



  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "padding"}
      style={styles.container}
    >
      <Logo />
      <Text style={styles.title}>Visitation Details</Text>
      <Text style={styles.subtitle}>
        Please enter the details of the patient’s visit below
      </Text>

      <View style={styles.borderline} />
{/* imports my form, receives the props and passes the data to them  */}
      <Form
        caption1="Clinic visit Date:"
        subcaption1="DD/MM/YY"
        onChangeText1={setClinicDate}
        value1={clinicDate}
        clinicimage={true}
        onClinicDatePress={() => { setShowDatePicker(true); setActiveDateType('clinicDate'); }}
        

        caption2="Nature of Ailment:"
        subcaption2="brief description of the nature of ailment"
        onChangeText2={setAilment}
        value2={ailment}

        caption3="Procedure Undertaken:"
        subcaption3="dental procedure carried out, if any"
        onChangeText3={setProcedure}
        value3={procedure}

        caption4="Next Appointment:"
        subcaption4="DD/MM/YY"
        onChangeText4={setNextDate}
        value4={nextDate}
        onDatePress={() =>  { setShowDatePicker(true); setActiveDateType('nextDate'); }}

        caption5="Medicine Prescribed:"
        subcaption5="medicine prescribed, if any"
        multiline={true}
        onChangeText5={setPrescribed}
        value5={prescribed}
        
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
          <Button title="Submit" color={'#35524A'} onPress={saveData} ></Button>
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
