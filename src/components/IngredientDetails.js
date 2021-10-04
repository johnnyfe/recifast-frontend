import React from 'react';

function IngredientDetails({ingredient}) {

    return (
        <div>
            <b>{ingredient.name}</b>
            <img src={ingredient.image_url} width="200px" alt={ingredient.name}></img>
            <p>{ingredient.calories} calories</p>
            <p>{ingredient.category}</p>
            <p>Price: ${ingredient.price}</p>
            <p>{ingredient.quantity} units</p>
            <p>{ingredient.portion} OZ</p>
        </div>
    );
}

export default IngredientDetails;