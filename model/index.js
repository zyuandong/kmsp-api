const query = require('../utils/query')

const tables = {
  apples: `create table if not exists apples(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    weight INT NOT NULL DEFAULT 0,
    isEaten INT NOT NULL DEFAULT 0
  );`
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