import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const CreateJournal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("neutral");
console.log("STATE:", {
  title,
  content,
  mood,
});


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);

     await API.post(
  "/journals",
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

setSuccess("Journal created successfully! 🌿");

setTimeout(() => {
  navigate("/dashboard");
}, 1000);

    } 
    
    catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create journal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="journal-page">
      <div className="journal-form-container">

        <button
          className="back-btn"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="journal-form-header">
          <span className="journal-icon">🌿</span>

          <h1>Write a New Journal</h1>

          <p>
            Take a moment to slow down and put your thoughts into words.
          </p>
        </div>

        <form
          className="journal-form"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="title">
                Journal Title
              </label>

              <span>
                {title.length}/100
              </span>
            </div>

            <input
              id="title"
              type="text"
              placeholder="Give your journal a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          
          {/* Mood */}
<div className="form-group">
  <label>How are you feeling?</label>

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
</div>

          {/* Content */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="content">
                What's on your mind?
              </label>

              <span>
                {content.length} characters
              </span>
            </div>

            <textarea
              id="content"
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="12"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="form-error">
              ⚠️ {error}
            </div>
          )}


          {success && (
  <div className="form-success">
    ✅ {success}
  </div>
)}

          {/* Buttons */}
          <div className="form-actions">
            <button
              className="cancel-btn"
              type="button"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button
              className="save-btn"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Journal 🌿"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJournal;