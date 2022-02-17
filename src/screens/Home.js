import React, { useState, useEffect } from "react";

import Card from "../components/Card";

const Home = () => {
  // Array of front fake datas
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

  const [userData, setUserData] = useState(fakeData);

  const updateUser = (id) => {};

  const deteleUser = (id) => {
    setUserData(userData.filter((user) => user.id != id));
  };

  return (
    <div className="Home">
      <h1>Gestionnaire des utilisateurs</h1>
      <button>Ajouter</button>

      {/* Card list foreach users */}
      <ul className="list-container">
        {userData.map((user, index) => (
          <Card key={index} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
