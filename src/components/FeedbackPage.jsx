import { useMemo, useState } from 'react';
import { airportGraphs, topAirports } from '../data/airportGraphs.js';

const selectOptions = {
  yesNo: ['Yes', 'No'],
  device: ['Phone', 'Tablet', 'Laptop/Desktop', 'Other'],
  browser: ['Chrome', 'Safari', 'Edge', 'Firefox', 'Samsung Internet', 'Other'],
  language: ['English', 'Spanish', 'French', 'Simplified Chinese', 'Portuguese', 'German', 'Japanese', 'Korean'],
  rating: ['5 - Excellent', '4 - Good', '3 - Okay', '2 - Needs work', '1 - Poor'],
};

function Field({ label, name, type = 'text', placeholder = '', children }) {
  return (
    <label className="feedback-field">
      <span>{label}</span>
      {children || <input name={name} type={type} placeholder={placeholder} />}
    </label>
  );
}

function SelectField({ label, name, options, value, onChange, disabled = false, placeholder = 'Select' }) {
  return (
    <Field label={label} name={name}>
      <select name={name} value={value} onChange={onChange} disabled={disabled}>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => {
          const valueText = typeof option === 'string' ? option : option.value;
          const labelText = typeof option === 'string' ? option : option.label;
          return <option key={valueText} value={valueText}>{labelText}</option>;
        })}
      </select>
    </Field>
  );
}

function TextAreaField({ label, name, placeholder = '' }) {
  return (
    <label className="feedback-field feedback-field-wide">
      <span>{label}</span>
      <textarea name={name} rows="3" placeholder={placeholder} />
    </label>
  );
}

export default function FeedbackPage() {
  const [selectedAirportCode, setSelectedAirportCode] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');

  const airportOptions = useMemo(() => topAirports.map((airport) => ({
    value: airport.code,
    label: `${airport.code} — ${airportGraphs[airport.code]?.city || airport.name}`,
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

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const airportLabel = selectedAirport
      ? `${selectedAirport.code} — ${selectedAirport.name}`
      : data.airport || 'Not provided';
    const lines = [
      'Airport Navigator V0.5 Beta Feedback',
      '',
      `Tester name: ${data.testerName || 'Not provided'}`,
      `Email: ${data.email || 'Not provided'}`,
      `Date: ${data.date || 'Not provided'}`,
      '',
      `Device: ${data.device || 'Not provided'}`,
      `Browser: ${data.browser || 'Not provided'}`,
      `Language tested: ${data.languageTested || 'Not provided'}`,
      `Airport: ${airportLabel}`,
      `Starting point: ${data.startingPoint || 'Not provided'}`,
      `Destination: ${data.destination || 'Not provided'}`,
      '',
      'Quick ratings',
      `Route made sense: ${data.routeMadeSense || 'Not provided'}`,
      `Time helpful: ${data.timeHelpful || 'Not provided'}`,
      `Mobile/UI ease: ${data.mobileUiEase || 'Not provided'}`,
      `Traveler confidence: ${data.travelerConfidence || 'Not provided'}`,
      `Mixed-language text: ${data.mixedLanguage || 'Not provided'}`,
      `Any route issue: ${data.routeIssue || 'Not provided'}`,
      `Would recommend: ${data.wouldRecommend || 'Not provided'}`,
      `Would pay/use: ${data.wouldPayOrUse || 'Not provided'}`,
      '',
      'Short comments',
      `Confusing, incorrect, or mixed-language: ${data.confusing || 'Not provided'}`,
      `Liked most: ${data.likedMost || 'Not provided'}`,
      `One improvement before public launch: ${data.improvement || 'Not provided'}`,
      `Additional notes: ${data.additionalNotes || 'Not provided'}`,
      '',
      'Safety note: Airport layouts, gates, security access, and transportation details can change. This beta is for feedback and testing only.',
    ];

    const subject = encodeURIComponent('Airport Navigator V0.5 Beta Feedback');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:info@davarisolutions.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="resource-page-card" aria-labelledby="feedback-title">
      <div className="resource-page-topline">
        <a className="back-link" href="#">← Back to start page</a>
        <span>V0.5 Beta</span>
      </div>
      <h2 id="feedback-title">Feedback Form</h2>
      <p className="resource-lede">Keep it quick: test one route, then complete this form. Use one form per route tested.</p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="feedback-grid">
          <Field label="Tester name (optional)" name="testerName" />
          <Field label="Email (optional)" name="email" type="email" />
          <Field label="Date" name="date" type="date" />
          <SelectField label="Device" name="device" options={selectOptions.device} />
          <SelectField label="Browser" name="browser" options={selectOptions.browser} />
          <SelectField label="Language tested" name="languageTested" options={selectOptions.language} />
          <SelectField
            label="Airport"
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
        </div>

        <h3 className="feedback-subhead">Quick ratings</h3>
        <div className="feedback-grid">
          <SelectField label="Route made sense?" name="routeMadeSense" options={selectOptions.yesNo} />
          <SelectField label="Time helpful?" name="timeHelpful" options={selectOptions.yesNo} />
          <SelectField label="Mobile/UI ease" name="mobileUiEase" options={selectOptions.rating} />
          <SelectField label="Confidence" name="travelerConfidence" options={selectOptions.rating} />
          <SelectField label="Mixed-language text?" name="mixedLanguage" options={selectOptions.yesNo} />
          <SelectField label="Any route issue?" name="routeIssue" options={selectOptions.yesNo} />
          <SelectField label="Would recommend?" name="wouldRecommend" options={selectOptions.yesNo} />
          <SelectField label="Would pay/use?" name="wouldPayOrUse" options={selectOptions.yesNo} />
        </div>

        <h3 className="feedback-subhead">Short comments</h3>
        <TextAreaField label="What was confusing, incorrect, or mixed-language?" name="confusing" />
        <TextAreaField label="What did you like most?" name="likedMost" />
        <TextAreaField label="One improvement before public launch" name="improvement" />
        <TextAreaField label="Additional notes" name="additionalNotes" />

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
