
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import JournalCard from "../components/JournalCard";

const Dashboard = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [streak, setStreak] = useState(0);
  const [deleteId, setDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
const [selectedMood, setSelectedMood] = useState("all");

  const [quote, setQuote] = useState(
    "Every day is a new beginning. 🌿"
  );

  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  // Random Quote
  const generateQuote = () => {
    const quotes = [
      "Every day is a new beginning. 🌿",
      "Believe in yourself and keep going. ✨",
      "Small steps every day lead to big changes. 🌱",
      "Your thoughts shape your reality. 💫",
      "Be proud of how far you have come. ❤️",
      "Peace begins with a calm mind. 🕊️",
      "You are doing better than you think. 🌸",
      "Today is another chance to become better. ☀️",
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  // Fetch Journals + Streak
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await API.get("/journals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJournals(response.data.journals);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load journals"
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchStreak = async () => {
      try {
        const response = await API.get("/journals/streak", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStreak(response.data.streak);
      } catch (error) {
        console.error("Failed to load streak:", error);
      }
    };

    if (token) {
      fetchJournals();
      fetchStreak();
    }
  }, [token]);

  // Delete Journal
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this journal?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/journals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJournals((previousJournals) =>
        previousJournals.filter(
          (journal) => journal._id !== id
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete journal"
      );
    }
  };

  const filteredJournals = journals.filter((journal) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    journal.title.toLowerCase().includes(search) ||
    journal.content.toLowerCase().includes(search);

  const matchesMood =
    selectedMood === "all" ||
    journal.mood === selectedMood;

  return matchesSearch && matchesMood;
});

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Mood Emoji
  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      happy: "😊",
      sad: "😔",
      calm: "😌",
      excited: "🤩",
      angry: "😠",
      anxious: "😟",
      neutral: "😐",
    };

    return moodEmojis[mood] || "🌱";
  };

  if (loading) {
    return <p className="loading">Loading journals...</p>;
  }

  return (
    <div className="app-container">
      <div className="dashboard">

        {/* ================= HEADER ================= */}

        <header className="dashboard-header">
          <div className="brand">
            <h1>Serene Journal 🌿</h1>
            <p>A quiet place for your thoughts.</p>
          </div>

          <div className="user-section">
            <span className="welcome">
              Welcome, {user?.name}
            </span>

            <button
  className="profile-btn"
  onClick={() => navigate("/profile")}
>
  👤 Profile
</button>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* ================= MAIN ================= */}

        <main>

          {/* ================= STATS ================= */}

          <div className="stats-container">

            {/* Total Journals */}
            <div className="stat-card">
              <div className="stat-icon">📖</div>

              <div>
                <h3>{journals.length}</h3>
                <p>Total Journals</p>
              </div>
            </div>

            {/* Streak */}
            <div className="stat-card">
              <div className="stat-icon">🔥</div>

              <div>
                <h3>{streak}</h3>
                <p>Day Streak</p>
              </div>
            </div>

            {/* Latest Mood */}
            <div className="stat-card">
              <div className="stat-icon">
                {journals.length > 0
                  ? getMoodEmoji(journals[0].mood)
                  : "🌱"}
              </div>

              <div>
                <h3>
                  {journals.length > 0
                    ? journals[0].mood
                    : "None"}
                </h3>

                <p>Latest Mood</p>
              </div>
            </div>

          </div>

          {/* ================= QUOTE ================= */}

          <div className="quote-card">

            <div className="quote-icon">
              💭
            </div>

            <div className="quote-content">

              <h3>Daily Inspiration</h3>

              <p>"{quote}"</p>

              <button onClick={generateQuote}>
                New Quote ✨
              </button>

            </div>

          </div>

          {/* ================= JOURNAL HEADER ================= */}

          <div className="journal-header">

            <h2>Your Journals</h2>

            <button
              className="new-journal-btn"
              onClick={() => navigate("/create-journal")}
            >
              + New Journal
            </button>

          </div>

          <div className="journal-filters">

  <input
    type="text"
    placeholder="🔍 Search your journals..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={selectedMood}
    onChange={(e) => setSelectedMood(e.target.value)}
  >
    <option value="all">All Moods</option>
    <option value="happy">😊 Happy</option>
    <option value="calm">😌 Calm</option>
    <option value="excited">🤩 Excited</option>
    <option value="sad">😔 Sad</option>
    <option value="angry">😠 Angry</option>
    <option value="anxious">😟 Anxious</option>
    <option value="neutral">😐 Neutral</option>
  </select>

</div>

          {/* ================= ERROR ================= */}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {/* ================= JOURNALS ================= */}

          {filteredJournals.length === 0 ? (

            <div className="empty-state">

  <h3>
    {journals.length === 0
      ? "No journals yet 🌱"
      : "No journals found 🔍"}
  </h3>

  <p>
    {journals.length === 0
      ? "Start writing your first journal entry."
      : "Try a different search or mood filter."}
  </p>

</div>

          ) : (

            <div className="journal-grid">

              {filteredJournals.map((journal) => (
                <JournalCard
                  key={journal._id}
                  journal={journal}
                  onDelete={handleDelete}
                />
              ))}

            </div>

          )}

        </main>

      </div>
    </div>
  );
};

export default Dashboard;

