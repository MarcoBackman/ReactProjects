import RecipeCard from "./RecipeCard";
import '../css/DisplaySection.css';

function DisplaySection(props) {

    let listOfRecipe = [];

    for (let i = 0; i < props.recipeList.length; i++) {
        listOfRecipe.push(<RecipeCard key={i} recipe={props.recipeList[i]}/>);
    }

    return (
        <section className="displaySection">
            {listOfRecipe}
        </section>
    );
}

export default DisplaySection;
