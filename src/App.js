// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/registrationPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
  );
};
 
export default App;
