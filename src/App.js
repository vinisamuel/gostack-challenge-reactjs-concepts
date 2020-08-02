import React, { useState, useEffect } from 'react';

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `New Repository - ${Date.now()}`,
      url: "http://github.com/vinisamuel/rep",
      techs: ["react", "react native"]
    };

    const response = await api.post('repositories', data);
    const newRepository = response.data;

    if (newRepository) {
      setRepositories([...repositories, newRepository]);
    }
  }

  async function handleRemoveRepository(id) {
    const url = `repositories/${id}`;

    const response = await api.delete(url);
    
    if (response.status === 204) {
      document.getElementById(id).remove();
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li id={repository.id} key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
