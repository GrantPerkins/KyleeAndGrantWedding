import React from "react";
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";

const App: React.FC = () => {
  const styles = {
    fontFamily: "'Quicksand', sans-serif", // ✅ friendly font for whole site
    margin: 0,
    padding: 0,
  };

  return (
    <div style={styles}>
      <HeroSection />
      <DetailsSection />
    </div>
  );
};

export default App;
