import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const JournalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await API.get(`/journals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJournal(response.data.journal);
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

  const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this journal?"
  );

  if (!confirmDelete) return;

  try {
    setDeleting(true);

    await API.delete(`/journals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate("/dashboard");
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Failed to delete journal"
    );
    setDeleting(false);
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

  if (error) {
    return (
      <div className="journal-page">
        <div className="journal-form-container">
          <div className="details-error">
            <span>⚠️</span>
            <h2>Something went wrong</h2>
            <p>{error}</p>

            <button
              className="save-btn"
              onClick={() => navigate("/dashboard")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="journal-page">
        <div className="journal-form-container">
          <div className="details-error">
            <span>🌱</span>
            <h2>Journal not found</h2>

            <button
              className="save-btn"
              onClick={() => navigate("/dashboard")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-page">
      <div className="journal-form-container">

        {/* Back */}
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        {/* Journal */}
        <article className="journal-details-card">

          <div className="details-icon">
            🌿
          </div>

          <h1>{journal.title}</h1>

          <div className="details-meta">
            {journal.mood && (
              <span className="mood-badge">
                {journal.mood}
              </span>
            )}

            <span>
              📅{" "}
              {new Date(
                journal.createdAt
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="journal-divider" />

          <div className="journal-content-view">
            {journal.content}
          </div>

          <div className="details-actions">
  <button
    className="cancel-btn"
    onClick={() => navigate("/dashboard")}
  >
    ← Back
  </button>

  <button
    className="save-btn"
    onClick={() =>
      navigate(`/edit-journal/${journal._id}`)
    }
  >
    Edit Journal ✏️
  </button>

  <button
    className="delete-btn"
    onClick={handleDelete}
    disabled={deleting}
  >
    {deleting ? "Deleting..." : "Delete 🗑️"}
  </button>
</div>

        </article>
      </div>
    </div>
  );
};

export default JournalDetails;