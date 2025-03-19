import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState("");
  const receipeSection = React.useRef(null)

  React.useEffect(function(){
    if(recipe!=="" && receipeSection.current!==null){
      receipeSection.current.scrollIntoView({behaviour:"smooth"})
    }
  },[recipe])

  async function getRecipe() {
    const recipeMarkDown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkDown);
    
  }

  async function fetchRecipe() {
    const ListOfIngredients = ingredients;
    const recipe = await getRecipeFromMistral(ListOfIngredients);
    console.log(recipe);
}

fetchRecipe();

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ref = {receipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
