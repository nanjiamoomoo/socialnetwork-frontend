import TopBar from "./TopBar";
import Main from "./TopBar";
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

    //logout function to remove the token and set loggedIn state to false
    //function will be passed down to child component as props and called in child component
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
            <Main />
        </div>
    );
}

export default App;
