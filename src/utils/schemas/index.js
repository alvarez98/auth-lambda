const { auth } = require("./auth");
const { uuid, id } = require("./uuid")
const { email } = require("./email")
const { password } = require("./password")
const { updateUser, user } = require("./user")

const schemas = { auth, uuid, email, password, updateUser, id, user }

module.exports = schemas