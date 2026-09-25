import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const EditJournal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing journal
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await API.get(`/journals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const journal = response.data.journal;

        setTitle(journal.title || "");
        setContent(journal.content || "");
        setMood(journal.mood || "");
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load journal"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchJournal();
    }
  }, [id, token]);

  // Update journal
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await API.put(
        `/journals/${id}`,
        {
          title,
          content,
          mood,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update journal"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="journal-page">
        <div className="loading">
          Loading journal...
        </div>
      </div>
    );
  }

  return (
    <div className="journal-page">
      <div className="journal-form-container">

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="journal-form-card">

          <div className="details-icon">
            ✏️
          </div>

          <h1>Edit Journal</h1>

          <p className="form-subtitle">
            Update your thoughts and feelings 🌿
          </p>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            

            <div className="label-row">
  <label>Title</label>
  <span>{title.length}/100</span>
</div>

<input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Give your journal a title..."
  maxLength={100}
/>

            <div className="label-row">
  <label>Content</label>
  <span>{content.length} characters</span>
</div>

<textarea
  value={content}
  onChange={(e) => setContent(e.target.value)}
  placeholder="Write your thoughts here..."
  rows="8"
/>

            <label>Mood</label>

<div className="mood-options">

  <button
    type="button"
    className={`mood-option ${mood === "happy" ? "selected" : ""}`}
    onClick={() => setMood("happy")}
  >
    😊
    <span>Happy</span>
  </button>

  <button
    type="button"
    className={`mood-option ${mood === "sad" ? "selected" : ""}`}
    onClick={() => setMood("sad")}
  >
    😔
    <span>Sad</span>
  </button>

  <button
    type="button"
    className={`mood-option ${mood === "calm" ? "selected" : ""}`}
    onClick={() => setMood("calm")}
  >
    😌
    <span>Calm</span>
  </button>

  <button
    type="button"
    className={`mood-option ${mood === "excited" ? "selected" : ""}`}
    onClick={() => setMood("excited")}
  >
    🤩
    <span>Excited</span>
  </button>

  <button
    type="button"
    className={`mood-option ${mood === "angry" ? "selected" : ""}`}
    onClick={() => setMood("angry")}
  >
    😠
    <span>Angry</span>
  </button>

  <button
    type="button"
    className={`mood-option ${mood === "anxious" ? "selected" : ""}`}
    onClick={() => setMood("anxious")}
  >
    😟
    <span>Anxious</span>
  </button>

  <button
    type="button"
    className={`mood-option ${mood === "neutral" ? "selected" : ""}`}
    onClick={() => setMood("neutral")}
  >
    😐
    <span>Neutral</span>
  </button>

</div>

            <div className="details-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
                disabled={saving}
              >
                {saving ? "Updating..." : "Update Journal ✨"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJournal;