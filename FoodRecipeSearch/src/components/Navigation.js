import '../css/Navigation.css';
import React, {useState} from 'react';

//contains GroceryList and Users
function Navigation(props){
    let groceryList = props.user.grocery_list;
    let favoriteList = props.user.favorite_list;
    let selectedUser = props.user.name;

    const[dropDownGroList, setGroList] = useState([]);
    const[dropDownFavList, setFavList] = useState([]);

    function refreshGrocery(e) {
        let list = [];
        for (let i = 0; i <groceryList.length; i++) {
            list.push(groceryList[i]);
        }
        setGroList(list);
    }

    function refreshFavorite(e) {
        let list = [];

        for (const [key, value] of Object.entries(favoriteList)) {
            list.push(value.name);
        }
        setFavList(list);
    }

    //Remove on select
    function onGrocerySelect(e) {
        const select = document.querySelector('#grocery_btn');
        let selectedItem = select.value;
        let index = groceryList.indexOf(selectedItem);
        if (index !== -1) {
            console.log("Deleted");
            select.removeChild(selectedItem);
            groceryList.splice(index, 1);
        }
        select.value = "DEFAULT";
    }

    function onFavSelect(e) {
        const select = document.querySelector('#favorite_btn');
        let selectedRecipe = select.value;
        if(selectedRecipe in favoriteList) {
            delete favoriteList[selectedRecipe];
        }
        select.value = "DEFAULT";
    }

    return (
        <nav className="nav_bar">
            <select id="grocery_btn" defaultValue={'DEFAULT'} onClick={refreshGrocery}
                    onChange={onGrocerySelect}>
                <option value='DEFAULT' hidden>Grocery List</option>
                {dropDownGroList.map(item => {
                    return <option className="gro_options" value={item}>{item}</option>
                })}
            </select>
            <select id='favorite_btn' defaultValue={'DEFAULT'} onClick={refreshFavorite} onChange={onFavSelect}>
                <option value='DEFAULT' hidden>Favorite List</option>
                {dropDownFavList.map(item => {
                    return <option className="fav_options" key={item} value={item}>{item}</option>
                })}
            </select>
            <p id="user_welcome">Welcome, {selectedUser}</p>
        </nav>
    )
}

export default Navigation;
