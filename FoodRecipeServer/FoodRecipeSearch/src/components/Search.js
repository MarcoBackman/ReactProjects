import '../css/searchBar.css';
import DisplaySection from './DisplaySection';
import {BiSearchAlt} from 'react-icons/bi';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ViewRecipe from "./ViewRecipe";
import history from "./History";

function saveKeyIngredients(ingredient_list, ingredient_dictionary) {
    //Must substitute this keyword (No need to be multiline)
    const regex = new RegExp('.*:\\s*|\\s+.\\s+|(\\(.*\\)*)|.*teaspoon(s*)\\s|' +
        '.*tablespoon(s*)\\s*|.*ounce(s*)\\s*|\\s*of\\s*|.*pound(s*)\\s*|a handful of\\s*|' +
        '.*sprinkling of\\s*|.*a drizzle of\\s|.*a big dollop of\\s|' +
        '.*large\\s|.*\\s+ml\\s*|.*\\s*g\\s+|.*thick slice\\s|.*[0-9]\\s|.*big pinch of\\s|' +
        '.*oz\\s|.*tsp(s*)\\s|.*few drop(s*)\\s|.*2mm\\s|.*For decoration\\s|' +
        'such as.*(\\s,)|,.*thinly sliced*.,*|.*cup(s*)\\s|\\sa bit of\\s|' +
        '\\s*blanched\\s+|\\s*smashed\\s*|\\s*finely diced\\s+|' +
        '\\s*drained\\/rinsed\\s+|,\\(*.*\\)|\\s*divided\\s*|' +
        ',*\\sfor.*,*|.*pint(s*)\\s+|\\(*.*\\)|jar(s*)\\s*|tbsp(s*)\\s+' +
        '|.*drizzle(s*)\\s+|.*lb(s*)\\s+|.*bottle(s*)\\s*|.*cm(s*)\\s*|.*in\\s+' +
        '|\\s*.*-.*\\s+|,.*temperature.*|.*fl\\s+|\\s*\\W\\s+|.*[0-9]+ml\\W|[^[:ascii:]]|' +
        '|.*handful(s)*|\\s*pt\\s*|\\s*ib\\s*', 'gmi');

    //Substitute match
    for (let i = 0; i < ingredient_list.length; i++) {
        let searched_ingredient = ingredient_list[i].replace(regex, "").trim();
        if (searched_ingredient !== "") {
            //Split by '/' and ','
            let words = searched_ingredient.split(/[^[:ascii:]]|[0-9]+|\s*,\s*|\s+(?:and|or|as|with)\s+|\s*\/\s*/g);
            for (let word_index = 0; word_index < words.length; word_index++) {
                if (words[word_index].length < 15 && words[word_index].length > 2) {
                    ingredient_dictionary[words[word_index]] = words[word_index];
                }
            }
        }
    }

    //Store final words into dictionary
}

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
            //Percolate ingredient data as well
            data.map(singleRecipe => {
                saveKeyIngredients(singleRecipe.ingredients, props.userData.ingredient_list);
            });
        });
    }

    //Fetch data dynamically(Will load on run)
    useEffect(() => {
        fetchData();
    }, [])

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
        let inputValue = event.target.value.toLowerCase();
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
                           onChange={onValueChange} onPaste={onValueChange} defaultValue="Search Food"/>
                </label>
            </div>
            <div id="recipe_count_block">
                <p id="recipe_count_text">
                    Found <span style={{color:"#8ca8da"}}>{matchData.length}</span>
                    &nbsp;recipe(s) from <span style={{color:"#8ca8da"}}>{data.length}</span>
                    &nbsp;local recipe(s)
                </p>
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
