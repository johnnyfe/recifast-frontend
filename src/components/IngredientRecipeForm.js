import { Button, FormLabel, Input } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../constrains';
import Error from '../style/Error';
import { GetApp, Send } from '@material-ui/icons';
import "../style/IngredientRecipeForm.css"

function IngredientRecipeForm({ newIngredients, recipe, handleAddIngredientRecipe }) {

    const [ingredientName, setIngredientName] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [actionHide, setActionHide] = useState(true);
    const [ingredientId, setIngredientId] = useState([])
    const [errors, setErrors] = useState([]);
    const [imageIngredient, setImageIngredient] = useState("")
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(BASE_URL + 'ingredients')
        .then(r => r.json())
        .then(setIngredients)
    }, [])
    

    const singleIngredient = newIngredients.filter((ingredient)=>{
                if(ingredientName.length > 0){
                    return ingredient.name.toLowerCase().includes(ingredientName.toLowerCase())    
                }
                else {
                    return null
                }  
            })

    useEffect(() => {
        setSelectedIngredient(singleIngredient[0])
    }, [singleIngredient])

            
    function displayedIngredient(e) {
        e.preventDefault();
        if(singleIngredient.length > 0) {
         setIngredientId(selectedIngredient.id)
         setImageIngredient(singleIngredient[0].image_url);  
         setActionHide(false);
          
        } else {
            setIngredientId([])
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
                <img src={imageIngredient} width="50px" alt={imageIngredient.name} style={{borderRadius: "25px"}}></img>
            </form>)}
            <p className="ingredient-recipe-errors">
                     {errors.map((err) => (
                        <Error key={err}>{err}</Error>
                    ))}   
            </p>
            <h3>Available Ingredients</h3>
            <div className="ingredient-list">
                {ingredients.map((ingredient) => <p>{ingredient.name}</p>)}
            </div>
        </div>
    );
}

export default IngredientRecipeForm;