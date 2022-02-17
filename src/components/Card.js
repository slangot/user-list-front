import React from "react";

import Swal from "sweetalert2";

import "./Card.css";

const Card = ({ user, deleteUser }) => {
  const handleUpdate = () => {
    Swal.fire({
      title: "Modifier un utilisateur",
      text: "Verifier les infos utilisateurs",
      icon: "success",
      confirmButtonText: "Modifier",
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Supprimer un utilisateur",
      text: "Supprimer l'utilisateurs",
      icon: "error",
      confirmButtonText: "Supprimer",
    }).then((result) => {
      deleteUser(user.id);
      Swal.fire("Utilisateur supprimé", "", "success");
    });
  };

  console.log(user);
  return (
    <div className="Card">
      <div className="first-row">
        id: {user.id} {user.firstname} {user.lastname}
      </div>
      <div className="second-row">mail: {user.mail}</div>
      <div className="buttons-column">
        <button onClick={() => handleUpdate()}>&#9997;</button>
        <button onClick={() => handleDelete()}>&#10060;</button>
      </div>
    </div>
  );
};

export default Card;
