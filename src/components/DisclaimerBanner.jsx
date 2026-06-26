export default function DisclaimerBanner({ t }) {
  return (
    <footer className="disclaimer-banner">
      <strong>{t.travelReminder}:</strong> {t.disclaimerText}
    </footer>
  );
}
