import React, { useState } from "react";

import Swal from "sweetalert2";

import "./Card.css";

const Card = ({ user, deleteUser, updateUser }) => {
  // Initialisation of the user data with useState
  const [userFirstname, setUserFirstname] = useState(user.firstname);
  const [userLastname, setUserLastname] = useState(user.lastname);
  const [userMail, setUserMail] = useState(user.mail);

  const [showUpdateBox, setShowUpdateBox] = useState(false);

  const handleShowUpdateBox = () => {
    setShowUpdateBox(!showUpdateBox);
  };

  // Function that manage the update of an user
  const handleUpdate = () => {
    Swal.fire({
      title: "Confirmer les modifications",
      html: `<ul class="confirm-list"><li>${userFirstname}</li><li>${userLastname}</li><li>${userMail}</li></ul>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Modifié", "L'utilisateur a bien été modifié", "success");
        updateUser(user.id, userFirstname, userLastname, userMail);
      }
    });
  };

  // Function that manage the deletion of an user
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
    <>
      <div className="Card">
        <div className="first-row">
          <span className="first-row-info">id: {user.id}</span>
          <span className="first-row-info">{user.firstname}</span>
          <span className="first-row-info">{user.lastname}</span>
        </div>
        <div className="second-row">mail: {user.mail}</div>
        <div className="buttons-column">
          <button onClick={() => handleShowUpdateBox()}>&#9997;</button>
          <button onClick={() => handleDelete()}>&#10060;</button>
        </div>
      </div>
      <div
        className={
          showUpdateBox
            ? "edit-container edit-container-show"
            : "edit-container edit-container-hide"
        }
      >
        <div className="edit-field">
          <label htmlFor="firstname">Prénom :</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder={user.firstname}
            onChange={(e) => setUserFirstname(e.target.value)}
          />
        </div>
        <div className="edit-field">
          <label htmlFor="lastname">Nom :</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder={user.lastname}
            onChange={(e) => setUserLastname(e.target.value)}
          />
        </div>
        <div className="edit-field">
          <label htmlFor="mail">Email :</label>
          <input
            type="mail"
            name="mail"
            id="mail"
            placeholder={user.mail}
            onChange={(e) => setUserMail(e.target.value)}
          />
        </div>
        <button onClick={() => handleUpdate()}>Modifier</button>
      </div>
    </>
  );
};

export default Card;
