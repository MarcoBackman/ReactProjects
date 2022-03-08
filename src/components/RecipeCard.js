import { MdOutlineFavorite } from 'react-icons/md';
import { GrView } from 'react-icons/gr';

import { MdFavoriteBorder } from 'react-icons/md';
import '../css/recipeCard.css';
import {BiSearchAlt} from "react-icons/bi";
import React from "react";

//<MdFavoriteBorder/> -> for favorite
//MdOutlineFavorite/> -> for unfavorite

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

//For React Router
export function RecipeCardFull(recipe) {

}

function RecipeCard(props){
    let cardData = props.recipe;
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

    return (
        <article className="recipe_card">
            <img className="recipe_img" alt="image" src={cardData.image}>

            </img>
            <h1 className="recipe_name">
                {recipe_name}
            </h1>
            <div className="card_summary">
                <div className="summary_line">
                    <p className="summary_cat">
                        Cook Time:&nbsp;
                    </p>
                    <p>
                        {cook_time}
                    </p>
                </div>
                <div className="summary_line">
                    <p className="summary_cat">
                        Prep Time:&nbsp;
                    </p>
                    <p>
                        {prep_time}
                    </p>
                </div>
                <div className="summary_line">
                    <p className="summary_cat">
                        Yield:&nbsp;
                    </p>
                    <p>
                        {recipe_yield}
                    </p>
                </div>
            </div>
            <div className="button_section">
                <button type="button" className="view_detail" name="view_detail">
                    <GrView/> View Recipe
                </button>
                <button type="button"  className="add_favorite"name="add_favorite">
                    <MdOutlineFavorite/> Add to Favorite
                </button>
            </div>
        </article>
    )
}

export default RecipeCard;
