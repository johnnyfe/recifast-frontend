import React, { useState } from 'react';
import CommentDetails from './CommentDetails';
import { TextField, Input, Button, FormLabel } from '@material-ui/core';
import IngredientDetails from './IngredientDetails';
import { BASE_URL } from '../constrains';
import IngredientRecipeForm from './IngredientRecipeForm';
import { useEffect } from 'react';
import "../style/Recipe.css"
import Error from '../style/Error';
import { Create, Delete, Update } from '@material-ui/icons';



function Recipe({recipe, updateRecipe, deleteRecipe, errors}) {

    const [newRecipe, setNewRecipe] = useState({...recipe});
    const [editMode, setEditMode] = useState(false);
    const [comments] = useState(recipe.comments)
    const [user] = useState(recipe.user.username)
    const [ingredients, setIngredients] = useState(recipe.ingredients)
    const [newIngredients, setNewIngredients] = useState([])

    useEffect(() => {
        fetch(BASE_URL + 'ingredients')
        .then(r => r.json())
        .then(setNewIngredients)
    }, [])

    function handleChange(e){
        const updatedValue = {...newRecipe}
        updatedValue[e.target.name] = e.target.value
        setNewRecipe(updatedValue)
    }

    function toggleEdit(){
        setEditMode(!editMode)
    }

    function handleUpdate(e){
        e.preventDefault();
        updateRecipe(newRecipe);
        setEditMode(false);
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

    function handleAddIngredientRecipe(ingredientData){
        if(ingredients.includes(ingredientData.id)){
            return ingredients
        } else{
            const updatedIngredientRecipe = ([...ingredients, ingredientData])
            return setIngredients(updatedIngredientRecipe)
        }
    }

    function deleteIngredient(ingredient){
        fetch(BASE_URL + 'cooking_lists/' + ingredient.id, {
            method: "DELETE"
        })
        const ingredientToDelete = ingredients.filter(p => p.id!== ingredient.id)
        setIngredients(ingredientToDelete)
    }

    function handleSentenceSeparation(){
        const arrayOfInstructions = recipe.instructions.split('\n')
        return arrayOfInstructions
    }

    
    return (
        <div className="recipe-container-body">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <p>Minutes to prepare: {recipe.preparation_time} mins</p>
            <p>{recipe.calories} calories</p>
            <iframe allow="fullscreen" src={recipe.video_url} title={recipe.name}></iframe>
            <div className="recipe-image">
                <h3>Results:</h3>
                <img src={recipe.image_url} alt={recipe.name}></img>
            </div>
            <div className="user-components-container">
                <h3>User:</h3>
                <p>{user}</p>    
            </div>
            <h3>instructions</h3>
            <div className="recipe-instructions">
                {handleSentenceSeparation().map((sentence) => <p key={sentence.id}>{sentence}</p>)}
            </div>
            <h2>Ingredients:</h2>
            <div className="ingredients-components-container">
                {ingredients && ingredients.map((ingredient) => <IngredientDetails key={ingredient.id} ingredient={ingredient} deleteIngredient={deleteIngredient} updateIngredient={updateIngredient}/>)}
            </div>
            <div className="recipe-add-ingredient">
                <h3>Add Ingredient</h3>
                <IngredientRecipeForm handleAddIngredientRecipe={handleAddIngredientRecipe} key={newIngredients.id} recipe={recipe} newIngredients={newIngredients}/>
            </div>
            <div className="comments-components-container">
                <h2>Comments:</h2>
                {comments && comments.map((comment) => <CommentDetails key={comment.id} comment={comment}/>)}
            </div>
            <div className="recipe-update-form">
             {editMode && (
                <>
                    <h3>Recipe Form:</h3>
                    <form onSubmit={handleUpdate}>
                    <FormLabel>Name: </FormLabel>
                    <Input name="name" value={newRecipe.name} onChange={handleChange}/><br/>
                    <FormLabel>Time: </FormLabel>
                    <Input name="preparation_time" value={newRecipe.preparation_time} onChange={handleChange}/><br/>
                    <FormLabel>Calories: </FormLabel>
                    <Input name="calories" value={newRecipe.calories} onChange={handleChange}/><br/>
                    <FormLabel>Image Url: </FormLabel>
                    <Input name="image_url" value={newRecipe.image_url} onChange={handleChange}/><br/>
                    <FormLabel>Recipe Video Url: </FormLabel>
                    <Input name="video_url" value={newRecipe.video_url} onChange={handleChange}/><br/>
                    <Input name="description" value={newRecipe.description} onChange={handleChange}/><br/>
                    <TextField name="instructions" style ={{width: '75%'}} value={newRecipe.instructions} onChange={handleChange}/><br/>
                    <Button type="submit" variant="outlined"><Update></Update>Update Recipe</Button><br/>
                    <Button onClick={() => deleteRecipe(recipe)} variant="outlined"><Delete></Delete>Delete Recipe</Button>
                    <p className="recipe-errors">
                     {errors.map((err) => (
                        <Error key={err}>{err}</Error>
                    ))}   
                    </p> 
                    </form>
                </>
            )}
                <Button variant="contained" onClick={toggleEdit}><Create></Create>Toggle Update Recipe</Button>   
            </div>
            
        </div>
    );
}

export default Recipe;