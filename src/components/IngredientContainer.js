import React, { useState, useEffect } from 'react';
import IngredientDetails from './IngredientDetails';
import { BASE_URL } from '../constrains';


function IngredientContainer() {

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(BASE_URL + 'ingredients')
        .then(r => r.json())
        .then(setIngredients)
    }, [])

    function populateIngredients() {
        return ingredients.map((ingredient)=>
            <IngredientDetails  key={ingredient.id} ingredient={ingredient} updateIngredient={updateIngredient} deleteIngredient={deleteIngredient}/>
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

    function deleteIngredient(ingredient){
        fetch(BASE_URL + 'ingredients/' + ingredient.id, {
            method: "DELETE"
        })
        const newingredient = ingredients.filter(p => p.id!== ingredient.id)
        setIngredients(newingredient)
    }


    return (
        <div>
            <div className="recipe-container">{ingredients && populateIngredients()}</div>
        </div>
    );
}

export default IngredientContainer;