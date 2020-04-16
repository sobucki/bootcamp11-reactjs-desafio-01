import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Rafael",
      techs: ["Node", "Express", "TypeScript"],
    });

    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      setRepositories(repositories.filter((rep) => rep.id !== id));
    }
  }

  const [repositories, setRepositories] = useState([]);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((rep) => {
          return (
            <li key={rep.id}>
              {rep.title}
              <button onClick={() => handleRemoveRepository(rep.id)}>
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
