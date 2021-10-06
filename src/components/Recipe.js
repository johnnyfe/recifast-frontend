import React, { useState } from 'react';
import CommentDetails from './CommentDetails';
import { TextField, Input, Button, FormLabel } from '@material-ui/core';
import IngredientDetails from './IngredientDetails';
import { BASE_URL } from '../constrains';
import IngredientRecipeForm from './IngredientRecipeForm';
import { useEffect } from 'react';


function Recipe({recipe, updateRecipe, deleteRecipe}) {

    const [newRecipe, setNewRecipe] = useState({...recipe});
    const [editMode, setEditMode] = useState(false);
    const [comments, setComment] = useState(recipe.comments)
    const [user, setUser] = useState(recipe.user.username)
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

    function handleAddRecipe(ingredientData){
        if(ingredients.includes(ingredientData.id)){
            return ingredients
        } else{
            const updatedRecipe = ([...ingredients, ingredientData])
            return setIngredients(updatedRecipe)
        }
    }

    function deleteIngredient(ingredient){
        fetch(BASE_URL + 'ingredients/' + ingredient.id, {
            method: "DELETE"
        })
        const newingredient = ingredients.filter(p => p.id!== ingredient.id)
        setIngredients(newingredient)
    }

    function handleSentenceSeparation(){
        const arrayOfInstructions = recipe.instructions.split('\n')
        return arrayOfInstructions
    }

    
    return (
        <div className="recipe-container-body">
            <h2>Recipes</h2>
            <b>{recipe.name}</b>
            <p>{recipe.description}</p>
            <p>Minutes to prepare: {recipe.preparation_time} mins</p>
            <p>{recipe.calories} calories</p>
            <img src={recipe.image_url} alt={recipe.name} width="240px"></img>
            <iframe src={recipe.video_url} title={recipe.name}></iframe>
            {handleSentenceSeparation().map((sentence) => <p>{sentence}</p>)}
            <h5>User:</h5>
            <p>{user}</p>
            <h2>Comments:</h2>
            {comments && comments.map((comment) => <CommentDetails key={comment.id} comment={comment}/>)}
            <h2>Ingredients:</h2>
            {ingredients && ingredients.map((ingredient) => <IngredientDetails key={ingredient.id} ingredient={ingredient} deleteIngredient={deleteIngredient} updateIngredient={updateIngredient}/>)}
            <IngredientRecipeForm handleAddRecipe={handleAddRecipe} recipe={recipe} newIngredients={newIngredients}/>
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
                    <Button type="submit" variant="outlined">Update Recipe</Button><br/>
                    <Button onClick={() => deleteRecipe(recipe)} variant="outlined">Delete Recipe</Button>
                    </form>
                </>
            )}
            <Button variant="contained" onClick={toggleEdit}>Toggle Update Recipe</Button>
        </div>
    );
}

export default Recipe;