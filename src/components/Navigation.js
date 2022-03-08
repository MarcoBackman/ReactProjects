import '../css/Navigation.css';

import React from "react";
import GroceryList from "./GroceryList";

//contains GroceryList and Users
function Navigation(props){

    let selected_user = props.user.name

    return (
        <nav className="nav_bar">
            <GroceryList/>
            <p id="user_label">Welcome, {selected_user}</p>
        </nav>
    )
}

export default Navigation;
