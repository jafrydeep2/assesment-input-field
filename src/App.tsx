import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div className="font-sans">
      {t('welcome')}
    </div>
  );
}

export default App;
