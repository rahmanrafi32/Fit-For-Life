import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../../App";

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("https://murmuring-oasis-89652.herokuapp.com/isAdmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setAdmin(data));
  }, [loggedUser]);
  return (
    <section className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand text-success" to="/">
          <h3> Fit For Life</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <Link className="nav-link mr-5" to="/">
              Home
            </Link>
            {
              isAdmin ? <Link className="nav-link mr-5" to="/allOrders">
              Admin
            </Link> : <Link className="nav-link mr-5" to="/order">
              Dashboard
            </Link>
            }
            <Link className="nav-link mr-5" to="">
              About
            </Link>
            <Link className="nav-link mr-5" to="#">
              Contact
            </Link>
            {loggedUser?.displayName ? (
              <Link className="nav-link mr-5">{loggedUser.displayName}</Link>
            ) : (
              <Link className="nav-link mr-5" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
