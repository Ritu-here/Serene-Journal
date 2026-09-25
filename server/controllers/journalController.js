const Journal = require("../models/Journal");

// Create Journal
const createJournal = async (req, res) => {
  try {
    const { title, content, mood } = req.body;

   if (!title || !title.trim()) {
  return res.status(400).json({
    message: "Journal title is required",
  });
}

if (!content || !content.trim()) {
  return res.status(400).json({
    message: "Journal content is required",
  });
}
if (title.trim().length > 100) {
  return res.status(400).json({
    message: "Title cannot exceed 100 characters",
  });
}

    const journal = await Journal.create({
      title,
      content,
      mood,
      user: req.user,
    });

    res.status(201).json({
      message: "Journal created successfully",
      journal,
    });
  } catch (error) {
    console.error("Create journal error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get All Journals
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: journals.length,
      journals,
    });
  } catch (error) {
    console.error("Get journals error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get Single Journal
const getJournal = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!journal) {
      return res.status(404).json({
        message: "Journal not found",
      });
    }

    res.status(200).json({
      journal,
    });
  } catch (error) {
    console.error("Get journal error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get Journal Streak
const getJournalStreak = async (req, res) => {
  try {
    const journals = await Journal.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    if (journals.length === 0) {
      return res.status(200).json({
        streak: 0,
      });
    }

    // Convert date into local YYYY-MM-DD format
    const getDateString = (date) => {
      const d = new Date(date);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    // Get unique journal dates
    const dates = [
      ...new Set(
        journals.map((journal) =>
          getDateString(journal.createdAt)
        )
      ),
    ];

    // Today's date
    const today = new Date();

    // Yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayString = getDateString(today);
    const yesterdayString = getDateString(yesterday);

    // If there is a journal today, streak starts from today.
    // Otherwise, if there is a journal yesterday, streak starts from yesterday.
    let startDate;

    if (dates.includes(todayString)) {
      startDate = today;
    } else if (dates.includes(yesterdayString)) {
      startDate = yesterday;
    } else {
      return res.status(200).json({
        streak: 0,
      });
    }

    let streak = 0;

    for (let i = 0; i < dates.length; i++) {
      const expectedDate = new Date(startDate);

      expectedDate.setDate(
        startDate.getDate() - i
      );

      const expectedDateString =
        getDateString(expectedDate);

      if (dates.includes(expectedDateString)) {
        streak++;
      } else {
        break;
      }
    }

    res.status(200).json({
      streak,
    });
  } catch (error) {
    console.error("Get streak error:", error);

    res.status(500).json({
      message: "Failed to calculate streak",
    });
  }
};
// Update Journal
const updateJournal = async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    const journal = await Journal.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!journal) {
      return res.status(404).json({
        message: "Journal not found",
      });
    }

    journal.title = title ?? journal.title;
    journal.content = content ?? journal.content;
    journal.mood = mood ?? journal.mood;

    await journal.save();

    res.status(200).json({
      message: "Journal updated successfully",
      journal,
    });
  } catch (error) {
    console.error("Update journal error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete Journal
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!journal) {
      return res.status(404).json({
        message: "Journal not found",
      });
    }

    await journal.deleteOne();

    res.status(200).json({
      message: "Journal deleted successfully",
    });
  } catch (error) {
    console.error("Delete journal error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createJournal,
  getJournals,
  getJournal,
  getJournalStreak,
  updateJournal,
  deleteJournal,
  
};