import DisclaimerBanner from './DisclaimerBanner.jsx';

export default function AppShell({ children, t }) {
  return (
    <main className="app-shell" lang={t.htmlLang || t.lang} dir={t.dir || 'ltr'}>
      {children}
      <DisclaimerBanner t={t} />
    </main>
  );
}
