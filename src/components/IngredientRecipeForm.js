import { Button, FormLabel, Input } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../constrains';
import Error from '../style/Error';

function IngredientRecipeForm({ newIngredients, recipe, handleAddIngredientRecipe }) {

    const [ingredientName, setIngredientName] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [actionHide, setActionHide] = useState(true);
    const [ingredientId, setIngredientId] = useState([])
    const [errors, setErrors] = useState([]);

    function displayedIngredient(e) {
        e.preventDefault();
        console.log(newIngredients)
        console.log(ingredientName)
        const singleIngredient = newIngredients.filter((ingredient)=>{
            if(ingredientName.length > 0){
                return ingredient.name.toLowerCase().includes(ingredientName.toLowerCase())    
            }
                
        })
        if (singleIngredient.length > 0){
            setSelectedIngredient(singleIngredient)
        }  
    }

    function handleChangeIngredient(e){
        setIngredientName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(selectedIngredient)
        if (selectedIngredient !== null){
            setIngredientId(selectedIngredient[0].id)
        }
        console.log(ingredientId)
        const newCookingList = {
                ingredient_id: ingredientId,
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
          .then((r) => {
            if (r.ok) {
                r.json().then((data) => handleAddIngredientRecipe(selectedIngredient[0]))
            } else {
              r.json().then((err) => setErrors(err.error));
            }
          });
    
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
                <FormLabel>Insert ingredient name:</FormLabel>
                <Button type="submit">Submit</Button>
                <Button onClick={() => setActionHide(true)}>Toggle Back</Button>
            </form>)}
            <p className="ingredient-recipe-errors">
                     {errors.map((err) => (
                        <Error key={err}>{err}</Error>
                    ))}   
                </p>
        </div>
    );
}

export default IngredientRecipeForm;