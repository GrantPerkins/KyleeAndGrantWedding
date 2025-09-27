import React, { useEffect, useRef, useState } from "react";
import couple from "./couple3.jpg";

const DetailsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "4rem 2rem",
      backgroundColor: "#3e6161", // ✅ updated background color
    //   backgroundImage: `url(${couple})`,
    },
    card: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(50px)",
      transition: "all 0.8s ease-out",
      backgroundColor: "rgba(255,255,255,0.95)",
      padding: "2.5rem 3.5rem",
      borderRadius: "20px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      maxWidth: "700px",
      textAlign: "center" as const,
    },
    heading: {
      fontSize: "2.2rem",
      marginBottom: "1.5rem",
      color: "#3e6161",
    },
    text: {
      fontSize: "1.2rem",
      margin: "0.75rem 0",
      color: "#333",
    },
    button: {
      display: "inline-block",
      marginTop: "2rem",
      padding: "1rem 2.5rem",
      fontSize: "1.3rem",
      fontWeight: "bold",
      color: "white",
      backgroundColor: "#3e6161",
      border: "none",
      borderRadius: "50px",
      textDecoration: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#4d7b7b",
    },
  };

  return (
    <section ref={ref} style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Wedding Details</h2>
        <p style={styles.text}><b>Date: </b>April 11, 2026</p>
        <p style={styles.text}><b>Location: </b>The Grand Garden, Sturbridge, Massachusetts</p>
        <p style={styles.text}><b>Time: </b>5:00 PM Ceremony, Reception to Follow</p>
        <p style={styles.text}><b>Dress Code: </b>Casual Attire (aka ties optional, just look nice)</p>

        {/* RSVP Button */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd-aZYg7Y9W6XKns1tr8KvcKRpuhZ7I8QzXWM6qXVllTReJNQ/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              styles.button.backgroundColor)
          }
        >
          RSVP Now
        </a>
      </div>
    </section>
  );
};

export default DetailsSection;
