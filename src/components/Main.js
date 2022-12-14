import React, {useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

//This component controls the navigation between Login, Register and Home based on loggedIn status and url
function Main(props) {
    const {isLoggedIn, handleLoggedIn} = props;

    const showLogin = () => {
        return (
            isLoggedIn ?
                <Redirect to="/Home" />
                :
                <Login handleLoggedIn={handleLoggedIn}/>
        )
    }

    const showHome = () => {
        return (
            isLoggedIn ?
                <Home />
                :
                <Redirect to="/login" />
        )
    };

    return (
        <div
            className="main"
        >
            <Switch>
                <Route exact path="/" render={showLogin}/>
                <Route path="/login" render={showLogin}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" render={showHome}/>
            </Switch>
        </div>
    );
}

export default Main;