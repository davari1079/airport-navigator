export default function BetaResourceTiles() {
  return (
    <section className="beta-resource-card" aria-labelledby="beta-resources-title">
      <div className="beta-resource-heading">
        <span className="beta-kicker">Beta tester tools</span>
        <h2 id="beta-resources-title">Help us improve Airport Navigator</h2>
        <p>Test a route, then use these quick pages to read the guide or send feedback to DavAri.</p>
      </div>
      <div className="beta-resource-grid">
        <a className="beta-resource-tile instructions-tile" href="#instructions">
          <span className="tile-icon" aria-hidden="true">🧭</span>
          <strong>Instructions</strong>
          <small>Quick tester guide, focus questions, and beta limits.</small>
        </a>
        <a className="beta-resource-tile feedback-tile" href="#feedback">
          <span className="tile-icon" aria-hidden="true">✉️</span>
          <strong>Give feedback</strong>
          <small>Fill in a short form and send it by email to DavAri.</small>
        </a>
      </div>
    </section>
  );
}
