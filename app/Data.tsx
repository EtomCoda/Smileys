import { StatusBar } from "expo-status-bar";
import { Alert, Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { db } from "@/components/core/db";


interface PatientVisits {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  dateOfBirth: string;
  address: string;
  clinicDate: string;
  ailment: string;
  procedure: string;
  nextDate: string;
  prescribed: string;
}

export default function ModalScreen() {
  const [patientsVisit, setPatientsVisit] = useState<PatientVisits[]>([]);
 
  useEffect(() => {
    queryPatientsAndVisists();
  }, []);

  const queryPatientsAndVisists = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM Patients, Visits`,
        [],
        (tx, results) => {
          console.log("All Patients and Visits");
          const len = results.rows.length;
          if (len > 0) {
            const patientsData: PatientVisits[] = [];
            for (let i = 0; i < len; i++) {
              patientsData.push(results.rows.item(i) as PatientVisits);
            }
            console.log("patientsData:", patientsData);
            setPatientsVisit(patientsData);
          } else {
            Alert.alert('No records Found')
            console.log("No patients found");
          }
        },
        (tx, error) => {
          console.error("Error fetching table names:", error);
          return true;
        }
      );
    });
  };

  const renderItem = ({ item }: { item: PatientVisits }) => (
    <View style={styles.item}>
      <Text style={styles.title}>PatientVisits </Text>
      <Text>Firstname:{item.firstname}</Text>
      <Text>Middlename:{item.middlename}</Text>
      <Text>LastName:{item.lastname}</Text>
      <Text>Date of Birth: {item.dateOfBirth}</Text>
      <Text>Address: {item.address}</Text>

      <Text>ClinicDate: {item.clinicDate}</Text>
      <Text>Ailment: {item.ailment}</Text>
      <Text>Procedure: {item.procedure}</Text>
      <Text>Next Visit: {item.nextDate}</Text>
      <Text>Prescribed: {item.prescribed}</Text>
    </View>
  );
  console.log("display:", patientsVisit);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Patients</Text>
      <FlatList
        style={styles.header}
        data={patientsVisit}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toLocaleString()} //gives identifiers to items in my list
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFD23F",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#35524A",
  },
  item: {
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    backgroundColor: "#35524A",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

// const logVisits = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       "SELECT * FROM Visits",
//       [],
//       (tx, results) => {
//         console.log("All Visits")
//         const len = results.rows.length;
//         if (len > 0) {
//           const visitsData:PatientVisits[] = [];
//           for (let i = 0; i < len; i++) {
//             visitsData.push(results.rows.item(i) as PatientVisits)
//           }
//           console.log(visitsData)
//          setVisits(visitsData);
//         }
//         else {
//           console.log('No visits found')
//         }
//       },
//       (tx, error) => {
//         console.error('Error fetching table names:', error);
//         return true;
//       }
//     );
//   });
// };
