import "../index.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Header() {

  

  const { user, email, token, logout } = useAuth() || {};

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="header">
        <div className="header-content">
          <img src="/wallet.png" alt="Logo" />
          <h4>{Greeting() + (user ? user : "Guest")}</h4>
        </div>
        {user && (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </>
  )
  
};

function Greeting() {
  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = "Good Morning, ";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon, ";
  } else {
    greeting = "Good Evening, ";
  }
  return greeting;
}

export default Header;