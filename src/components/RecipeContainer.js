import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constrains';

function RecipeContainer() {

    const[recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        fetch(BASE_URL + 'recipes')
        .then(r => r.json())
        .then(data => console.log(data))
    }, [])

    return (
        <div>
            <div className="recipe-container">{recipes}</div>
        </div>
    );
}

export default RecipeContainer;