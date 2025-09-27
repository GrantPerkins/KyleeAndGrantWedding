import React from "react";
import { useParams } from "react-router-dom";
import invitations from "./invitations.json";
import HeroSection from "./HeroSection";
import DetailsSection from "./DetailsSection";

const InvitationPage: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const invitation = invitations.find((i) => i.uuid === uuid);

  if (!invitation) {
    return (
      <div style={{ textAlign: "center", padding: "5rem" }}>
        <h1>Invitation not found</h1>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <DetailsSection names={invitation.names} plusOne={invitation.plusOne} />
    </div>
  );
};

export default InvitationPage;
