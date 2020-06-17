import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

import Header from './components/Header';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
     const response = await api.post('/repositories', {
      title: `Repositório - ${Date.now()}`,
      url: "https://github.com/Rocketseat/umbriel",
      techs: ["Node", "Express", "TypeScript"]
     });

     const repository = response.data;

     setRepositories([...repositories ,repository ])
  }

  async function handleRemoveRepository(id) {
   
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (err) {
      alert ('Erro ao deletar o repostiorio, tente novamente mais tarde!')
    }

  }

  return (
   
    <div>
      <Header title="Repositories" />
      <ul data-testid="repository-list">
        {repositories.map(repository => (
              <li key={repository.id}>
                  <strong>{repository.title}</strong>
                  <div className='divUrl'>
                    <span>{repository.url}</span>
                  </div>
                      <button  key={repository.id} onClick={() =>handleRemoveRepository(repository.id)}>
                          Remover
                      </button>
              </li>     
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
