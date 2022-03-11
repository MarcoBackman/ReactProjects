import '../css/searchBar.css';
import DisplaySection from './DisplaySection';
import {BiSearchAlt} from 'react-icons/bi';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ViewRecipe from "./ViewRecipe";
import history from "./History";
import GroceryList from "./GroceryList";

function RemoveDefaultInput(event) {
    let value = event.target.value;
    if (value === "Search Food") {
        event.target.value = "";
    }
}

function Search(props) {
    //storage for matched recipe
    const [matchData, setMatchData] = useState([]);
    //selected recipe data
    const [selectedRecipe,setRecipe] = useState(null);
    //original recipe data
    const [data,setData]=useState([]);


    const fetchData = () => {
        fetch("/recipes.json")
            .then(response => {
                return response.json();
            }).then(data => {
            setData(data);
        });
    }

    useEffect(()=>{
        fetchData();
    },[])



    //returns recipe by name, recipe is an array of recipe
    const searchRecipes = (inputValue) => {
        let tempSelectedRecipe = [];
        data.map(singleRecipe => {
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
        setMatchData([]);
        let inputValue = event.target.value;
        if (inputValue === "") {
            setMatchData([]);
        } else if (inputValue === null) {
            setMatchData([]);
        } else {
            setMatchData(searchRecipes(inputValue));
        }
    }

    //set router here
    return (
        <div className="search-bar-section">
            <div className="search-bar">
                <label id="search-label" htmlFor="title_input">
                    <BiSearchAlt/>
                    <input type="text" id="recipe-search-input" name="title_input" onClick={RemoveDefaultInput}
                           onChange={onValueChange} defaultValue="Search Food"/>
                </label>
            </div>
            <BrowserRouter history={history}>
                <Routes>
                    <Route path="*" element={
                        <DisplaySection userData={props.userData}
                                        setUserData={props.setUserData}
                                        recipeList={matchData}
                                        selectedRecipe={selectedRecipe}
                                        setRecipe={setRecipe}
                        />}
                    />
                    <Route exact path="/viewRecipe" element={
                        <ViewRecipe userData={props.userData}
                                    recipe={selectedRecipe}
                        />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Search;
