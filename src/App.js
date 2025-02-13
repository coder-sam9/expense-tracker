import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import WelcomeScreen from "./pages/WelcomeScreen";

function App() {
  const user = JSON.parse(localStorage.getItem("expense-user"));

  return (
    <div
      style={{
        backgroundImage: "url(/backgroundImage.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // Ensure full viewport height
        width: "100vw", // Ensure full viewport width
      }}
    >
      <Router>
        <Routes>
          {/* Redirect to Welcome if logged in, else show Login */}
          <Route path="/" element={user?.idToken ? <Navigate replace to="/welcome" /> : <LoginScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
