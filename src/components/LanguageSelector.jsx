import { languages } from '../i18n/translations.js';

export default function LanguageSelector({ value, onChange, t }) {
  return (
    <section className="guide-card selector-card compact-selector">
      <label htmlFor="language">{t.language}</label>
      <select id="language" value={value} onChange={(event) => onChange(event.target.value)}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>{language.label}</option>
        ))}
      </select>
    </section>
  );
}
