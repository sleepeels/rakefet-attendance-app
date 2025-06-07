const express = require("express");
const auth = require("../middleware/authenticate");
const {
  updateSession,
  deleteSession,
} = require("../services/salesforceService");

const STATUS_MAP = {
  Pending: "Pending", // or 'ממתין'  ← whatever is in Setup
  Complete: "Complete",
  // …
};

const router = express.Router();

// PATCH /sessions/:id   { Status__c: "Completed" }
router.patch("/:id", auth, async (req, res) => {
  try {
    await updateSession(req.params.id, req.body); // body already JSON
    res.sendStatus(204); // success, no content
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Salesforce update error" });
  }
});

// DELETE /sessions/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    await deleteSession(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Salesforce delete error" });
  }
});

module.exports = router;
