import React from "react";
import pups from "./pups.jpg";
import pupsMobile from "./pups_mobile.jpg";

const HeroSection: React.FC = () => {
  const isMobile = window.innerWidth < 768;

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      width: "100%",
    },
    title: {
      fontSize: "clamp(2rem, 5vw, 4rem)",
      fontWeight: "bold",
      color: "#3e6161",
      textAlign: "center" as const,
      margin: "2rem 1rem 1rem 1rem",
    },
    image: {
      width: "100%",
      maxHeight: isMobile ? "50vh" : "80vh",
      objectFit: "cover" as const,
    },
  };

  return (
    <section style={styles.container}>
      <h1 style={styles.title}>You're Invited to Our Wedding!</h1>
      <img
        src={isMobile ? pupsMobile : pups}
        alt="Wedding"
        style={styles.image}
      />
    </section>
  );
};

export default HeroSection;
