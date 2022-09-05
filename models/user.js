const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const Record = new Schema({
    answer: {
      type: Boolean,
      default: 0,
    },
    notes: {
      type: String,
      default: "",
    },
    day: {
      type: String,
      default: ""
    }
})

const User = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  records: {
    type: [Record]
  },
  refreshToken: {
    type: [Session],
  },
})

//Remove refreshToken from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User)
