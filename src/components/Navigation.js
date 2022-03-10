import '../css/Navigation.css';

import React from "react";
import GroceryList from "./GroceryList";

//contains GroceryList and Users
function Navigation(props){

    let groceryList = props.user.grocery_list;
    let selectedUser = props.user.name;

    //<GroceryList grocery={groceryList}/>

    return (
        <nav className="nav_bar">
            <button id="grocery_btn">
                Grocery List
            </button>
            <p id="user_label">Welcome, {selectedUser}</p>
        </nav>
    )
}

export default Navigation;
