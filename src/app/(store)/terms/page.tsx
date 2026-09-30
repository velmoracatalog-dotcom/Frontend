import { PolicyPoints } from "@/components/pages/PolicyPoints";
import { termsSections } from "@/lib/privacy";

export default function TermsPage() {
  return (
    <PolicyPoints
      eyebrow="The House"
      title="Terms of Use"
      copy="The terms that apply when you browse, sign in, or place an order at Velmora."
      sections={termsSections}
    />
  );
}
