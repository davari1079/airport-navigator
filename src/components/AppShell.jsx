import DisclaimerBanner from './DisclaimerBanner.jsx';

export default function AppShell({ children }) {
  return (
    <main className="app-shell">
      {children}
      <DisclaimerBanner />
    </main>
  );
}
