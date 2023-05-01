import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tasks.db');

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, due_date TEXT);',
    );
  });
};