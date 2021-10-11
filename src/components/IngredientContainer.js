import React, { useState, useEffect } from 'react';
import Ingredient from './Ingredient';
import { BASE_URL } from '../constrains';
import IngredientForm from './IngredientForm';
import  '../style/IngredientContainer.css'


function IngredientContainer() {

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(BASE_URL + 'ingredients')
        .then(r => r.json())
        .then(setIngredients)
    }, [])

    function populateIngredients() {
        return ingredients.map((ingredient)=>
            <Ingredient key={ingredient.id} ingredient={ingredient} updateIngredient={updateIngredient} deleteIngredient={deleteIngredient}/>
        )
    }

    function updateIngredient(ingredient){
        fetch(BASE_URL + 'ingredients/' + ingredient.id, {
            method: "PATCH",
            body: JSON.stringify(ingredient),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                  }
        });
        const newIngredient = ingredients.map((i) => {
            if (i.id === ingredient.id){
                i = ingredient
            }
            return i
        })
        setIngredients(newIngredient)
    }

    function handleAddIngredient(newIngredient){
        const updatedIngredient = ([...ingredients, newIngredient])
        return setIngredients(updatedIngredient)
    }

    function deleteIngredient(ingredient) {
        fetch(BASE_URL + 'ingredients/' + ingredient.id, {
            method: "DELETE"
        })
        const ingredientToDelete = ingredients.filter(r => r.id !== ingredient.id)
        setIngredients(ingredientToDelete)
    }


    return (
        <div className="all-ingredients-components">
            <h1>Ingredients</h1>
            <div className="ingredient-form"><IngredientForm handleAddIngredient={handleAddIngredient}/></div><br/>
            <div className="ingredients-container">{ingredients && populateIngredients()}</div>
        </div>
    );
}

export default IngredientContainer;