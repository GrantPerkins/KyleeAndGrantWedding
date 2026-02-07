import React, { useEffect, useRef, useState } from "react";

interface DetailsSectionProps {
    names: string;
    plusOne: boolean;
    people: string[];
}

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/gcperk20@gmail.com";
const THANK_YOU_URL = "https://yourdomain.com/thanks.html";

const DetailsSection: React.FC<DetailsSectionProps> = ({ names, plusOne, people }) => {
    const ref = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [visible, setVisible] = useState(false);

    // RSVP modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attending, setAttending] = useState<string | null>(null);
    const [peopleAttending, setPeopleAttending] = useState<string[]>([]);
    const [plusOneName, setPlusOneName] = useState<string>("");

    const url = window.location.href;

    /* -----------------------------
       Device detection
    ----------------------------- */
    const isMobile = () =>
        typeof window !== "undefined" &&
        (window.innerWidth < 768 ||
            navigator.maxTouchPoints > 0 ||
            "ontouchstart" in window);

    useEffect(() => {
        if (attending === "yes" && people.length > 1) {
            setPeopleAttending([...people]);
        } else if (people.length === 1) {
            setPeopleAttending([]);
        }
    }, [attending, people]);

    const createICSFile = () => {
        const startDate = "20260411T170000";
        const endDate = "20260411T210000";
        const title = "Wedding of Kylee Rutkiewicz and Grant Perkins";
        const location = "The Barn at Wight Farm, 420 Main St, Sturbridge, MA 01566";
        const description = `Join us for the wedding ceremony and reception!\n\nInvitation for your reference: ${url}`;

        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kylee & Grant Wedding//EN
BEGIN:VEVENT
UID:unique-id-12345@example.com
DTSTAMP:${startDate}Z
DTSTART;TZID=America/New_York:${startDate}
DTEND;TZID=America/New_York:${endDate}
SUMMARY:${title}
LOCATION:${location}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR
`.trim();

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
        let message = `RSVP for Kylee and Grant's Wedding:\nAttending: ${attending}`;

        if (attending === "yes") {
            if (people.length === 1) {
                message += `\nAttending Guest: ${people[0]}`;
            } else if (peopleAttending.length > 0) {
                message += `\nAttending Guests: ${peopleAttending.join(", ")}`;
            }

            if (plusOne) {
                message += `\nPlus one: ${plusOneName.trim() || "Not bringing a plus one"}`;
            }
        }

        message += `\nInvitation: ${url}`;

        // 📱 MOBILE → SMS (unchanged)
        if (isMobile()) {
            const phoneNumber = "+17742758907";
            const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
            window.location.href = smsLink;
            return;
        }

        // 🖥 DESKTOP → FormSubmit
        formRef.current?.submit();
    };

    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4rem 2rem",
            backgroundColor: "#3e6146",
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
        greeting: { fontSize: "1.8rem", color: "#3e6146", lineHeight: 1.4, fontWeight: 600 },
        sectionHeading: { fontSize: "1.5rem", color: "#3e6146", marginTop: "1rem", marginBottom: "0.5rem", fontWeight: 600 },
        text: { fontSize: "1.15rem", color: "#333", margin: "0.5rem 0", lineHeight: 1.5 },
        button: {
            display: "inline-block",
            marginTop: "2rem",
            padding: "1rem 2.5rem",
            fontSize: "1.3rem",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#3e6146",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            alignSelf: "center" as const,
        },
        link: { color: "#3e6146", textDecoration: "underline" },
        modalOverlay: {
            position: "fixed" as const,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
        },
        modalContent: {
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "15px",
            maxWidth: "400px",
            width: "90%",
            textAlign: "center" as const,
            display: "flex",
            flexDirection: "column" as const,
            gap: "1rem",
        },
        optionButton: {
            padding: "0.75rem 1.5rem",
            borderRadius: "50px",
            border: "1px solid #3e6146",
            cursor: "pointer",
            fontWeight: 600,
        },
        optionButtonSelected: { backgroundColor: "#3e6146", color: "white" },
        input: {
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
        },
    };

    return (
        <section ref={ref} style={styles.container}>
            <div style={styles.card}>
                <p style={styles.greeting}>
                    {names},<br /><br />
                    Kylee Rutkiewicz and Grant Perkins {plusOne ? "would love for you and your guest" : "would love for you"} to attend our wedding.
                </p>

                <p style={styles.text}><b>Date:</b> April 11, 2026</p>
                <p style={styles.text}>
                    <b>Location:</b>{" "}
                    <a
                        href="https://www.google.com/maps/dir//420+Main+St,+Sturbridge,+MA+01566"
                        style={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        The Barn at Wight Farm, Sturbridge, MA
                    </a>
                </p>

                <p style={styles.text}><b>Time:</b> 5:00 PM Ceremony, Reception to Follow</p>
                <p style={styles.text}><b>Dress:</b> Cocktail Attire</p>
                <p style={styles.text}><b>Food:</b> Buffet Dinner</p>

                <button style={styles.button} onClick={() => setIsModalOpen(true)}>
                    RSVP By Clicking Here
                </button>

                <a
                    href="https://www.zola.com/registry/grantandkylee2026"
                    style={{ ...styles.button, marginTop: "1rem", textDecoration: "none" }}
                >
                    Wedding Registry
                </a>

                <a
                    href={createICSFile()}
                    download="Kylee_Grant_Wedding.ics"
                    style={{ ...styles.button, marginTop: "1rem", textDecoration: "none" }}
                >
                    Add to Calendar
                </a>
            </div>

            {/* Hidden FormSubmit form (desktop only) */}
            <form
                ref={formRef}
                action={FORMSUBMIT_ENDPOINT}
                method="POST"
                style={{ display: "none" }}
            >
                <input type="hidden" name="_subject" value="Wedding RSVP" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" style={{ display: "none" }} />

                <input type="hidden" name="Attending" value={attending ?? ""} />
                <input
                    type="hidden"
                    name="Guests"
                    value={
                        attending === "yes"
                            ? people.length === 1
                                ? people[0]
                                : peopleAttending.join(", ")
                            : ""
                    }
                />
                <input
                    type="hidden"
                    name="Plus One"
                    value={plusOne ? plusOneName || "None" : "N/A"}
                />
                <input type="hidden" name="Invitation URL" value={url} />
            </form>

            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3>{people.length === 1 ? "Will you be attending?" : "Will any of you be attending?"}</h3>

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
                                        if (option === "no") {
                                            setPeopleAttending([]);
                                            setPlusOneName("");
                                        }
                                    }}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>

                        {attending === "yes" && people.length > 1 && (
                            <>
                                <h3>Who will be attending?</h3>
                                {people.map((person) => (
                                    <label key={person}>
                                        <input
                                            type="checkbox"
                                            checked={peopleAttending.includes(person)}
                                            onChange={() =>
                                                setPeopleAttending((prev) =>
                                                    prev.includes(person)
                                                        ? prev.filter((p) => p !== person)
                                                        : [...prev, person]
                                                )
                                            }
                                        />{" "}
                                        {person}
                                    </label>
                                ))}
                            </>
                        )}

                        {attending === "yes" && plusOne && (
                            <>
                                <h3>Plus one name (leave blank if none)</h3>
                                <input
                                    style={styles.input}
                                    type="text"
                                    placeholder="Guest's full name"
                                    value={plusOneName}
                                    onChange={(e) => setPlusOneName(e.target.value)}
                                />
                            </>
                        )}

                        <button
                            style={styles.button}
                            disabled={attending === null}
                            onClick={handleRSVPSubmit}
                        >
                            Next
                        </button>

                        <button
                            style={{ ...styles.button, backgroundColor: "#ccc", color: "#333" }}
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
