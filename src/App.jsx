// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/footer/Footer";
import LoginPage from "./pages/login/LoginPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <div className="flex-grow">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
