import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../../App";
import Navbar from "../../shared/Navbar/Navbar";
import firebaseConfig from "../firebaseConfig";

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const GoogleLogin = () => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  const [loggedUser, setLoggedUser] = useContext(userContext);

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoggedUser(user);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const email = error.email;
        setLoggedUser(errorMessage);
      });
  };
  return (
    <div>
        <Navbar/>
        <div className="text-center m-5">
      <h1 className="m-5">Login Here</h1>
      <button onClick={handleGoogleSignIn} className="btn btn-success">
        Sign In With Google
      </button>
      {loggedUser?.email ? (
        <p className="m-3 text-success">Login Successful</p>
      ) : (
        <p className="m-3 text-danger">{loggedUser?.errorMessage}</p>
      )}
    </div>
    </div>
  );
};

export default GoogleLogin;
