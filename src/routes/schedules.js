const express = require("express");
const auth = require("../middleware/authenticate");
const {
  getSchedulesByGuideEmail,
  getSessionsBySchedule,
} = require("../services/salesforceService");

const router = express.Router();

// GET /schedules             → list schedules for logged-in guide
router.get("/", auth, async (req, res) => {
  try {
    const schedules = await getSchedulesByGuideEmail(req.user.email);
    res.json(schedules);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Salesforce error" });
  }
});

// GET /schedules/:id/sessions → sessions for a single schedule
router.get("/:id/sessions", auth, async (req, res) => {
  try {
    const sessions = await getSessionsBySchedule(req.params.id);
    res.json(sessions);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Salesforce error" });
  }
});

module.exports = router;
