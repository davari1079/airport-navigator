import { languages } from '../i18n/translations.js';

export default function LanguageSelector({ value, onChange, t }) {
  return (
    <section className="guide-card language-card">
      <label htmlFor="language-select">{t.languageLabel}</label>
      <select id="language-select" value={value} onChange={(event) => onChange(event.target.value)}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </section>
  );
}
