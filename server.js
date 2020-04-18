const express = require("express");

// use process.env variables to keep private variables,
require("dotenv").config();

// Express Middleware
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
const db = require("./modules/db");

// Controllers - aka, the db queries
const main = require("./controllers/main");
require("dotenv").config();
// App
const app = express();

// App Middleware
const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("combined")); // use 'tiny' or 'combined'

// App Routes - Auth

app.get("/", (req, res) => res.send(" world"));
// app.get("/crud", (req, res) => main.getTableData(req, res, db));
// app.get("/crud/:location", (req, res) => main.getTableLocation(req, res, db));
app.get("/user", (req, res) => main.getUserData(req, res, db));
//app.post('/users', (req, res) => main.postUserData(req, res, db));
app.use("/api/users", require("./routes/api/users")); //register
app.use("/api/doctors", require("./routes/api/doctors")); // test
app.use("/api/auth", require("./routes/api/auth")); //login

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
});
