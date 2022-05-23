require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8001;

app.set("view engine", "ejs");

var tasks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindOfDay: day, newTasks: tasks });
});

app.post("/", (req, res) => {
  var task = req.body.task;
  tasks.push(task);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
