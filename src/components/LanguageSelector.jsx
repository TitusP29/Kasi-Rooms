import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zu', label: 'Zulu' },
  { code: 'xh', label: 'Xhosa' },
  { code: 'st', label: 'Sesotho' },
  { code: 'ts', label: 'Tsonga' },
  { code: 've', label: 'Venda' },
];

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  return (
    <div style={{ marginBottom: 16, textAlign: 'right' }}>
      <label style={{ marginRight: 8, fontWeight: 500 }}>{t('language')}:</label>
      <select
        value={i18n.language}
        onChange={e => i18n.changeLanguage(e.target.value)}
        style={{ padding: 4, borderRadius: 4 }}
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
