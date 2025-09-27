import React, { useEffect, useRef, useState } from "react";

interface DetailsSectionProps {
    names: string;
    plusOne: boolean;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ names, plusOne }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    // RSVP modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attending, setAttending] = useState<string | null>(null);
    const [bringingPlusOne, setBringingPlusOne] = useState<string | null>(null);
    const createICSFile = () => {
        const startDate = "20260411T170000"; // 5:00 PM ET
        const endDate = "20260411T210000";   // 9:00 PM ET
        const title = "Wedding of Kylee Rutkiewicz and Grant Perkins";
        const location = "The Barn at Wight Farm, 420 Main St, Sturbridge, MA 01566";
        const description = "Join us for the wedding ceremony and reception!";

        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kylee & Grant Wedding//EN
BEGIN:VEVENT
UID:unique-id-12345@example.com
DTSTAMP:${startDate}Z
DTSTART:${startDate}Z
DTEND:${endDate}Z
SUMMARY:${title}
LOCATION:${location}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR
`.trim();

        // Create a Blob and return a URL for download
        const blob = new Blob([icsContent], { type: "text/calendar" });
        return URL.createObjectURL(blob);
    };


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setVisible(true);
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const handleRSVPSubmit = () => {
        let message = `RSVP for Kylee and Grant's Wedding\n${names}:\nAttending: ${attending}`;
        if (attending === "yes" && plusOne) {
            message += `\nBringing a plus one: ${bringingPlusOne}`;
        }

        // Open SMS app with pre-filled message
        const phoneNumber = "+17742758907"; // dummy number
        const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
        window.location.href = smsLink;
    };

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
            padding: "3rem 2rem",
            borderRadius: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            width: "100%",
            maxWidth: "800px",
            textAlign: "center" as const,
            display: "flex",
            flexDirection: "column" as const,
            gap: "1.25rem",
        },
        greeting: { fontSize: "1.8rem", color: "#3e6161", lineHeight: 1.4, fontWeight: 600 },
        sectionHeading: { fontSize: "1.5rem", color: "#3e6161", marginTop: "1rem", marginBottom: "0.5rem", fontWeight: 600 },
        text: { fontSize: "1.15rem", color: "#333", margin: "0.5rem 0", lineHeight: 1.5 },
        button: { display: "inline-block", marginTop: "2rem", padding: "1rem 2.5rem", fontSize: "1.3rem", fontWeight: "bold", color: "white", backgroundColor: "#3e6161", border: "none", borderRadius: "50px", textDecoration: "none", cursor: "pointer", transition: "background-color 0.3s ease", alignSelf: "center" as const },
        buttonHover: { backgroundColor: "#4d7b7b" },
        link: { color: "#3e6161", textDecoration: "underline" },
        modalOverlay: { position: "fixed" as const, top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 },
        modalContent: { backgroundColor: "white", padding: "2rem", borderRadius: "15px", maxWidth: "400px", width: "90%", textAlign: "center" as const, display: "flex", flexDirection: "column" as const, gap: "1rem" },
        optionButton: { padding: "0.75rem 1.5rem", borderRadius: "50px", border: "1px solid #3e6161", cursor: "pointer", fontWeight: 600 },
        optionButtonSelected: { backgroundColor: "#3e6161", color: "white" },
        modalHeading: {
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "#3e6161",
            marginBottom: "0.5rem",
            lineHeight: 1.4,
        },

    };

    return (
        <section ref={ref} style={styles.container}>
            <div style={styles.card}>
                <p style={styles.greeting}>
                    {names},<br/><br/> Kylee Rutkiewicz and Grant Perkins {plusOne ? "would love for you and your guest" : "would love for you"} to attend our wedding.
                </p>

                <p style={styles.text}><b>Date:</b> April 11, 2026</p>
                <p style={styles.text}>
                    <b>Location:</b>{" "}
                    <a href="https://www.google.com/maps/dir//420+Main+St,+Sturbridge,+MA+01566/@42.1132172,-72.1806702,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89e6a3064f54c15d:0xf8bf829cb0421a36!2m2!1d-72.0982694!2d42.1132467?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D" style={styles.link} target="_blank" rel="noopener noreferrer">
                        The Barn at Wight Farm, Sturbridge, MA
                    </a>
                </p>
                <p style={styles.text}><b>Time:</b> 5:00 PM Ceremony, Reception to Follow</p>
                <p style={styles.text}><b>Dress Code:</b> Cocktail Attire</p>
                <p style={styles.text}><b>Food:</b> Buffet Dinner</p>

                {/* RSVP Button */}
                <button style={styles.button} onClick={() => setIsModalOpen(true)}>
                    RSVP Now
                </button>
                {/* Add to Calendar Button */}
                <a
                    href={createICSFile()}
                    download="Kylee_Grant_Wedding.ics"
                    style={{ ...styles.button, marginTop: "1rem",}}
                >
                    Add to Calendar
                </a>

            </div>

            {/* RSVP Modal */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalHeading}>Will you be attending?</h3>
                        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                            {["yes", "no"].map((option) => (
                                <button
                                    key={option}
                                    style={{
                                        ...styles.optionButton,
                                        ...(attending === option ? styles.optionButtonSelected : {}),
                                    }}
                                    onClick={() => {
                                        setAttending(option);
                                        if (option === "no") setBringingPlusOne(null);
                                    }}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>

                        {attending === "yes" && plusOne && (
                            <>
                                <h3 style={styles.modalHeading}>Will you be bringing a plus one?</h3>
                                <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                                    {["yes", "no"].map((option) => (
                                        <button
                                            key={option}
                                            style={{
                                                ...styles.optionButton,
                                                ...(bringingPlusOne === option ? styles.optionButtonSelected : {}),
                                            }}
                                            onClick={() => setBringingPlusOne(option)}
                                        >
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        <button
                            style={{ ...styles.button, marginTop: "1.5rem" }}
                            disabled={attending === null || (attending === "yes" && plusOne && bringingPlusOne === null)}
                            onClick={handleRSVPSubmit}
                        >
                            Submit
                        </button>

                        <button
                            style={{ ...styles.button, backgroundColor: "#ccc", color: "#333", marginTop: "0.5rem" }}
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </section>
    );
};

export default DetailsSection;
