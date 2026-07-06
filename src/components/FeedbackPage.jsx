import { useEffect, useMemo, useRef, useState } from 'react';
import { airportGraphs, topAirports } from '../data/extendedAirportGraphs.js';

const ratingOptions = ['5 - Excellent', '4 - Good', '3 - Acceptable', '2 - Needs work', '1 - Poor', 'N/A - Not tested'];
const yesNo = ['Yes', 'No', 'Not sure', 'N/A'];
const devices = ['iPhone', 'Android phone', 'Tablet', 'Laptop/Desktop', 'Other'];
const browsers = ['Chrome', 'Safari', 'Edge', 'Firefox', 'Samsung Internet', 'Other'];
const languages = ['English', 'Spanish', 'French', 'Simplified Chinese', 'Portuguese', 'German', 'Japanese', 'Korean'];
const routePurposes = ['Terminal transfer', 'Baggage claim', 'Rideshare pickup', 'Rental car', 'Public transit', 'Parking', 'Check-in/departure', 'Arrival pickup', 'Other'];

const ratingFields = [
  ['airportSelectionClear', 'Airport selection was easy to understand.'],
  ['routeGeneratedCleanly', 'The app generated a route without crashing or showing blank/undefined text.'],
  ['routeStepsNatural', 'Route steps were easy to follow and sounded natural.'],
  ['timeHelpful', 'The estimated navigation time was easy to find and helpful.'],
  ['safetyUseful', 'Safety notes and reminders were useful without being distracting.'],
  ['languageConsistent', 'The selected language stayed consistent.'],
  ['overallUseful', 'Overall, the app felt useful for airport navigation planning.'],
];

function Field({ label, children }) {
  return <label className="feedback-field"><span>{label}</span>{children}</label>;
}

function SelectField({ label, name, options, value, onChange, disabled = false, placeholder = 'Select' }) {
  const props = value !== undefined ? { value, onChange } : { defaultValue: '' };
  return (
    <Field label={label}>
      <select name={name} disabled={disabled} autoComplete="off" {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const valueText = typeof option === 'string' ? option : option.value;
          const labelText = typeof option === 'string' ? option : option.label;
          return <option key={valueText} value={valueText}>{labelText}</option>;
        })}
      </select>
    </Field>
  );
}

function TextArea({ label, name, placeholder = '' }) {
  return <label className="feedback-field feedback-field-wide"><span>{label}</span><textarea name={name} rows="3" placeholder={placeholder} /></label>;
}

function getValue(data, key) {
  return data[key] || 'Not provided';
}

export default function FeedbackPage() {
  const formRef = useRef(null);
  const [airportCode, setAirportCode] = useState('');
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    formRef.current?.reset();
    setAirportCode('');
    setStart('');
    setDestination('');
  }, []);

  const airportOptions = useMemo(() => topAirports.map((airport) => ({ value: airport.code, label: `${airport.code} — ${airport.name}` })), []);
  const airport = airportCode ? airportGraphs[airportCode] : null;
  const locationOptions = useMemo(() => airport?.nodes?.map((node) => ({ value: node.label, label: node.label })) || [], [airport]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const lines = [
      'Airport Navigator Beta 1.0 Tester Feedback',
      '',
      'Tester and device information',
      `Tester name or initials: ${getValue(data, 'testerName')}`,
      `Email: ${getValue(data, 'email')}`,
      `Date/time tested: ${getValue(data, 'dateTimeTested')}`,
      `Device: ${getValue(data, 'device')}`,
      `Browser: ${getValue(data, 'browser')}`,
      '',
      'Airport and route tested',
      `Airport: ${airportCode ? `${airportCode} — ${airport?.name}` : 'Not provided'}`,
      `Starting point: ${getValue(data, 'startingPoint')}`,
      `Destination: ${getValue(data, 'destination')}`,
      `Route purpose: ${getValue(data, 'routePurpose')}`,
      `Language tested: ${getValue(data, 'languageTested')}`,
      '',
      'Ratings',
      ...ratingFields.flatMap(([name, label]) => [`${label}: ${getValue(data, name)}`, `Comment: ${getValue(data, `${name}Comment`)}`]),
      '',
      'Open feedback',
      `Best part: ${getValue(data, 'bestPart')}`,
      `Most confusing part: ${getValue(data, 'confusingPart')}`,
      `Missing information: ${getValue(data, 'missingInfo')}`,
      `Bug or issue details: ${getValue(data, 'bugDetails')}`,
      `Would recommend wider beta: ${getValue(data, 'recommendBeta')}`,
    ];
    window.location.href = `mailto:info@davarisolutions.com?subject=${encodeURIComponent('Airport Navigator Beta 1.0 Tester Feedback')}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  return (
    <section className="resource-page-card" aria-labelledby="feedback-title">
      <div className="resource-page-topline"><a className="back-link" href="#">← Back to start page</a><span>Beta 1.0</span></div>
      <h2 id="feedback-title">Beta Tester Feedback Form</h2>
      <p className="resource-lede">Use this after testing airport route generation, navigation-time estimates, safety notes, and language support.</p>
      <p className="resource-note feedback-safety-note">Complete this feedback only when safely stopped. Do not use the app while walking through crowds, driving, handling luggage equipment, or crossing airport roadways.</p>

      <form ref={formRef} className="feedback-form" onSubmit={handleSubmit} autoComplete="off">
        <section className="feedback-section-card">
          <h3>Tester and device information</h3>
          <div className="feedback-grid">
            <Field label="Tester name or initials"><input name="testerName" /></Field>
            <Field label="Email (optional)"><input name="email" type="email" /></Field>
            <Field label="Date and time tested"><input name="dateTimeTested" type="datetime-local" /></Field>
            <SelectField label="Device" name="device" options={devices} />
            <SelectField label="Browser" name="browser" options={browsers} />
          </div>
        </section>

        <section className="feedback-section-card">
          <h3>Airport and route tested</h3>
          <div className="feedback-grid">
            <SelectField label="Airport tested" name="airport" options={airportOptions} value={airportCode} onChange={(event) => { setAirportCode(event.target.value); setStart(''); setDestination(''); }} />
            <SelectField label="Starting point" name="startingPoint" options={locationOptions} value={start} onChange={(event) => setStart(event.target.value)} disabled={!airportCode} placeholder={airportCode ? 'Select starting point' : 'Select airport first'} />
            <SelectField label="Destination" name="destination" options={locationOptions} value={destination} onChange={(event) => setDestination(event.target.value)} disabled={!airportCode} placeholder={airportCode ? 'Select destination' : 'Select airport first'} />
            <SelectField label="Route purpose" name="routePurpose" options={routePurposes} />
            <SelectField label="Language tested" name="languageTested" options={languages} />
          </div>
        </section>

        <section className="feedback-section-card">
          <h3>Ratings</h3>
          <div className="feedback-rating-grid">
            {ratingFields.map(([name, label]) => (
              <div className="feedback-rating-row" key={name}>
                <SelectField label={label} name={name} options={ratingOptions} placeholder="Select rating" />
                <TextArea label="Optional comment" name={`${name}Comment`} />
              </div>
            ))}
          </div>
        </section>

        <section className="feedback-section-card">
          <h3>Open feedback</h3>
          <TextArea label="Best part of the app" name="bestPart" />
          <TextArea label="Most confusing part" name="confusingPart" />
          <TextArea label="Missing information" name="missingInfo" />
          <TextArea label="Bug or issue details" name="bugDetails" placeholder="What did you try, what did you expect, and what happened?" />
          <SelectField label="Would you recommend wider beta after fixes?" name="recommendBeta" options={yesNo} />
        </section>

        <p className="resource-note">Selecting Submit opens your default email app with feedback loaded and addressed to info@davarisolutions.com. Please review and send.</p>
        <div className="resource-actions">
          <a className="secondary-button link-button" href="#">Back to start page</a>
          <button className="primary-button link-button" type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
}
