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
      title: "Êtes vous sûr de vouloir supprimer cette utilisateur ?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Non, annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Supprimé", "L'utilisateur a bien été supprimé", "success");
        deleteUser(user.id);
      }
    });
  };

  return (
    <div className="Card">
      <div className="first-row">
        <span className="first-row-info">id: {user.id}</span>{" "}
        <span className="first-row-info">{user.firstname}</span>{" "}
        <span className="first-row-info">{user.lastname}</span>
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
