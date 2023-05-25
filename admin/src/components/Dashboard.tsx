import {logout} from "../actions/authorizationActions";
import {useDispatch, useSelector} from "react-redux";
import React from "react";

export const Dashboard: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <header>
                <h2>Welcome to the Chocholique Administration Dashboard</h2>
            </header>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div>{/* Placeholder for statistics */}</div>
        </div>
    );
}