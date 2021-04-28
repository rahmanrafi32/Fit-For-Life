import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../../shared/Sidebar/Sidebar";

const AddService = () => {

  const { register, handleSubmit, watch, errors } = useForm();
  const [img,setImg] = useState(null);

  const handleImage = (e) =>{
    console.log(e.target.files);
    const imgData = new FormData();
    imgData.set('key','3870c154d57c9cf79d3e734926dc16fe');
    imgData.append('image', e.target.files[0]);

    axios.post('https://api.imgbb.com/1/upload', imgData)
    .then(function (response) {
      console.log(response.data.data.display_url);
      setImg(response.data.data.display_url);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const onSubmit = (data) => {
    const service = {
      Title: data.title,
      Description: data.description,
      img: img,
      price: data.price,
    }

    fetch('https://murmuring-oasis-89652.herokuapp.com/addServices', {
      method: 'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(service)
    })
  };

  return (
    <div className="container-fluid row">
      <div className="col-md-2">
        <Sidebar></Sidebar>
      </div>
      <div className="col-md-9 offset-md-1">
        <h2>Add Services</h2>
        <div className="row">
          <div className="col-md-6">
            <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  {...register("title", { required: true })}
                  name="title"
                  placeholder="Title"
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
              <div className="form-group">
                <input
                  type="text"
                  {...register("price", { required: true })}
                  name="price"
                  placeholder="price"
                  className="form-control"
                />
              </div>
              <div>
                <input type="file" onChange={handleImage} name="img" />
              </div>
              <br/>
              <input className="btn btn-info" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
