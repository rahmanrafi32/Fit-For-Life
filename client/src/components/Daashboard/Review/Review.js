import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../../App";
import Sidebar from "../../shared/Sidebar/Sidebar";

const Review = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    const review = {
      User: data.name,
      Address: data.address,
      Description: data.description,
      img: loggedUser.photoURL,
    };

    fetch("https://murmuring-oasis-89652.herokuapp.com/addTestimonials", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(review),
    });
    console.log(review);
  };

  return (
    <div className="container-fluid row">
      <div className="col-md-2">
        <Sidebar></Sidebar>
      </div>
      <div className="col-md-9 offset-md-2">
        <h2 className='m-2'>Review</h2>
        <div className="row">
          <div className="col-md-6">
            <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name='name'
                  placeholder='Name'
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  {...register("address", { required: true })}
                  name="address"
                  placeholder="Address"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  {...register("description", { required: true })}
                  name="description"
                  placeholder="Description"
                  className="form-control"
                  style={{ height: "200px" }}
                />
              </div>
              <input className="btn btn-info" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
