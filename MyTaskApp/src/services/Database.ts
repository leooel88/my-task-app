import SQLite from 'react-native-sqlite-storage';

export const initDatabase = async () => {
  const db = await SQLite.openDatabase({ name: 'AppDatabase.db', location: 'default' });

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      notification_frequency INTEGER,
      time_reference TEXT
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      address TEXT,
      phone_number TEXT,
      age INTEGER
    );
  `);

  return db;
};

export const createTask = async (
  db: SQLite.SQLiteDatabase,
  title: string,
  description: string,
  notification_frequency: number,
  time_reference: string
) => {
  const result = await db.executeSql(
    'INSERT INTO tasks (title, description, notification_frequency, time_reference) VALUES (?, ?, ?, ?)',
    [title, description, notification_frequency, time_reference]
  );

  return result[0].insertId;
};

export const getTasks = async (db: SQLite.SQLiteDatabase) => {
  const result = await db.executeSql('SELECT * FROM tasks');
  return result[0].rows.raw();
};

export const getTask = async (db: SQLite.SQLiteDatabase, taskId: number) => {
  const result = await db.executeSql('SELECT * FROM tasks WHERE id = ?', [taskId]);
  return result[0].rows.item(0);
};

export const updateTask = async (
  db: SQLite.SQLiteDatabase,
  taskId: number,
  title: string,
  description: string,
  notification_frequency: number,
  time_reference: string
) => {
  await db.executeSql(
    'UPDATE tasks SET title = ?, description = ?, notification_frequency = ?, time_reference = ? WHERE id = ?',
    [ title, description, notification_frequency, time_reference, taskId ]
  );
};

export const deleteTask = async (db: SQLite.SQLiteDatabase, taskId: number) => {
  await db.executeSql('DELETE FROM tasks WHERE id = ?', [taskId]);
};