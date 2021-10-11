import { Button, FormLabel, Input } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../constrains';
import Error from '../style/Error';
import { GetApp, Send } from '@material-ui/icons';

function IngredientRecipeForm({ newIngredients, recipe, handleAddIngredientRecipe }) {

    const [ingredientName, setIngredientName] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [actionHide, setActionHide] = useState(true);
    const [ingredientId, setIngredientId] = useState([])
    const [errors, setErrors] = useState([]);
    const [imageIngredient, setImageIngredient] = useState("")


    const singleIngredient = newIngredients.filter((ingredient)=>{
                if(ingredientName.length > 0){
                    return ingredient.name.toLowerCase().includes(ingredientName.toLowerCase())    
                }
                    
            })
            
    function displayedIngredient(e) {
        e.preventDefault();
        if(singleIngredient.length > 0) {
         setSelectedIngredient(singleIngredient[0]);
         setImageIngredient(singleIngredient[0].image_url);  
         setActionHide(false);
          
        } else {
            setSelectedIngredient(null);
            setImageIngredient(""); 
            setActionHide(false);
        }
    }

    function handleChangeIngredient(e){
        setIngredientName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(selectedIngredient)
        if (selectedIngredient !== null){
            setIngredientId(selectedIngredient.id)
        }
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
                r.json().then((data) => {
                    handleAddIngredientRecipe(selectedIngredient)
                    setIngredientId([])
                    })
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
                <Button type="submit"><GetApp></GetApp>Get ingredient</Button>
            </form>
            ): (
            <form onSubmit={handleSubmit}>
                <FormLabel>Insert ingredient name:</FormLabel>
                <Button type="submit"><Send></Send>Submit</Button>
                <Button onClick={() => setActionHide(true)}>Toggle Back</Button>
                <img src={imageIngredient} width="50px" style={{borderRadius: "25px"}}></img>
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