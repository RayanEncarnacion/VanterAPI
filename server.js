const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3000;
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const usersRoute = require("./routes/users");
const updateRoute = require("./routes/update");
const deleteRoute = require("./routes/delete");

// Send and receive data as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Setting EJS as a View engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/public/views");
// Static forlder
app.use(express.static(__dirname + "/public"));

dotenv.config();

// DB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then()
  .catch((error) => console.log(error));

// Routing
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/users", (req, res) => {
  res.render("users");
});
app.get("/update", (req, res) => {
  res.render("update");
});
app.get("/delete", (req, res) => {
  res.render("delete");
});

// Using external routes files to manage requests
app.use("/", registerRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/users", usersRoute);
app.use("/update", updateRoute);
app.use("/delete", deleteRoute);

app.listen(port, () => {
  console.log(`Server running on ${port}!`);
});
