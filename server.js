const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/all", (req, res, next) => {
  console.log(req.query);
  const sqlQuery = `select * from articles limit ${req.query.initialCount} , ${req.query.step}`;
  db.execute(sqlQuery)
    .then(response => {
      res.send(response[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Error in fatching data");
    });
});

app.get("/article/:id", (req, res, next) => {
  const params = req.params;
  db.execute("select * from articles where id=" + params.id)
    .then(response => {
      if (response[0].length == 0) {
        res.status(404).send("Article with this id not found");
      }
      res.send(response[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Error in fetching data");
    });
});

app.post("/insertOrEdit", (req, res, next) => {
  const data = req.body;
  if (req.body.id) {
    const updateQuery = `update articles set author = ?, content = ?, image_link = ?, sports_name = ?, title = ? where id = ?`;
    const values = [
      data.author,
      data.content,
      data.image_link,
      data.sports_name,
      data.title,
      data.id
    ];
    db.execute(updateQuery, values)
      .then(response => {
        console.log(response);
        res.status(200).send("edit request complete");
      })
      .catch(err => {
        res.status(400).send("Editing data failed");
      });
  } else {
    const insertQuery = `insert into articles (author, content, image_link, sports_name, title) values(?,?,?,?,?)`;
    const values = [
      data.author,
      data.content,
      data.image_link,
      data.sports_name,
      data.title
    ];
    db.execute(insertQuery, values)
      .then(response => {
        console.log(response);
        res.status(200).send("insert request complete");
      })
      .catch(err => {
        res.status(400).send("inserting data failed");
      });
  }
});

app.delete("/article/:id", (req, res, next) => {
  const id = req.params.id;
  db.execute("delete from articles where id=" + id)
  .then(response => {
    console.log(response);
    res.status(200).send("deleted");
  })
  .catch(err => {
    res.status(400).send('Error in deleting article')
  });
});

app.use("/", (req, res, next) => {
  console.log('route "/"');
  res.status(404).send("not found");
});

app.listen(4004, () => {
  console.log("Listening to port 4004");
});
