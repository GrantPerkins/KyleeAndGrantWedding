import React from "react";
import tiktok from "./tiktok.jpg";
import tiktok_mobile from "./tiktok_mobile.jpg"

const HomePage: React.FC = () => {
  const isMobile = window.innerWidth < 768;

  const handleDownload = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Kylee & Grant's Wedding
DESCRIPTION:Save the Date for Kylee & Grant's wedding at The Barn at Wight Farm, Sturbridge, MA
LOCATION:The Barn at Wight Farm, 420 Main St, Sturbridge, MA 01566
DTSTART;VALUE=DATE:20260411
DTEND;VALUE=DATE:20260412
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Kylee_and_Grant_Wedding.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  const styles = {
    container: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: isMobile ? "column" as const : "row" as const,
      overflow: "hidden",
      backgroundColor: "#3e6146",
      color: "white",
    },
    desktopWrapper: {
      display: "flex",
      flexDirection: "row" as const,
      width: "100%",
      height: "100%",
    },
    textSection: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: isMobile ? "center" as const : "flex-start" as const,
      textAlign: isMobile ? "center" as const : "left" as const,
      width: isMobile ? "100%" : "50%",
      height: "100%",
      padding: isMobile ? "1rem 1.5rem" : "4rem",
      boxSizing: "border-box" as const,
      gap: "1rem",
    },
    topText: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    title: {
      fontSize: "clamp(2rem, 5vw, 4rem)",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: isMobile ? "clamp(1.2rem, 3vw, 2rem)" : "clamp(1.5rem, 2.5vw, 2rem)",
      fontWeight: "bold",
    },
    dateLocation: {
      fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
      fontWeight: "normal",
    },
    link: {
      color: "white",
      fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
      textDecoration: "none",
    },
    button: {
      marginTop: isMobile ? "0.5rem" : "2rem",
      backgroundColor: "white",
      color: "#3e6146",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "9999px",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "transform 0.2s ease",
    },
    imageSection: {
      width: isMobile ? "100%" : "50%",
      height: isMobile ? "35vh" : "100%",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      borderRadius: isMobile ? "0.75rem" : "0",
    },
    detailsSection: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: isMobile ? "center" as const : "flex-start" as const,
      justifyContent: "center",
      gap: "0.5rem",
      flexShrink: 0,
    },
    mobileWrapper: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      width: "100%",
      height: "100%",
      padding: "1rem 1.5rem",
      boxSizing: "border-box" as const,
      textAlign: "center" as const,
      overflowY: "scroll" as const,
      scrollbarWidth: "thin" as const,
      scrollbarColor: "#888 #3e6146",
    },
    // Chrome / Safari scrollbar
    scrollBarStyle: `
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #3e6146;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
      }
    `,
  };

  // Inject scrollbar styles
  React.useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.scrollBarStyle;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <section style={styles.container}>
      {isMobile ? (
        <div style={styles.mobileWrapper}>
          <div style={styles.topText}>
            <h1 style={styles.title}>Save the Date</h1>
            <p style={styles.subtitle}>Kylee Rutkiewicz & Grant Perkins are getting married!</p>
          </div>

          <div style={styles.imageSection}>
            <img src={tiktok_mobile} alt="Kylee and Grant" style={styles.image} />
          </div>

          <div style={styles.detailsSection}>
            <p style={styles.dateLocation}>April 11, 2026</p>
            <a
              href="https://www.google.com/maps/dir//420+Main+St,+Sturbridge,+MA+01566"
              style={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sturbridge, MA
            </a>
            <p style={styles.dateLocation}>Formal Invitation to Follow</p>
            <button
              style={styles.button}
              onClick={handleDownload}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              Add to Calendar
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.desktopWrapper}>
          <div style={styles.textSection}>
            <h1 style={styles.title}>Save the Date</h1>
            <p style={styles.subtitle}>Kylee Rutkiewicz & Grant Perkins are getting married!</p>
            <p style={styles.dateLocation}>April 11, 2026</p>
            <p style={styles.dateLocation}>
              <a
                href="https://www.google.com/maps/dir//420+Main+St,+Sturbridge,+MA+01566"
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Sturbridge, MA
              </a>
              <p style={styles.dateLocation}>Formal Invitation to Follow</p>
            </p>
            <button
              style={styles.button}
              onClick={handleDownload}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              Add to Calendar
            </button>
          </div>
          <div style={styles.imageSection}>
            <img src={tiktok} alt="Kylee and Grant" style={styles.image} />
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;
