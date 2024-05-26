const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

dotenv.config();

connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Server is Running✅");
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}, test link ==> http://localhost:${port}/test`
  );
});

app.use("/user", userRoutes);
app.use("/property", propertyRoutes);
