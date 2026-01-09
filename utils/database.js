import SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon.db');

// Get all distinct categories from the menu
export const fetchCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT DISTINCT category FROM menu;',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array.map((row) => row.category));
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Filter menu by selected categories and search text
export const filterMenu = (selectedCategories, searchTerm) => {
  return new Promise((resolve, reject) => {
    let whereClauses = [];
    let params = [];

    if (selectedCategories.length > 0) {
      whereClauses.push(`category IN (${selectedCategories.map(() => '?').join(', ')})`);
      params.push(...selectedCategories);
    }

    if (searchTerm) {
      whereClauses.push(`name LIKE '%' || ? || '%'`);
      params.push(searchTerm);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const query = `SELECT * FROM menu ${whereClause}`;

    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};