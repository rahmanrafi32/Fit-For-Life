import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../App";
import Sidebar from "../../shared/Sidebar/Sidebar";

const AllOrders = () => {
  const [orderList, setOrderList] = useState([]);
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

  useEffect(() => {
    axios.get(`https://murmuring-oasis-89652.herokuapp.com/orders`)
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleStatus = (id, value) => {
    const status = value;
    fetch(`https://murmuring-oasis-89652.herokuapp.com/orders/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  return (
    <div>
      <div className="col-md-2">
        <Sidebar></Sidebar>
      </div>
      {
        isAdmin && <div className="col-md-9 offset-md-2">
        <h2 className="text-center">
          Welcome Admin
          <br />
          {loggedUser.displayName}
        </h2>
        <table className="table m-5">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Email</th>
              <th scope="col">Price</th>
              <th scope="col">TransactionID</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((list) => (
              <tr>
                <td>{list.course}</td>
                <td>{list.userEmail}</td>
                <td>{list.price}</td>
                <td>{list.trxId}</td>
                <td>
                  <div className="d-flex">
                    <button
                      onClick={() => {
                        handleStatus(`${list._id}`, "pending");
                      }}
                      className="btn btn-info m-1"
                    >
                      pending
                    </button>
                    <button
                      onClick={() => {
                        handleStatus(`${list._id}`, "processing");
                      }}
                      className="btn btn-info m-1"
                    >
                      processing
                    </button>
                    <button
                      onClick={() => {
                        handleStatus(`${list._id}`, "done");
                      }}
                      className="btn btn-info m-1"
                    >
                      done
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </div>
  );
};

export default AllOrders;
