const express = require("express");

const {
  createJournal,
  getJournals,
  getJournal,
  getJournalStreak,
  updateJournal,
  deleteJournal,
  
} = require("../controllers/journalController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create Journal
router.post("/", protect, createJournal);

// Get All Journals
router.get("/", protect, getJournals);

//streak Journal
router.get("/streak", protect, getJournalStreak);

// Get Single Journal
router.get("/:id", protect, getJournal);

// Update Journal
router.put("/:id", protect, updateJournal);

// Delete Journal
router.delete("/:id", protect, deleteJournal);


module.exports = router;