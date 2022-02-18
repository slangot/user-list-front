import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Card from "../components/Card";

import "./Home.css";

const Home = () => {
  const [userData, setUserData] = useState();

  const getData = async () => {
    const resData = await axios
      .get(`http://localhost:3001/user/all`)
      .then((result) => {
        setUserData(result.data);
        console.log(result.data);
      });
  };

  const updateUser = (id, firstname, lastname, mail) => {
    // Object that will contain the keys and values and that will be send to the back
    const valuesToUpdate = {
      id: id,
    };

    let currentFirstname;
    let currentLastname;
    let currentMail;

    // If key is updated we set the key and the new value into the valuesToUpdate object
    // Else if the key is NOT updated we set the old value by default
    const getCurrentUserInfo = userData.find((user) => user.ID === id);
    currentFirstname = getCurrentUserInfo.firstname;
    currentLastname = getCurrentUserInfo.lastname;
    currentMail = getCurrentUserInfo.mail;

    if (firstname) {
      valuesToUpdate.firstname = firstname;
      currentFirstname = valuesToUpdate.firstname;
    }

    if (lastname) {
      valuesToUpdate.lastname = lastname;
      currentLastname = valuesToUpdate.lastname;
    }

    if (mail) {
      valuesToUpdate.mail = mail;
      currentMail = valuesToUpdate.mail;
    }

    Swal.fire({
      title: "Confirmer les modifications",
      html: `<ul class="confirm-list"><li>Prénom: ${currentFirstname}</li><li>Nom: ${currentLastname}</li><li>Email: ${currentMail}</li></ul>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
    }).then((res) => {
      if (res.isConfirmed) {
        const updateData = async () => {
          const resData = await axios
            .put(`http://localhost:3001/user/`, valuesToUpdate)
            .then((result) => {
              if (result.status === 200) {
                Swal.fire(
                  "Modifié",
                  "L'utilisateur a bien été modifié",
                  "success"
                );
              } else {
                Swal.fire(
                  "Erreur",
                  "Une erreur s'est produite lors de la modification",
                  "danger"
                );
              }
            });
        };

        updateData();
      }
    });
  };

  const deleteUser = (userId) => {
    Swal.fire({
      title: "Êtes vous sûr de vouloir supprimer cette utilisateur ?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Non, annuler",
    }).then((res) => {
      if (res.isConfirmed) {
        const deleteData = async () => {
          const resData = await axios
            .delete(`http://localhost:3001/user/${userId}`)
            .then((result) => {
              if (result.status === 200) {
                Swal.fire(
                  "Supprimé",
                  "L'utilisateur a bien été supprimé",
                  "success"
                );
              }
            });
        };
        deleteData();
        getData();
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Home">
      <h1>Gestionnaire d'utilisateurs</h1>
      <button className="adding-button">Ajouter</button>

      {/* Card list foreach users */}
      <ul className="list-container">
        {userData &&
          userData.map((user, index) => (
            <Card
              key={index}
              user={user}
              deleteUser={deleteUser}
              updateUser={updateUser}
            />
          ))}
      </ul>
    </div>
  );
};

export default Home;
