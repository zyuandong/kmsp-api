const query = require('../utils/query')

const tables = {
  user: `
    CREATE TABLE IF NOT EXISTS user(
      id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age INT DEFAULT 0,
      sex CHAR(1) DEFAULT 'n',
      avatar BLOB,
      birthday DATETIME,
      description TEXT
    )
    ENGINE=InnoDB
    DEFAULT CHARSET=utf8mb4;
  `
}

const createTable = (tb) => {
  query(tb, (res) => {
    console.log('建表成功');
    return true
  }, (err) => {
    console.log('建表失败', err);
    return false
  })
}

for (const key in tables) {
  if (tables.hasOwnProperty(key)) {
    createTable(tables[key])
  }
}