import React, { useEffect, useRef, useState } from "react";

interface DetailsSectionProps {
  names: string;
  plusOne: boolean;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ names, plusOne }) => {
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
      backgroundColor: "#3e6161",
    },
    card: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(50px)",
      transition: "all 0.8s ease-out",
      backgroundColor: "rgba(255,255,255,0.95)",
      padding: "2.5rem 2rem",
      borderRadius: "20px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      width: "100%",
      maxWidth: "800px",
      textAlign: "center" as const,
    },
    greeting: {
      fontSize: "1.6rem",
      marginBottom: "2rem",
      color: "#3e6161",
      lineHeight: 1.4,
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
        {/* Personalized Greeting */}
        <p style={styles.text}>
          {names}, we {plusOne ? "would love for you and your guest" : "would love for you"}{" "}
          to come to the wedding of Kylee Rutkiewicz and Grant Perkins.
        </p>
        <h2 style={styles.greeting}>
          Wedding Details:
        </h2>

        {/* Static Details */}
        <p style={styles.text}><b>Date: </b>April 11, 2026</p>
        <p style={styles.text}><b>Location: </b><a href="https://www.google.com/maps/dir//420+Main+St,+Sturbridge,+MA+01566/@42.1132172,-72.1806702,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89e6a3064f54c15d:0xf8bf829cb0421a36!2m2!1d-72.0982694!2d42.1132467?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D">The Barn at Wight Farm, Sturbridge, MA</a></p>
        <p style={styles.text}><b>Time: </b>5:00 PM Ceremony, Reception to Follow</p>
        <p style={styles.text}><b>Dress Code: </b>Casual (aka ties optional, just look nice)</p>

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
