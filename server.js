const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewURLParser: true }, { useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//models and routes
const appointmentsRouter = require("./routes/appointments");
const usersRouter = require("./routes/users");

app.use("/appointments", appointmentsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
