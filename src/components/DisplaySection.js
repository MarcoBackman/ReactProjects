import RecipeCard from "./RecipeCard";
import '../css/DisplaySection.css';
import React from "react";

//Display for search results
function DisplaySection(props) {

    let listOfRecipe = [];

    for (let i = 0; i < props.recipeList.length; i++) {
        listOfRecipe.push(<RecipeCard key={i}
                                      recipeNumber={i}
                                      recipe={props.recipeList[i]}
                                      userData={props.userData}
                                      setUserData={props.setUserData}
                                      setRecipe={props.setRecipe}/>);
    }

    return (
        <div>
            <section className="displaySection">
                {listOfRecipe}
            </section>
        </div>
    );
}

export default DisplaySection;
