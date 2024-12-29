import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, email, token } = useAuth() || {};
  
  return (
    <div>
      <p>Logged in as {user} ({email})</p>
      <p>Token: {token}</p>
    </div>
  );
}

export default Dashboard;