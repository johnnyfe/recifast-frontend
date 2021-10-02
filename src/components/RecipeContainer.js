import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constrains';
import Recipe from './Recipe';

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
            <Recipe recipe={recipe} key={recipe.id}/>
        )
    }

    function handleChange(e){
        setCurrentSearch(e.target.value)
    }

    return (
        <div>
            <p>Find recipe:</p>
            <input onChange={handleChange}></input>
            <div className="recipe-container">{recipes && populateRecipes()}</div>
        </div>
    );
}

export default RecipeContainer;