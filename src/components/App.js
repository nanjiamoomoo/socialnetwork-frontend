import TopBar from "./TopBar";
import Main from "./Main";
import {useState} from "react";
import {TOKEN_KEY} from "../constants";

function App() {
    //if the local storage has the token, then the loggedIn state is true, otherwise is false.
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem(TOKEN_KEY) ? true : false);

    //logout function to remove the token and set loggedIn state to false
    //function will be passed down to child component as props and called in child component
    //to change the state of APP component and trigger re-render.
    const logout = () => {
        console.log("log out");
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    };

    //loggedIn function is called after successfully logged in.
    //the function is to add token in the local storage and set loggedIn state to true.
    //the function will be passed down to child component as props and called in child component
    //to change the state of APP component and trigger re-render.
    const loggedIn = (token) => {
            if (token) {
                localStorage.setItem(TOKEN_KEY, token);
                setIsLoggedIn(true);
            }
    };

    return (
        <div className="App">
            <TopBar isLoggedIn={isLoggedIn} handleLogout={logout}/>
            <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn}/>
        </div>
    );
}

export default App;
