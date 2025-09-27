import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import InvitationPage from "./InvitationPage";

const App: React.FC = () => {
  const styles = {
    fontFamily: "'Quicksand', sans-serif",
    margin: 0,
    padding: 0,
  };

  return (
    <div style={styles}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:uuid" element={<InvitationPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
