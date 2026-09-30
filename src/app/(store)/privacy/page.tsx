import { PolicyPoints } from "@/components/pages/PolicyPoints";
import { privacySections } from "@/lib/privacy";

export default function PrivacyPage() {
  return (
    <PolicyPoints
      eyebrow="The House"
      title="Privacy Policy"
      copy="How Velmora collects, uses, and looks after your details. We never sell your information."
      sections={privacySections}
    />
  );
}
