import '../css/searchBar.css';
import DisplaySection from './DisplaySection';
import {BiSearchAlt} from 'react-icons/bi';
import React , { useEffect, useState } from 'react';

function RemoveDefaultInput(event) {
    let value = event.target.value;
    if (value === "Search Food") {
        event.target.value = "";
    }
}

function Search(props) {

    const [data, setData] = useState([]);
    const userData = props.userData;

    //returns recipe by name, recipe is an array of recipe
    const searchRecipes = (inputValue) => {
        let tempSelectedRecipe = [];
        props.recipeData.map(singleRecipe => {
            let recipeName = singleRecipe.name.toLowerCase();
            let recipeDescription = singleRecipe.description.toLowerCase();
            let recipeIngredient = singleRecipe.ingredients;

            if (recipeName.includes(inputValue)) {
                tempSelectedRecipe.push(singleRecipe);
                return true;
            } else if (recipeDescription.includes(inputValue)) {
                tempSelectedRecipe.push(singleRecipe);
                return true;
            } else {
                for (let i = 0; i < recipeIngredient.length; i++) {
                    let ingredient = recipeIngredient[i].toLowerCase();
                    if (ingredient.includes(inputValue)) {
                        tempSelectedRecipe.push(singleRecipe);
                        return true;
                    }
                }
            }
        });
        return tempSelectedRecipe;
    }

    const onValueChange = (event) => {
        //clear existing lists
        setData([])

        let inputValue = event.target.value;

        if (inputValue === "") {
            setData([]);
        } else if (inputValue === null) {
            setData([]);
        } else {
            setData(searchRecipes(inputValue));
        }
    }

    //initial render - always starts first
    return (
        <div className="search-bar-section">
            <div className="search-bar">
                <label id="search-label" htmlFor="title_input">
                    <BiSearchAlt/>
                    <input type="text" id="recipe-search-input" name="title_input" onClick={RemoveDefaultInput}
                           onChange={onValueChange} defaultValue="Search Food"/>
                </label>
            </div>
            <DisplaySection recipeList={data}/>
        </div>
    );
}

export default Search;
