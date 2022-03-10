import '../css/GroceryList.css';

import React from "react";

function createLists(items) {
    const listItems = items.map((item) =>
        <li key={item.toString()}>
            {item}
        </li>
    );
    return (<ul> {listItems} </ul>);
}

//contains GroceryList and Users
function GroceryList(props){
    const grocery_list = props.grocery;

    return (
        <div class={grocery_list}>
            {createLists}
        </div>
    );
}

export default GroceryList;