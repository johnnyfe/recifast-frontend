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
            <IngredientDetails  key={ingredient.id} ingredient={ingredient}/>
        )
    }


    return (
        <div>
            <div className="recipe-container">{ingredients && populateIngredients()}</div>
        </div>
    );
}

export default IngredientContainer;