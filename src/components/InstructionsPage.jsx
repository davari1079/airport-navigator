export default function InstructionsPage() {
  return (
    <section className="resource-page-card" aria-labelledby="instructions-title">
      <div className="resource-page-topline">
        <a className="back-link" href="#">← Back to start page</a>
        <span>Beta 1.0</span>
      </div>
      <h2 id="instructions-title">Quick Tester Guide</h2>
      <p className="resource-lede">
        Airport Navigator Beta 1.0 is for tester use only. Always follow posted airport signage and official airport or airline guidance.
      </p>

      <div className="resource-section">
        <h3>What to test</h3>
        <ol className="resource-steps">
          <li><strong>Choose a language.</strong> Use English or any of the 7 added languages. Watch for mixed-language wording.</li>
          <li><strong>Choose an airport.</strong> Pick one of the 20 supported U.S. airports.</li>
          <li><strong>Choose a route.</strong> Select your current location and destination.</li>
          <li><strong>Review the route.</strong> Check the steps, route preview, navigation time, and reminders.</li>
          <li><strong>Submit feedback.</strong> Focus on clarity, trust, timing usefulness, language, and mobile usability.</li>
        </ol>
      </div>

      <div className="resource-section">
        <h3>Tester focus questions</h3>
        <ul className="resource-list">
          <li>Did the route make sense without someone explaining the app?</li>
          <li>Did the estimated navigation time feel helpful and realistic?</li>
          <li>Did the selected language stay consistent throughout the app?</li>
          <li>Did the UI feel welcoming, polished, and easy to use on a phone?</li>
          <li>Would this make you feel more confident in an unfamiliar airport?</li>
        </ul>
      </div>

      <div className="resource-section beta-limit-box">
        <h3>Important beta limits</h3>
        <p>
          Airport Navigator provides route guidance and non-real-time navigation time estimates. It does not include live TSA wait times,
          live train or shuttle outages, live flight status, baggage wait, customs wait, or real-time construction changes.
        </p>
      </div>

      <p className="resource-note">
        Recommended beta test: try 2 airports, 2 languages, and 3 routes total. Take screenshots only if something looks wrong or confusing.
      </p>
      <div className="resource-actions">
        <a className="secondary-button link-button" href="#">Back to start page</a>
        <a className="primary-button link-button" href="#feedback">Open feedback form</a>
      </div>
    </section>
  );
}
