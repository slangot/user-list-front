import React from "react";

import Card from "../components/Card";

const Home = () => {
  const fakeData = [
    {
      id: 1,
      firstname: "Emma",
      lastname: "Watson",
      mail: "emma.watson@gmail.com",
    },
    {
      id: 2,
      firstname: "Daniel",
      lastname: "Radcliffe",
      mail: "daniel.radcliffe@gmail.com",
    },
    {
      id: 3,
      firstname: "Rupert",
      lastname: "Grint",
      mail: "rupert.grint@gmail.com",
    },
    {
      id: 4,
      firstname: "Tom",
      lastname: "Felton",
      mail: "tom.felton@gmail.com",
    },
  ];

  return (
    <div className="Home">
      <h1>Gestionnaire des utilisateurs</h1>
      <button>Ajouter</button>
      <ul className="list-container">
        {fakeData.map((user) => (
          <Card user={user} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
