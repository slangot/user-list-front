import React from "react";

import "./Card.css";

const Card = ({ user }) => {
  console.log(user);
  return (
    <div className="Card">
      <div className="first-row">
        id: {user.id} {user.firstname} {user.lastname}
      </div>
      <div className="second-row">mail: {user.mail}</div>
      <div className="buttons-column">
        <button>&#9997;</button>
        <button>&#10060;</button>
      </div>
    </div>
  );
};

export default Card;
