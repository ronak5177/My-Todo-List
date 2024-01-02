import { Routes, Route } from "react-router-dom";
import "./App.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
// import Home from "./components/Home";
import Peers from "./components/Peers/Peers";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/card" element={<Card />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/peers" element={<Peers />} />
      </Routes>
    </>
  );
}

export default App;
