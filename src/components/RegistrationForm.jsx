import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    exist: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Le nom d’utilisateur est requis';
    if (!formData.email) newErrors.email = 'L’email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'L’email est invalide';
    if (!formData.password) newErrors.password = 'Le mot de passe est requis';
    else if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Récupérer les anciennes données du local storage
      const existingDataJSON = localStorage.getItem('formData');
      let formDataArray;

      // Si des données existent déjà, les convertir en tableau, sinon initialiser un tableau vide
      if (existingDataJSON) {
        try {
          formDataArray = JSON.parse(existingDataJSON);

          // Vérifier que les données sont bien un tableau
          if (!Array.isArray(formDataArray)) {
            formDataArray = [];
          }
        } catch (error) {
          console.error("Erreur lors du parsing des données : ", error);
          formDataArray = [];
        }
      } else {
        formDataArray = [];
      }

      // Vérifier si l'email existe déjà dans les données
      const emailExists = formDataArray.some(item => item.email === formData.email);

      if (emailExists) {
        // Mise à jour de l'état avec l'erreur d'email existant
        setErrors(prevErrors => ({ ...prevErrors, exist: 'Email existant' }));
      } else {
        // Ajouter les nouvelles données au tableau
        formDataArray.push(formData);

        // Convertir le tableau mis à jour en JSON
        const updatedFormDataJSON = JSON.stringify(formDataArray);

        // Enregistrer les données dans le local storage
        localStorage.setItem('formData', updatedFormDataJSON);

        // Traitement de l'inscription
        console.log('Formulaire soumis', formData);

        // Réinitialiser l'état des erreurs après une soumission réussie
        setErrors({
          username: '',
          email: '',
          password: '',
          exist: ''
        });
      }
    }
  };

  const recupFormData = (e) => {
    e.preventDefault();
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      try {
        const formDataArray = JSON.parse(savedFormData);

        // Vérifier que les données sont bien un tableau avant de les afficher
        if (Array.isArray(formDataArray)) {
          console.log('Données récupérées', formDataArray);
        } else {
          console.error("Les données récupérées ne sont pas un tableau.");
        }
      } catch (error) {
        console.error("Erreur lors du parsing des données récupérées : ", error);
      }
    }
  };


  const clearAllData = () => {
    localStorage.clear();
    console.log('Toutes les données du local storage ont été supprimées');
};

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      {errors.exist && <p style={{ textAlign: 'center', margin: '10px 0', color: 'red' }}>{errors.exist}</p>}

        <div>
          <label>Nom d’utilisateur :</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <button type="submit" style={{ marginRight: '10px' }}>S’inscrire</button>
          <button type="button" style={{ marginRight: '10px' }} onClick={recupFormData}>Tout voir</button>
          <button type="button" onClick={clearAllData}>Tout Effacer</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
