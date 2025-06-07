const jsforce = require("jsforce");
require("dotenv").config();

const conn = new jsforce.Connection({
  loginUrl: process.env.SF_LOGIN_URL,
});

// log in once on server boot
async function init() {
  await conn.login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD + (process.env.SF_TOKEN || "")
  );
  console.log("✅  Salesforce connected");
}

module.exports = { conn, init };
