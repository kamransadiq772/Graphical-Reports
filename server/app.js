const express = require("express");
const app = express();
const path = require('path')
require('dotenv').config();
const port = process.env.PORT || 5003;
const cors = require("cors");
const router = require("./routes");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });



app.use("/api", router);
const { sequelize } = require("./controllers/db");

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();

    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}


async function init() {
  await assertDatabaseConnectionOk();
  console.log(`Starting Sequelize + Express example on port ${port}...`);

  app.listen(port, () => {
    console.log(
      `Express server started on port ${port}. Try some routes, such as '/api/users'.`
    );
  });
}

init();
