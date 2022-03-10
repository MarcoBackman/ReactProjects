import React, {useEffect, useState} from "react";
import '../css/ViewRecipe.css';
import {MdOutlineFavorite} from "react-icons/md";
import {AiOutlineCloseCircle} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function ViewRecipe(props) {
    let cardData = props.recipe;
    let userGrocery = props.userData.grocery_list;
    let navigate = useNavigate();

    console.log(cardData);

    //Given example: PT30M, PT1H, PT1H30M
    function convertTime(rawData) {
        //Remove PT first
        let hours_taken = false;
        let hour = "00";
        let min = "00";
        let data = rawData.replace("PT", "");
        let str = "";
        //iterate Until 'H' and 'M'
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 'H' && !hours_taken) {
                if (str.length === 1) {
                    hour = "0" + str;
                    str = "";
                } else if (str.length === 2) {
                    hour = str;
                    str = "";
                }
                hours_taken = true;
            }

            if (data[i] === 'M') {
                if (str.length === 1) {
                    min = "0" + str;
                } else if (str.length === 2) {
                    min = str;
                }
            }
            str += data[i];
        }
        return "" + hour + ":" + min;
    }

    let refinedData = (cardData) => {
        let recipe_name = cardData.name.replace("&amp;", "&")
            .replace("&gt;", ">")
            .replace("&lt;", "<")
            .replace("&quot;", '"');

        let cook_time = "N/A", prep_time = "N/A", recipe_yield = "N/A";

        if (cardData.cookTime !== "") {
            cook_time = convertTime(cardData.cookTime);
        }

        if (cardData.prepTime !== "") {
            prep_time = convertTime(cardData.prepTime);
        }

        if (cardData.recipeYield !== "") {
            recipe_yield = cardData.recipeYield;
        }

        console.log(recipe_name);
        console.log(cook_time);
        console.log(prep_time);


        return {
            recipe_name: recipe_name,
            cook_time: cook_time,
            prep_time : prep_time,
            recipe_yield: recipe_yield};
    }

    function addGrocery(ingredient) {
        userGrocery.push(ingredient);
        console.log("added");
    }

    function CreateIngredientList(ingredients) {
        const listItems = ingredients.map((ingredient) =>
            <li key={ingredient.toString()}>
                {ingredient}
                <button onClick={() => addGrocery(ingredient)}>+</button>
            </li>
        );
        return (<ul> {listItems} </ul>);
    }

    //Make cardData and refine Data as useState
    return (
        <article className="full_recipe_card">
            <AiOutlineCloseCircle className="closeBtn" onClick={(e) => navigate(-1)}/>
            <img className="full_recipe_img" alt="image" src={cardData.image}/>
            <h1 className="full_recipe_name">
                {refinedData(cardData).recipe_name} Recipe
            </h1>
            <div className="full_card_summary">
                <div className="full_summary_line">
                    <p className="full_summary_cat">
                        Cook Time:&nbsp;
                    </p>
                    <p>
                        {refinedData(cardData).cook_time}
                    </p>
                </div>
                <div className="full_summary_line">
                    <p className="full_summary_cat">
                        Prep Time:&nbsp;
                    </p>
                    <p>
                        {refinedData(cardData).prep_time}
                    </p>
                </div>
                <div className="full_summary_line">
                    <p className="full_summary_cat">
                        Yield:&nbsp;
                    </p>
                    <p>
                        {refinedData(cardData).recipe_yield}
                    </p>
                </div>
            </div>
            <div className="description_section">
                <p>
                    {cardData.description}
                </p>
            </div>
            <div className="ingredients_section">
                {CreateIngredientList(cardData.ingredients)}
            </div>
            <div className="button_section">
                <button type="button"  className="add_favorite"name="add_favorite">
                    <MdOutlineFavorite/> Add to Favorite
                </button>
            </div>
        </article>
    );
}

export default ViewRecipe;