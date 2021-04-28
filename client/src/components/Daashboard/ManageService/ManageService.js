import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../App';
import Sidebar from '../../shared/Sidebar/Sidebar';


const ManageService = () => {
    const [isAdmin, setAdmin] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loggedUser, setLoggedUser] = useContext(userContext);

  useEffect(() => {
    fetch("http://localhost:3001/isAdmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setAdmin(data));
  }, [loggedUser]);

  useEffect(() => {
    
  }, []);

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

  const handleDelete =(id)=>{
    fetch(`https://murmuring-oasis-89652.herokuapp.com/services/${id}`,{
        method:'DELETE'
    }).then(res=> res.json()) 
}
    return (
        <div className="container-fluid row">
            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className=" col-md-9 offset-md-2">
            {
                isAdmin && <div className='container mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Service</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                courses.map(course=>
                                <tr>
                                    <td>{course.Title}</td>
                                    <td>$ {course.price}</td>  
                                    <td><button onClick={()=>handleDelete(`${course._id}`)} className='btn btn-danger'>Delete</button></td>  
                                </tr>) 
                            }
                    </tbody>
                </table>
                </div>
            }
            </div>
        </div>
    );
};

export default ManageService;