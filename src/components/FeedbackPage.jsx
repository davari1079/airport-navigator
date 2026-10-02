import { useEffect, useMemo, useRef, useState } from 'react';
import { airportGraphs, topAirports } from '../data/airportGraphs.js';
import './FeedbackPage.css';

const ratingOptions = [
  '5 - Strongly agree / Excellent',
  '4 - Agree / Good',
  '3 - Acceptable, could improve',
  '2 - Disagree / Needs work',
  '1 - Strongly disagree / Poor',
  'N/A - Not tested',
];

const selectOptions = {
  yesNo: ['Yes', 'No', 'Not sure', 'N/A'],
  device: ['iPhone', 'Android phone', 'Tablet', 'Laptop/Desktop', 'Other'],
  browser: ['Chrome', 'Safari', 'Edge', 'Firefox', 'Samsung Internet', 'Other'],
  connection: ['Wi-Fi', 'Cellular service', 'Offline/local testing', 'Mixed connection', 'Other'],
  timezone: ['Eastern Time', 'Central Time', 'Mountain Time', 'Pacific Time', 'UTC', 'Other'],
  language: ['English', 'Spanish', 'French', 'Simplified Chinese', 'Portuguese', 'German', 'Japanese', 'Korean'],
  routePurpose: ['Terminal transfer', 'Baggage claim', 'Rideshare pickup', 'Rental car', 'Public transit', 'Parking', 'Check-in/departure', 'Arrival pickup', 'Other'],
  repeatability: ['One time only', 'Every time I tried the same steps', 'Could not repeat it', 'Not sure', 'N/A'],
  screenshot: ['No', 'Yes', 'N/A'],
  readiness: ['Yes', 'No', 'Not sure', 'After fixes only'],
  finalRating: ['5 - Excellent', '4 - Good', '3 - Acceptable', '2 - Needs work', '1 - Poor'],
};

const ratingSections = [
  {
    title: 'Route generation and route result',
    fields: [
      ['airportSelectionClear', 'The airport selection was easy to understand and I could find the correct airport without confusion.'],
      ['locationNamesClear', 'The starting point and destination lists used clear names that matched how a traveler would describe the airport.'],
      ['routeGeneratedCleanly', 'The app generated a route without crashing, freezing, showing a blank result, or showing undefined text.'],
      ['routeShowedEndpoints', 'The route result clearly showed my starting point and destination.'],
      ['routeStepsNatural', 'The route steps were easy to follow and used natural full-sentence instructions.'],
      ['routeModeContext', 'The route steps gave enough context to understand whether to walk, take a train, take a shuttle, or use another airport system.'],
    ],
  },
  {
    title: 'Navigation-time estimate and confidence',
    fields: [
      ['timeEasyToFind', 'The estimated navigation-time range was easy to find and easy to understand.'],
      ['timeBreakdownHelpful', 'The walking, ride or shuttle, and expected wait breakdown helped me understand where the time estimate came from.'],
      ['confidenceLabelClear', 'The timing confidence label, such as Source-backed, High, Estimated, or Limited, was clear and not misleading.'],
      ['noLiveDataConfusion', 'The app did not make me think it was using live TSA wait times, live train status, live crowd levels, live construction status, or live flight data.'],
      ['timeWordingClear', 'When exact timing was not available, the wording made it clear that the time was an estimate and not guaranteed live data.'],
    ],
  },
  {
    title: 'Safety notes and traveler reminders',
    fields: [
      ['safetyVisible', 'The safety reminders were visible without distracting from the route instructions.'],
      ['confirmInfoReminder', 'The app reminded me to confirm signs, security access, terminal assignments, and airline information when needed.'],
      ['securityContextClear', 'The app made it clear when a route may involve airside, landside, or security-screening considerations.'],
      ['advisoryUseful', 'The advisory or watch-out message gave useful context without sounding alarming or confusing.'],
    ],
  },
  {
    title: 'Language support feedback',
    intro: 'Complete this section if you tested a language other than English.',
    fields: [
      ['interfaceLanguage', 'The main interface labels appeared in the selected language.'],
      ['dropdownLanguage', 'The dropdown labels and route result labels appeared in the selected language.'],
      ['stepsLanguage', 'The route step instructions appeared in the selected language and read naturally.'],
      ['timingLanguage', 'The timing labels and confidence labels appeared in the selected language.'],
      ['buttonsLanguage', 'Buttons and action labels appeared in the selected language.'],
      ['mixedLanguageCheck', 'I did not notice mixed-language text except for airport names, airport codes, terminal names, and branded systems such as Plane Train, Skylink, AirTrain, ATS, PHX Sky Train, or MIA Mover.'],
    ],
  },
  {
    title: 'Final recommendation',
    fields: [
      ['overallUseful', 'Overall, the app felt useful for airport navigation planning.'],
      ['recommendTraveler', 'I would recommend this app to a traveler who needs help moving through a major U.S. airport.'],
      ['readyWiderBeta', 'I believe the app is ready for a wider beta test after any issues I listed are reviewed.'],
    ],
  },
];

const checklistFields = [
  ['testedCompleteRoute', 'I tested at least one complete route from a valid start location to a valid destination.'],
  ['routeIncludedCoreInfo', 'I checked that the route result included a start point, destination, navigation time or timing note, confidence label, route steps, and safety or reminder notes.'],
  ['issueDetailProvided', 'I described any issue in full sentences with enough detail for the developer to repeat it.'],
  ['screenshotsAttached', 'I attached screenshots if I found a visual issue, translation issue, blank screen, crash, or confusing route result.'],
];

function Field({ label, name, type = 'text', placeholder = '', required = false, children, className = '' }) {
  return (
    <label className={`feedback-field ${className}`.trim()}>
      <span>{label}</span>
      {children || <input name={name} type={type} placeholder={placeholder} required={required} autoComplete="off" />}
    </label>
  );
}

function SelectField({ label, name, options, value, onChange, disabled = false, placeholder = 'Select', className = '' }) {
  const controlledProps = value !== undefined
    ? { value, onChange }
    : { defaultValue: '' };

  return (
    <Field label={label} name={name} className={className}>
      <select name={name} disabled={disabled} autoComplete="off" {...controlledProps}>
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

function TextAreaField({ label, name, placeholder = '', rows = 3 }) {
  return (
    <label className="feedback-field feedback-field-wide">
      <span>{label}</span>
      <textarea name={name} rows={rows} placeholder={placeholder} />
    </label>
  );
}

function RatingRow({ name, label }) {
  return (
    <div className="feedback-rating-row">
      <SelectField label={label} name={name} options={ratingOptions} placeholder="Select 1–5 rating" />
      <TextAreaField label="Optional comment" name={`${name}Comment`} rows={2} />
    </div>
  );
}

function getValue(data, key) {
  return data[key] || 'Not provided';
}

export default function FeedbackPage() {
  const formRef = useRef(null);
  const [selectedAirportCode, setSelectedAirportCode] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    setSelectedAirportCode('');
    setStartingPoint('');
    setDestination('');
    formRef.current?.reset();
  }, []);

  const airportOptions = useMemo(() => topAirports.map((airport) => ({
    value: airport.code,
    label: `${airport.code} — ${airportGraphs[airport.code]?.name || airport.name}`,
  })), []);

  const selectedAirport = selectedAirportCode ? airportGraphs[selectedAirportCode] : null;
  const locationOptions = useMemo(() => {
    if (!selectedAirport?.nodes) return [];
    return selectedAirport.nodes.map((node) => ({
      value: node.label,
      label: node.label,
    }));
  }, [selectedAirport]);

  function handleAirportChange(event) {
    setSelectedAirportCode(event.target.value);
    setStartingPoint('');
    setDestination('');
  }

  function addRatingSection(lines, data, section) {
    lines.push('', section.title);
    section.fields.forEach(([name, label]) => {
      lines.push(`${label}: ${getValue(data, name)}`);
      lines.push(`Comment: ${data[`${name}Comment`] || 'None'}`);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const airportLabel = selectedAirport
      ? `${selectedAirport.code} — ${selectedAirport.name}`
      : data.airport || 'Not provided';

    const lines = [
      'Airport Navigator Beta 1.0 Tester Feedback',
      '',
      'Safety confirmation: Tester was instructed to complete feedback only when safely stopped.',
      '',
      'Tester and device information',
      `Tester name or initials: ${getValue(data, 'testerName')}`,
      `Email: ${getValue(data, 'email')}`,
      `Date/time tested: ${getValue(data, 'dateTimeTested')}`,
      `Time zone: ${getValue(data, 'timeZone')}`,
      `Device: ${getValue(data, 'device')}`,
      `Browser: ${getValue(data, 'browser')}`,
      `Connection type: ${getValue(data, 'connectionType')}`,
      '',
      'Airport and route tested',
      `Airport: ${airportLabel}`,
      `Starting point: ${getValue(data, 'startingPoint')}`,
      `Destination: ${getValue(data, 'destination')}`,
      `Route purpose: ${getValue(data, 'routePurpose')}`,
      `Language tested: ${getValue(data, 'languageTested')}`,
      `Language test used same route: ${getValue(data, 'languageSameRoute')}`,
    ];

    ratingSections.forEach((section) => addRatingSection(lines, data, section));

    lines.push(
      '',
      'Open-ended feedback',
      `Best part of the app: ${getValue(data, 'bestPart')}`,
      `Most confusing part: ${getValue(data, 'mostConfusingPart')}`,
      `Missing information: ${getValue(data, 'missingInformation')}`,
      `Trust and confidence: ${getValue(data, 'trustConfidence')}`,
      `Suggested improvement: ${getValue(data, 'suggestedImprovement')}`,
      '',
      'Bug report details',
      `What I tried: ${getValue(data, 'bugTried')}`,
      `What I expected: ${getValue(data, 'bugExpected')}`,
      `What happened: ${getValue(data, 'bugHappened')}`,
      `Repeatability: ${getValue(data, 'bugRepeatability')}`,
      `Screenshot attached: ${getValue(data, 'screenshotAttached')}`,
      `Screenshot file name/details: ${getValue(data, 'screenshotDetails')}`,
      '',
      'Final overall rating',
      `Overall rating: ${getValue(data, 'finalOverallRating')}`,
      '',
      'Submission checklist',
    );

    checklistFields.forEach(([name, label]) => {
      lines.push(`${label}: ${getValue(data, name)}`);
    });

    const subject = encodeURIComponent('Airport Navigator Beta 1.0 Tester Feedback');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:info@davarisolutions.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="resource-page-card" aria-labelledby="feedback-title">
      <div className="resource-page-topline">
        <a className="back-link" href="#">← Back to start page</a>
        <span>Beta 1.0</span>
      </div>
      <h2 id="feedback-title">Beta Tester Feedback Form</h2>
      <p className="resource-lede">
        Use this form after testing airport route generation, navigation-time estimates, safety notes, and language support.
      </p>
      <p className="resource-note feedback-safety-note">
        Important safety note: Complete this feedback only when safely stopped. Do not use the app while walking through crowds, driving, handling luggage equipment, or crossing airport roadways.
      </p>
      <p className="resource-note">
        Rating scale: 1 means strongly disagree or very poor. 3 means acceptable but could be improved. 5 means strongly agree or excellent.
      </p>

      <form ref={formRef} className="feedback-form" onSubmit={handleSubmit} autoComplete="off">
        <section className="feedback-section-card">
          <h3 className="feedback-subhead">Tester and device information</h3>
          <div className="feedback-grid">
            <Field label="Tester name or initials" name="testerName" placeholder="Initials are okay" />
            <Field label="Email (required)" name="email" type="email" required />
            <Field label="Date and time tested" name="dateTimeTested" type="datetime-local" />
            <SelectField label="Time zone" name="timeZone" options={selectOptions.timezone} placeholder="Select time zone" />
            <SelectField label="Device" name="device" options={selectOptions.device} placeholder="Select device" />
            <SelectField label="Browser" name="browser" options={selectOptions.browser} placeholder="Select browser" />
            <SelectField label="Connection type" name="connectionType" options={selectOptions.connection} placeholder="Select connection" />
          </div>
        </section>

        <section className="feedback-section-card">
          <h3 className="feedback-subhead">Airport and route tested</h3>
          <p className="feedback-section-lede">Please test at least one complete route. If you test more than one route, complete this section for the route that best represents your feedback.</p>
          <div className="feedback-grid">
            <SelectField
              label="Airport tested"
              name="airport"
              options={airportOptions}
              value={selectedAirportCode}
              onChange={handleAirportChange}
              placeholder="Select airport"
            />
            <SelectField
              label="Starting point"
              name="startingPoint"
              options={locationOptions}
              value={startingPoint}
              onChange={(event) => setStartingPoint(event.target.value)}
              disabled={!selectedAirportCode}
              placeholder={selectedAirportCode ? 'Select starting point' : 'Select airport first'}
            />
            <SelectField
              label="Destination"
              name="destination"
              options={locationOptions}
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              disabled={!selectedAirportCode}
              placeholder={selectedAirportCode ? 'Select destination' : 'Select airport first'}
            />
            <SelectField label="Route purpose" name="routePurpose" options={selectOptions.routePurpose} placeholder="Select route purpose" />
            <SelectField label="Language tested" name="languageTested" options={selectOptions.language} placeholder="Select language" />
            <SelectField label="Language test used same route?" name="languageSameRoute" options={selectOptions.yesNo} placeholder="Select" />
          </div>
        </section>

        {ratingSections.map((section) => (
          <section className="feedback-section-card" key={section.title}>
            <h3 className="feedback-subhead">{section.title}</h3>
            {section.intro && <p className="feedback-section-lede">{section.intro}</p>}
            <div className="feedback-rating-grid">
              {section.fields.map(([name, label]) => (
                <RatingRow key={name} name={name} label={label} />
              ))}
            </div>
          </section>
        ))}

        <section className="feedback-section-card">
          <h3 className="feedback-subhead">Open-ended feedback</h3>
          <TextAreaField label="Best part of the app" name="bestPart" placeholder="What worked best and why was it helpful?" />
          <TextAreaField label="Most confusing part" name="mostConfusingPart" placeholder="What was most confusing, unclear, or frustrating?" />
          <TextAreaField label="Missing information" name="missingInformation" placeholder="What did you expect to see but could not find?" />
          <TextAreaField label="Trust and confidence" name="trustConfidence" placeholder="Would you trust this app to help plan an airport transfer? What would increase your confidence?" />
          <TextAreaField label="Suggested improvement" name="suggestedImprovement" placeholder="One specific improvement that would make the app more useful." />
        </section>

        <section className="feedback-section-card">
          <h3 className="feedback-subhead">Bug report details</h3>
          <p className="feedback-section-lede">If you saw a bug, describe what you tried, what you expected, what actually happened, and whether you could repeat it.</p>
          <TextAreaField label="What I tried" name="bugTried" />
          <TextAreaField label="What I expected" name="bugExpected" />
          <TextAreaField label="What happened" name="bugHappened" placeholder="Include error messages, blank screens, incorrect labels, or incorrect routes." />
          <div className="feedback-grid">
            <SelectField label="Repeatability" name="bugRepeatability" options={selectOptions.repeatability} placeholder="Select" />
            <SelectField label="Screenshot attached?" name="screenshotAttached" options={selectOptions.screenshot} placeholder="Select" />
            <Field label="Screenshot file name/details" name="screenshotDetails" placeholder="Optional" />
          </div>
        </section>

        <section className="feedback-section-card">
          <h3 className="feedback-subhead">Final overall rating and checklist</h3>
          <SelectField label="Final overall rating" name="finalOverallRating" options={selectOptions.finalRating} placeholder="Select rating" />
          <div className="feedback-checklist-grid">
            {checklistFields.map(([name, label]) => (
              <SelectField key={name} label={label} name={name} options={selectOptions.yesNo} placeholder="Select" />
            ))}
          </div>
        </section>

        <p className="resource-note">
          Selecting Submit opens your default email app with the feedback loaded and addressed to info@davarisolutions.com. Please review and send the email.
        </p>
        <div className="resource-actions">
          <a className="secondary-button link-button" href="#">Back to start page</a>
          <button className="primary-button link-button" type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
}
