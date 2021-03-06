import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constrains';
import Recipe from './Recipe';
import RecipeForm from './RecipeForm';
import "../style/RecipeContainer.css"
import { Input } from '@material-ui/core';
import { Search } from '@material-ui/icons';


function RecipeContainer() {

    const[recipes, setRecipes] = useState([]);
    const[currentSearch, setCurrentSearch] = useState("");
    const [errors, setErrors] = useState([]);

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
            <Recipe key={recipe.id} recipe={recipe} errors={errors} updateRecipe={updateRecipe} deleteRecipe={deleteRecipe}/>
        )
    }

    function handleChange(e){
        setCurrentSearch(e.target.value)
    }

    //UPDATE

    function updateRecipe(recipe){
        const newRecipe = recipes.map((r) => {
            if (r.id === recipe.id){
                r = recipe
            }
            return r
        })
        fetch(BASE_URL + 'recipes/' + recipe.id, {
            method: "PATCH",
            body: JSON.stringify(recipe),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                  }
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => setRecipes(newRecipe))
            } else {
              r.json().then((err) => setErrors(err.error));
            }
          })
        
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
            <div className="recipes-components">
                <h1>Recifast</h1>
                
            <div className="recipe-filter">
                <Search></Search><Input onChange={handleChange}></Input>
                <b>SEARCH BY RECIPES</b>
            </div>
                <div className="recipe-container-form"><RecipeForm recipes={recipes} handleAddRecipe={handleAddRecipe}/></div>
                <h2>Recipes</h2>
                <div className="recipe-container">{recipes && populateRecipes()}</div>
            </div>
        </div>
    );
}

export default RecipeContainer;