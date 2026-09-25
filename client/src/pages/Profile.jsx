import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-icon">👤</div>

        <h2>My Profile</h2>
        <p className="profile-subtitle">
          Manage your Serene Journal account 🌿
        </p>

        <div className="profile-info">
          <div className="profile-item">
            <span>Name</span>
            <strong>{user?.name || "User"}</strong>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <strong>{user?.email || "Not available"}</strong>
          </div>
        </div>


        <button
  className="profile-back-btn"
  onClick={() => navigate("/dashboard")}
>
  ← Back to Dashboard
</button>

<button
  className="profile-change-password-btn"
  onClick={() => navigate("/change-password")}
>
  🔐 Change Password
</button>

        <button className="profile-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;