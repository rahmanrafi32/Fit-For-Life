import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddService from "./components/Daashboard/AddService/AddService";
import AllOrders from "./components/Daashboard/AllOrders/AllOrders";
import MakeAdmin from "./components/Daashboard/MakeAdmin/MakeAdmin";
import ManageService from "./components/Daashboard/ManageService/ManageService";
import Order from "./components/Daashboard/Order/Order";
import OrderList from "./components/Daashboard/OrderList/OrderList";
import Review from "./components/Daashboard/Review/Review";
import Home from "./components/Home/Home/Home";
import GoogleLogin from "./components/Login/GoogleLogin/GoogleLogin";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import NothingFound from "./components/shared/NothingFound/NothingFound";

export const userContext = createContext();
export const orderContext = createContext();
function App() {
  const [loggedUser,setLoggedUser] = useState({});
  const [order,setOrder] = useState({});
  return (
    <userContext.Provider value={[loggedUser,setLoggedUser]}>
      <orderContext.Provider value={[order,setOrder]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <GoogleLogin />
          </Route>
          <PrivateRoute path="/order">
            <Order />
          </PrivateRoute>
          <PrivateRoute path="/allOrders">
            <AllOrders />
          </PrivateRoute>
          <PrivateRoute path="/orderList">
            <OrderList />
          </PrivateRoute>
          <PrivateRoute path="/review">
            <Review />
          </PrivateRoute>
          <PrivateRoute path="/addService">
            <AddService />
          </PrivateRoute>
          <PrivateRoute path="/makeAdmin">
            <MakeAdmin />
          </PrivateRoute>
          <PrivateRoute path="/manageService">
            <ManageService />
          </PrivateRoute>
          <Route to='*'>
            <NothingFound/>
          </Route>
        </Switch>
      </Router>
      </orderContext.Provider>
    </userContext.Provider>
  );
}

export default App;
