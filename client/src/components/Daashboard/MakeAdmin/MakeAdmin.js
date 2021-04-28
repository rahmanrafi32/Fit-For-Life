import React from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../shared/Sidebar/Sidebar';

const MakeAdmin = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (data,e) => {
      e.target.reset();
      const admin = {
        admin : data.email
      }

      fetch('https://murmuring-oasis-89652.herokuapp.com/addAdmins',{
        method: 'POST',
        headers:{'content-type':'application/json'},
        body: JSON.stringify(admin)
    })
    };

    return (
        <div className="container-fluid row">
      <div className="col-md-2">
        <Sidebar></Sidebar>
      </div>
      <div className="col-md-9 offset-md-1">
        <h2>Add Admin</h2>
        <div className="row">
          <div className="col-md-6">
            <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="Email"
                  className="form-control"
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

export default MakeAdmin;