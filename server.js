const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/all", (req, res, next) => {
  db.execute("select * from articles")
    .then(response => {
      console.log(response[0]);
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
      console.log(response);
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
  console.log(req.query);
  if (req.query.id) {
    res.send("edit request");
  } else {
    res.send("insert request");
  }
});

app.delete("/article/:id", (req, res, next) => {
  const id = req.params.id;
  db.execute("delete from articles where id=" + id).then(response => {
    console.log(response);
    res.send("deleted");
  });
});

app.use("/", (req, res, next) => {
  console.log('route "/"');
  res.status(404).send("not found");
});

app.listen(4004, () => {
  console.log("Listening to port 4004");
});
