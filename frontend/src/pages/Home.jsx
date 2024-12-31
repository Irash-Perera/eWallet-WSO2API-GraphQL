import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GetUser from "./Auth";
import "../index.css"

function Dashboard() {
  const { user, email, token } = useAuth() || {};
  
  return (
    <>
      <Header />
      <div className='main-container'>
        <GetUser />
      </div>
      <Footer />

    </>
  );
}

export default Dashboard;