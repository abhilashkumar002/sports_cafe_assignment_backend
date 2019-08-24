const mysql = require('mysql2');

const dbpool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sportscafe_assignment'
}).promise();

const createTableQuery = 'create table articles' +
' (id INT AUTO_INCREMENT primary key, sports_name varchar(255), image_link varchar(1023), title varchar(1023), content text, author varchar(255))';

// dbpool.execute(createTableQuery).then(result => {
//   console.log(result);
//   dbpool.end();
// })

const insertDataQuery = 'insert into articles (sports_name, image_link, title, content, author) values (?,?,?,?,?)'

dbpool.execute(insertDataQuery,[
  'cricket2', 
  'https://media.istockphoto.com/photos/closeup-of-red-cricket-ball-and-bat-sitting-on-grass-picture-id177427917?k=6&m=177427917&s=612x612&w=0&h=-q2U1BYuDKX2qQa7DcwTQ6PhkJifJcuuwo1HlpCjfC8=',
  'world cup updates iubidvu kjbvk kjdbv',
  'world cup is here kjqdn dvkjn dv j',
  'abhilash'
]).then(response => {
  console.log(response);
  dbpool.end();
})