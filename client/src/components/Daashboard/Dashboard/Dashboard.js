import React, { useContext } from 'react';
import { userContext } from '../../../App';
import Sidebar from '../../shared/Sidebar/Sidebar';

const Dashboard = () => {
    const [loggedUser, setLoggedUser] = useContext(userContext);
    return (
        <section>
            <div className="container-fluid row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className='col-md-9 offset-md-1'>
                    <h1><span className='text-info'>{loggedUser.displayName}</span><br/> Welcome to Dashboard</h1>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;