const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 7000;
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const usersRoute = require("./routes/users");
const publicRoute = path.join(__dirname, "/public");
const viewsRoute = path.join(__dirname, "/public/views");

// Send and receive data as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Setting EJS as a View engine
app.set("view engine", "ejs");
app.set("views", viewsRoute);
// Static forlder
app.use(express.static(publicRoute));

dotenv.config();

// DB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log(error));

// Routing
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/welcome", (req, res) => {
  res.render("welcome");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/users", (req, res) => {
  res.render("users");
});

// Using external routes files to manage requests
app.use("/", registerRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(`Server running on ${port}!`);
});
