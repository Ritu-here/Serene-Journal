import { useNavigate } from "react-router-dom";

const JournalCard = ({ journal, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="journal-card">
      <h3>{journal.title}</h3>

      <p className="journal-content">
        {journal.content}
      </p>

      <div className="journal-meta">
        {journal.mood ? (
          <span className="mood-badge">
            {journal.mood}
          </span>
        ) : (
          <span></span>
        )}

        <small className="journal-date">
          {new Date(journal.createdAt).toLocaleDateString()}
        </small>
      </div>

      <div className="journal-actions">
        <button
          className="view-btn"
          onClick={() =>
            navigate(`/journal/${journal._id}`)
          }
        >
          View
        </button>

        <button
          className="edit-btn"
          onClick={() =>
            navigate(`/edit-journal/${journal._id}`)
          }
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(journal._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JournalCard;