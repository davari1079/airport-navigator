export default function InstructionsPage() {
  return (
    <section className="resource-page-card" aria-labelledby="instructions-title">
      <div className="resource-page-topline"><a className="back-link" href="#">← Back to start page</a><span>Beta 1.0</span></div>
      <h2 id="instructions-title">Beta Quick Tester Guide</h2>
      <p className="resource-lede">Use this guide to test Airport Navigator Beta 1.0 consistently.</p>
      <ol className="instruction-list">
        <li>Use your phone if possible so the mobile experience is tested.</li>
        <li>Choose a language and confirm labels stay consistent.</li>
        <li>Select an airport, then choose a starting point and destination.</li>
        <li>Review the route, estimated time, safety notes, and step-by-step instructions.</li>
        <li>Use Change Route and the browser/mobile back button to confirm navigation behaves correctly.</li>
        <li>Return to the start page and use the Feedback tile to send results.</li>
      </ol>
      <p className="resource-note">Focus on ease of use, route clarity, useful time estimates, language consistency, confusing text, incorrect routes, broken buttons, or mobile layout issues.</p>
      <div className="resource-actions"><a className="primary-button link-button" href="#">Back to start page</a></div>
    </section>
  );
}
