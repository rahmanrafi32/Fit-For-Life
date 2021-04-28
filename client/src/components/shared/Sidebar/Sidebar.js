import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../../App";
import "./Sidebar.css";

const Sidebar = () => {
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
  }, []);

  return (
    <div
      className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4"
      style={{ height: "100vh" }}
    >
      <ul className="list-unstyled">
        <li>
          <Link to="/" className="text-white">
            <span>Home</span>
          </Link>
        </li>
        {
          !isAdmin && <div>
          <li>
            <Link to="/order" className="text-white">
              <span>Order</span>
            </Link>
          </li>
          <li>
            <Link to="/review" className="text-white">
              <span>Review</span>
            </Link>
          </li>
          <li>
            <Link to="/orderList" className="text-white">
              <span>Your Orders</span>
            </Link>
          </li>
        </div>
        }
        {isAdmin && (
          <div>
            <li>
            <Link to="/allOrders" className="text-white">
              <span>Orders</span>
            </Link>
          </li>
            <li>
              <Link to="/addService" className="text-white">
                <span>Add Service</span>
              </Link>
            </li>
            <li>
              <Link to="/makeAdmin" className="text-white">
                <span>Make Admin</span>
              </Link>
            </li>
            <li>
              <Link to="/manageService" className="text-white">
                <span>Manage Services</span>
              </Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
