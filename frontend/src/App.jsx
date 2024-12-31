import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/LogIn"
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NewTransaction from "./pages/NewTransaction";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-transaction" element={<NewTransaction />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
