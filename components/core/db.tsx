


import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('MainSmileys.db'); // Opens  database, creates it if it doesnt exist

// CREATING MY TABLES OVER HERE
const createTable = async () => {
  db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => {
    console.log('Foreign Key enforcement is on!');//supposed to let me use foreign key,but failed
  });

  
   db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Patients (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, middlename TEXT,
       lastname TEXT, dateOfBirth TEXT, address TEXT);`
    );
    
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Visits (id INTEGER PRIMARY KEY AUTOINCREMENT,
       clinicDate TEXT, ailment TEXT,
      procedure TEXT, nextDate TEXT, prescribed TEXT
      );`
    );
  }, (error) => {
    console.error('Error creating tables:', error);
  }, () => {
    console.log('Tables created successfully');
  });
};

export { db, createTable };



// db.transaction(tx => {
//   // Drop the existing Visits table if it exists
//   tx.executeSql('DROP TABLE IF EXISTS Visits;', [], () => {
//     console.log('Visits table dropped');
//   })
// })
// db.transaction(tx => {
//   // Drop the existing Patient table if it exists
//   tx.executeSql('DROP TABLE IF EXISTS Patients;', [], () => {
//     console.log('patients table dropped');
//   })
// })



// const logPatients = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       "SELECT * FROM Patients",
//       [],
//       (tx, results) => {
//         console.log("All Patients")
//         const len = results.rows.length;
//         if (len > 0) {
//           const patients = [];
//           for (let i = 0; i < len; i++) {
//             patients.push(results.rows.item(i))
//           }
//           console.log(patients)
//           console.table(patients)
//         }
//         else {
//           console.log('No patients found')
//         }
//       },
//       (tx, error) => {
//         console.error('Error fetching table names:', error);
//         return true;
//       }
//     );
//   });
// };


// const logVisits = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       "SELECT * FROM Visits WHERE id=1'",
//       [],
//       (tx, results) => {
//         console.log('Tables in the database:');
//         const len = results.rows.length;
//         for (let i = 0; i < len; i++) {
//           console.log(results.rows.item(i).name);
//         }
//       },
//       (tx, error) => {
//         console.error('Error fetching table names:', error);
//         return true;
//       }
//     );
//   });
// };


