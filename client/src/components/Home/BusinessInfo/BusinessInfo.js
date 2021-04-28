import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderContext } from "../../../App";
import "./BusinessInfo.css";

const BusinessInfo = () => {
  const [order, setOrder] = useContext(orderContext);
  const [courses, setCourses] = useState([]);

  const handleClick = (id) => {
    axios
      .get(`https://murmuring-oasis-89652.herokuapp.com/services/${id}`)
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("https://murmuring-oasis-89652.herokuapp.com/services")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section className="text-center mt-3">
      <h2 className="text-info">OUR SERVICES</h2>
      <div className="d-flex justify-content-center">
        <div className="w-75 row">
          {courses.map((course) => (
            <div className="col-md-4">
              <Link to="/order" style={{ textDecoration: "none" }}>
                <div
                  onClick={() => handleClick(`${course._id}`)}
                  className={`text-center info-card`}
                >
                  <div className="mr-3">
                    <img
                      src={course.img}
                      className="img-fluid"
                      style={{ width: "50px" }}
                      alt=""
                    />
                  </div>
                  <div>
                    <h5>{course.Title}</h5>
                    <hr />
                    <small>{course.Description}</small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessInfo;
