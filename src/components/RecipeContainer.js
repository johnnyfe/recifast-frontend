import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constrains';
import Recipe from './Recipe';
import RecipeForm from './RecipeForm';

function RecipeContainer() {

    const[recipes, setRecipes] = useState([]);
    const[currentSearch, setCurrentSearch] = useState("");
    

    //READ
    
    useEffect(() => {
        fetch(BASE_URL + 'recipes')
        .then(r => r.json())
        .then(setRecipes)
    }, [])

    const recipesToDisplay = recipes.filter((recipe) =>{
        return (recipe.name.toLowerCase().includes(currentSearch.toLowerCase()))
    })

    function populateRecipes() {
        return recipesToDisplay.map((recipe)=>
            <Recipe key={recipe.id} recipe={recipe}  updateRecipe={updateRecipe} deleteRecipe={deleteRecipe}/>
        )
    }

    function handleChange(e){
        setCurrentSearch(e.target.value)
    }

    //UPDATE

    function updateRecipe(recipe){
        fetch(BASE_URL + 'recipes/' + recipe.id, {
            method: "PATCH",
            body: JSON.stringify(recipe),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                  }
        });
        const newRecipe = recipes.map((r) => {
            if (r.id === recipe.id){
                r = recipe
            }
            return r
        })
        setRecipes(newRecipe)
    }

    //DELETE

    function deleteRecipe(recipe) {
        fetch(BASE_URL + 'recipes/' + recipe.id, {
            method: "DELETE"
        })
        const recipeToDelete = recipes.filter(r => r.id !== recipe.id)
        setRecipes(recipeToDelete)
    }

    //CREATE

    function handleAddRecipe(newRecipe){
        const updatedValue = ([...recipes, newRecipe])
        return setRecipes(updatedValue)
    }


    return (
        <div className="recipes-components-container">
            <h1>Recifast</h1>
            <div className="recipe-filter">
               <p>Find recipe:</p>
                <input onChange={handleChange}></input> 
            </div>
            <div className="recipe-container-form"><RecipeForm handleAddRecipe={handleAddRecipe}/></div>
            <div className="recipe-container">{recipes && populateRecipes()}</div>
        </div>
    );
}

export default RecipeContainer;