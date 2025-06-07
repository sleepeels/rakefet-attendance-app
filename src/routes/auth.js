const express = require("express");
const jwt = require("jsonwebtoken");
const { findContactByEmail } = require("../services/salesforceService");

const router = express.Router();
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

/**
 * POST /login   { "email": "guide@org.org" }
 * returns:      { token, contactId }
 */
router.post("/", async (req, res) => {
  console.log("auth post route");
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const contact = await findContactByEmail(email);
    if (!contact) return res.status(404).json({ error: "Guide not found" });

    console.log(contact);
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.json({ token, contactId: contact.Id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Salesforce error" });
  }
});

module.exports = router;
