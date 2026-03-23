const token = localStorage.getItem("token");

const res = await fetch("http://localhost:5000/api/users/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return children;
}

import ProtectedRoute from "../components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Protected Dashboard</div>
    </ProtectedRoute>
  );
}