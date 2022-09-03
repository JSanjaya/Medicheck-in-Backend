require('dotenv').config();
const mongoose = require("mongoose")
const uri = process.env.MONGO_DB_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    dbName: 'Medicheck-inDB'
}).then(db => {
    console.log("connected to db")
  })
  .catch(err => {
    console.log(err)
  })
