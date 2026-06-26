import DisclaimerBanner from './DisclaimerBanner.jsx';

export default function AppShell({ children, t }) {
  return (
    <main className="app-shell">
      {children}
      <DisclaimerBanner t={t} />
    </main>
  );
}
