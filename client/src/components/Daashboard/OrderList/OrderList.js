import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../App";
import Sidebar from "../../shared/Sidebar/Sidebar";

const OrderList = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [orderList, setOrderList] = useState([]);
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

  useEffect(() => {
    axios
      .get(`https://murmuring-oasis-89652.herokuapp.com/order?userEmail=${loggedUser.email}`)
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loggedUser]);

  return (
    <div className="container-fluid row">
      <div className="col-md-2">
        <Sidebar></Sidebar>
      </div>
      <div className=" col-md-9 offset-md-2 text-center">
        <h2>
          Order List of <br />
          {loggedUser.displayName}
        </h2>
      </div>
      <div className="col-md-9 offset-md-2">
        <table className="table m-5">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">TransactionID</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((list) => (
              <tr>
                <td>{list.course}</td>
                <td>{list.price}</td>
                <td>{list.trxId}</td>
                <td>
                  <button className="btn text-danger" disabled="disabled">
                    {list.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
