const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Sainath07',  
  database: 'pokedex'
});

conn.connect(err => {
  if (err) throw err;
  console.log(" MySQL Connected");
});

module.exports = conn;
