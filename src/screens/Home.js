import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Card from "../components/Card";

import "./Home.css";

const Home = () => {
  // State that will contain the userData from the back
  const [userData, setUserData] = useState();

  // State that allowed to refresh the data
  const [refreshData, setRefreshData] = useState(false);

  // Filter choice state init on lastname
  const [filterChoice, setFilterChoice] = useState("lastname");

  // Mail regex for validation
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleFilterChoice = (choice) => {
    setFilterChoice(choice);
  };

  // New user states
  const [showNewUser, setShowNewUser] = useState(false);
  const [newUserFirstname, setNewUserFirstname] = useState();
  const [newUserLastname, setNewUserLastname] = useState();
  const [newUserMail, setNewUserMail] = useState();

  const handleShowNewUser = () => {
    setShowNewUser(!showNewUser);
  };

  const handleNewUserFirstname = (newValue) => {
    setNewUserFirstname(newValue);
  };

  const handleNewUserLastname = (newValue) => {
    setNewUserLastname(newValue);
  };

  const handleNewUserMail = (newValue) => {
    setNewUserMail(newValue);
  };

  // Function to fetch the user datas from the DB

  const getData = async () => {
    const resData = await axios
      .get(`http://localhost:3001/user/all`)
      .then((result) => {
        // The data from the DB is directly sorted
        const sortedData = result.data.sort(sortByChoice);
        setUserData(sortedData);
      });
  };

  // Function to add a new user
  const insertUser = () => {
    // Email format validation
    if (!newUserMail.match(mailformat)) {
      Swal.fire({
        title: "Email non valide",
        icon: "warning",
        confirmButtonColor: "orange",
        confirmButtonText: "Compris",
      });
      return;
    }
    // Confirm alert displaying the new values
    Swal.fire({
      title: "Confirmer les informations",
      html: `<ul class="confirm-list"><li>Prénom: ${newUserFirstname}</li><li>Nom: ${newUserLastname}</li><li>Email: ${newUserMail}</li></ul>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
    }).then((res) => {
      // If isConfirmed is clicked we send the modification to the back
      if (res.isConfirmed) {
        const insertData = async () => {
          const resData = await axios
            .post(`http://localhost:3001/user/`, {
              firstname: newUserFirstname,
              lastname: newUserLastname,
              mail: newUserMail,
            })
            .then((result) => {
              if (result.status === 200) {
                Swal.fire(
                  "Ajouté",
                  "L'utilisateur a bien été ajouté",
                  "success"
                );
              } else {
                Swal.fire(
                  "Erreur",
                  "Une erreur s'est produite lors de l'ajout",
                  "danger"
                );
              }
            });
        };
        insertData();
        handleShowNewUser();
        setRefreshData(true);
      }
    });
  };

  // Function to update user data
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
      if (mail.match(mailformat)) {
        valuesToUpdate.mail = mail;
        currentMail = valuesToUpdate.mail;
      } else {
        Swal.fire({
          title: "Email non valide",
          icon: "warning",
          confirmButtonColor: "orange",
          confirmButtonText: "Compris",
        });
        return;
      }
    }

    // Confirm alert displaying the actual values (new ones and not changing ones)
    Swal.fire({
      title: "Confirmer les modifications",
      html: `<ul class="confirm-list"><li>Prénom: ${currentFirstname}</li><li>Nom: ${currentLastname}</li><li>Email: ${currentMail}</li></ul>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
    }).then((res) => {
      // If isConfirmed is clicked we send the modification to the back
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
        setRefreshData(true);
      }
    });
  };

  // Function to delete an user
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
        setRefreshData(true);
      }
    });
  };

  // Function to filter by specific choice
  const sortByChoice = (a, b) => {
    console.log("filter : " + filterChoice);
    if (!filterChoice) {
      if (a.lastname < b.lastname) {
        return -1;
      }
      if (a.lastname > b.lastname) {
        return 1;
      }
      return 0;
    } else {
      switch (filterChoice) {
        case "id":
          if (a.ID < b.ID) {
            return -1;
          }
          if (a.ID > b.ID) {
            return 1;
          }
          break;
        case "firstname":
          if (a.firstname < b.firstname) {
            return -1;
          }
          if (a.firstname > b.firstname) {
            return 1;
          }
          break;
        case "lastname":
          if (a.lastname < b.lastname) {
            return -1;
          }
          if (a.lastname > b.lastname) {
            return 1;
          }
          break;
        case "mail":
          if (a.mail < b.mail) {
            return -1;
          }
          if (a.mail > b.mail) {
            return 1;
          }
          break;
        default:
          return 0;
      }
    }
    // if (a.filterChoice < b.filterChoice) {
    //   return -1;
    // }
    // if (a.filterChoice > b.filterChoice) {
    //   return 1;
    // }
    // return 0;
  };

  // UseEffect on mounting component
  useEffect(() => {
    getData();
  }, []);

  // UseEffect when action on the DB has been done
  useEffect(() => {
    if (refreshData) {
      getData();
      setRefreshData(false);
    }
  }, [refreshData]);

  // UseEffect to sort by filter choice
  useEffect(() => {
    if (userData) {
      const sortedData = userData.sort(sortByChoice);
      setUserData(sortedData);
      //setUserData(userData.sort(sortByChoice));
    }
  }, [filterChoice]);

  return (
    <div className="Home">
      <h1>Gestionnaire d'utilisateurs</h1>
      <button
        className={
          showNewUser
            ? "adding-button adding-button-hide"
            : "adding-button adding-button-show"
        }
        onClick={() => handleShowNewUser()}
      >
        &#10133;&nbsp;&nbsp;Ajouter
      </button>

      <div className="filter-container">
        <h5>Filtrer par :</h5>
        <button
          className={
            filterChoice === "id"
              ? "filter-button filter-active"
              : "filter-button"
          }
          onClick={() => handleFilterChoice("id")}
        >
          ID
        </button>
        <button
          className={
            filterChoice === "firstname"
              ? "filter-button filter-active"
              : "filter-button"
          }
          onClick={() => handleFilterChoice("firstname")}
        >
          Prénom
        </button>
        <button
          className={
            filterChoice === "lastname"
              ? "filter-button filter-active"
              : "filter-button"
          }
          onClick={() => handleFilterChoice("lastname")}
        >
          Nom
        </button>
        <button
          className={
            filterChoice === "mail"
              ? "filter-button filter-active"
              : "filter-button"
          }
          onClick={() => handleFilterChoice("mail")}
        >
          Email
        </button>
      </div>

      {/* Container to create a new user */}
      <div
        className={
          showNewUser
            ? "new-user-container new-user-container-show"
            : "new-user-container new-user-container-hide"
        }
      >
        <h3>Ajouter un nouvel utilisateur</h3>
        <button className="close-button" onClick={() => handleShowNewUser()}>
          &#10060;
        </button>
        <div className="new-user-field">
          <label htmlFor="firstname">Prénom :</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Prénom"
            onChange={(e) => handleNewUserFirstname(e.target.value)}
          />
        </div>
        <div className="new-user-field">
          <label htmlFor="lastname">Nom :</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Nom"
            onChange={(e) => handleNewUserLastname(e.target.value)}
          />
        </div>
        <div className="new-user-field">
          <label htmlFor="mail">Email :</label>
          <input
            type="mail"
            name="mail"
            id="mail"
            placeholder="monemail@mail.com"
            onChange={(e) => handleNewUserMail(e.target.value)}
          />
        </div>
        <button className="submit-button" onClick={() => insertUser()}>
          Ajouter
        </button>
      </div>

      {/* Card list foreach users */}
      <ul className="list-container">
        {userData &&
          userData
            .sort()
            .map((user, index) => (
              <Card
                key={index}
                user={user}
                deleteUser={deleteUser}
                updateUser={updateUser}
                refreshData={refreshData}
              />
            ))}
      </ul>
    </div>
  );
};

export default Home;
