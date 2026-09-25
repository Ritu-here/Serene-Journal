import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateJournal from "./pages/CreateJournal";
import EditJournal from "./pages/EditJournal";
import JournalDetails from "./pages/JournalDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
  path="/reset-password/:token" element={<ResetPassword />}/>
  

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>

<Route
  path="/create-journal"
  element={
    <ProtectedRoute>
      <CreateJournal />
    </ProtectedRoute>
  }
/>
<Route
  path="/journal/:id"
  element={
    <ProtectedRoute>
      <JournalDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-journal/:id"
  element={
    <ProtectedRoute>
      <EditJournal />
    </ProtectedRoute>
  }
/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;