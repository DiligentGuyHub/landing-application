import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Login} from "./components/Login";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "./reducers/RootReducer";
import {Dashboard} from "./components/Dashboard";
import {logout} from "./actions/authorizationActions";

function App() {
    const isAuthorized = useSelector((state: RootState) => state.authorization.isAuthorized);

    return (
        <div>
            {isAuthorized ? (
                <Dashboard/>
            ) : (
                <Login/>
            )}
        </div>
    );
}

export default App;
