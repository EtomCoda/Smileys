import { db } from "../db";
import { useState } from "react";

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
  Id: string;
}

const [patientsVisit, setPatientsVisit] = useState<PatientVisits[]>([]);

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

export { queryPatientsAndVisists, PatientVisits };
