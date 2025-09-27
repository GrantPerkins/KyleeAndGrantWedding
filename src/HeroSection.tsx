import React from "react";
import pups from "./pups.jpg";

const HeroSection: React.FC = () => {
  const styles = {
    container: {
      height: "100vh",
      backgroundImage: `url(${pups})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed" as const,
      position: "relative" as const,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "flex-start",
      alignItems: "center",
      overflow: "hidden",
    },
    overlay: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    textWrapper: {
      marginTop: "21vh",
      zIndex: 2,
      textAlign: "center" as const,
      padding: "0 1rem", // prevent overflow on narrow screens
    },
    text: {
      fontSize: "clamp(2rem, 8vw, 6rem)", 
      // min 2rem (mobile), fluid up to 6rem (desktop)
      fontWeight: "bold",
      color: "white",
      lineHeight: 1.2,
    },
  };

  return (
    <section style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.textWrapper}>
        <h1 style={styles.text}>You're Invited to Our Wedding!</h1>
      </div>
    </section>
  );
};

export default HeroSection;
