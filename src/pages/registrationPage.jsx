// src/pages/RegistrationPage.jsx
import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import styles from './RegistrationPage.module.css'; // Importer le module CSS

const RegistrationPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>Inscription</h1> {/* Appliquer la classe */}
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
