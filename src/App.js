import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const getRepositories = async () => {
      api.get('/repositories').then((res) => {
        setRepositories(res.data);
        console.log(res.data);
      });
    };

    getRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: 'New Movie',
      url: 'www.google.com.br',
      techs: ['react'],
    };
    await api.post('/repositories', newRepository).then((res) => {
      console.log(res);
      setRepositories([...repositories, res.data]);
    });
  }

  async function handleRemoveRepository(id, index) {
    await api.delete(`/repositories/${id}`);
    let newList = repositories.splice(index, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((curr, index) => {
          return (
            <li key={curr.id}>
              {curr.title}
              <button onClick={() => handleRemoveRepository(curr.id, index)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
