import { Button, FormLabel, Input } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../constrains';

function IngredientRecipeForm({ newIngredients, recipe, handleAddRecipe }) {

    const [ingredientName, setIngredientName] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState({});
    const [actionHide, setActionHide] = useState(true);

    function displayedIngredient(e) {
        e.preventDefault();
        console.log(newIngredients)
        console.log(ingredientName)
        const singleIngredient = newIngredients.filter((ingredient)=>{
            if(ingredientName !== null){
                return ingredient.name.toLowerCase().includes(ingredientName.toLowerCase())    
            }
                
        })
            setSelectedIngredient(singleIngredient);
    }

    function handleChangeIngredient(e){
        setIngredientName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(selectedIngredient[0].id)
        console.log(recipe.id)
        const newCookingList = {
                ingredient_id: selectedIngredient[0].id,
                recipe_id: recipe.id
            }
        fetch(BASE_URL + "cooking_lists", {
            method: "POST",
            body: JSON.stringify(newCookingList),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(handleAddRecipe(selectedIngredient[0]));
            
    }


    return (
        <div>
            {actionHide ? (
            <form onSubmit={displayedIngredient}>
                <FormLabel>Insert ingredient name:</FormLabel>
                <Input value={ingredientName} onChange={handleChangeIngredient}></Input><br/>
                <Button type="submit">Get ingredient</Button>
                <Button onClick={() => setActionHide(false)}>Submit</Button>
            </form>
            ): (
            <form onSubmit={handleSubmit}>
                <Button type="submit">Submit</Button>
            </form>)}
            
        </div>
    );
}

export default IngredientRecipeForm;