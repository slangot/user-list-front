import React, { useState } from "react";

import "./Card.css";

const Card = ({ user, deleteUser, updateUser }) => {
  // Initialisation of the user data with useState
  const [userFirstname, setUserFirstname] = useState();
  const [userLastname, setUserLastname] = useState();
  const [userMail, setUserMail] = useState();

  const [showUpdateBox, setShowUpdateBox] = useState(false);

  const handleShowUpdateBox = () => {
    setShowUpdateBox(!showUpdateBox);
  };

  // Handlers to set the new states
  const handleFirstname = (firstname) => {
    setUserFirstname(firstname);
  };

  const handleLastname = (lastname) => {
    setUserLastname(lastname);
  };

  const handleMail = (mail) => {
    setUserMail(mail);
  };

  // Function that manage the update of an user
  const handleUpdate = () => {
    updateUser(user.ID, userFirstname, userLastname, userMail);
  };

  // Function that manage the deletion of an user
  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  return (
    <>
      <div className="Card">
        <div className="first-row">
          <span className="first-row-info">ID: {user.ID}</span>
          <span className="first-row-info">{user.firstname}</span>
          <span className="first-row-info">{user.lastname}</span>
        </div>
        <div className="second-row">mail: {user.mail}</div>
        <div className="buttons-column">
          <button onClick={() => handleShowUpdateBox()}>&#9997;</button>
          <button onClick={() => handleDelete(user.ID)}>&#10060;</button>
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
            onChange={(e) => handleFirstname(e.target.value)}
          />
        </div>
        <div className="edit-field">
          <label htmlFor="lastname">Nom :</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder={user.lastname}
            onChange={(e) => handleLastname(e.target.value)}
          />
        </div>
        <div className="edit-field">
          <label htmlFor="mail">Email :</label>
          <input
            type="mail"
            name="mail"
            id="mail"
            placeholder={user.mail}
            onChange={(e) => handleMail(e.target.value)}
          />
        </div>
        <button onClick={() => handleUpdate()}>Modifier</button>
      </div>
    </>
  );
};

export default Card;
