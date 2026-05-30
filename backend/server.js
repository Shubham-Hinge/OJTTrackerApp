const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "css")));
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use(
 "/api/tasks",
 require("./routes/taskRoutes")
);

app.listen(5000, () => {
  console.log(
    "Server Running On Port 5000"
  );
});