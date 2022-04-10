import '../css/Navigation.css';
import React, {useState} from 'react';
import axios from "axios";

//contains GroceryList and Users
function Navigation(props){
    let groceryList = props.user.grocery_list;
    let favoriteList = props.user.favorite_list;
    let selectedUser = props.user.name;

    const[dropDownGroList, setGroList] = useState([]);
    const[dropDownFavList, setFavList] = useState([]);

    const[dbText, stateFunction] = useState("Populate DB");

    function displayAddPanel() {
        const recipe_add_overlay = document.querySelector('#add_recipe_frame');
        recipe_add_overlay.style.display = 'block';

        //disable scrolls
        const webBody = document.querySelector('body');
        webBody.style.overflow = "hidden";
    }

    function refreshGrocery(e) {
        let list = [];
        for (let i = 0; i <groceryList.length; i++) {
            list.push(groceryList[i]);
        }
        setGroList(list);
    }

    function refreshFavorite(e) {
        let list = [];

        for (const [, value] of Object.entries(favoriteList)) {
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

    async function getpopulateDBRouter() {
        await axios.get('http://52.0.18.184:8080/getPopDBRecipe')
            .then(resp => {
                props.state(resp.data);
            })
            .catch(err => {
                props.state("Server Disconnected");
                console.error(err);
            });

    }

    //Post single request to DB
    async function handlePost(localRecipe) {
        await axios.post('http://52.0.18.184:8080/populate', localRecipe)
            .then(async(resp) => {

            })
            .catch(err => {
                console.error(err);
            });

        getpopulateDBRouter();
    }



    //Fetch local json file
    async function onClickPopulateDB() {
        //Request each of the data
        stateFunction("Populating...");
        const response = await fetch("/recipes.json")
            .then(response => {
                console.log(response.json());
            }).then(data => {
                //allow only 782 of the 787 even recipes.json contains more than 782
                let count = 0;
                data.map(async (singleRecipe) => {
                    if (count < 782 ){
                        handlePost(singleRecipe);
                        ++count;
                    }
                });

                const dbButton = document.querySelector('#populate_btn');
                dbButton.style.display = "none";
                stateFunction("Populate DB");
                alert("Recipe.json added to DB");
            }).catch(err => {
                // Handle Error Here
                stateFunction("Populate DB");
                alert("Error on post Request");
                console.error(err);
            });
    }

    //Prevent default submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        await onClickPopulateDB();
    }

    return (
        <nav className="nav_bar">
            <form id="populate_db_form" action="/populate_db"  method="post"/>
            <button id="populate_btn" className="nav_button" type="submit"
                    form="populate_db_form" value="Submit" onClick={handleSubmit}>
                {dbText}
            </button>
            <button id="add_recipe_btn" className="nav_button" onClick={displayAddPanel}>
                Add Recipe
            </button>
            <select id="grocery_btn" className="nav_button" defaultValue={'DEFAULT'} onClick={refreshGrocery}
                    onChange={onGrocerySelect}>
                <option value='DEFAULT' hidden>Grocery List</option>
                {dropDownGroList.map(item => {
                    return <option className="gro_options" value={item}>{item}</option>
                })}
            </select>
            <select id='favorite_btn' className="nav_button" defaultValue={'DEFAULT'} onClick={refreshFavorite} onChange={onFavSelect}>
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
