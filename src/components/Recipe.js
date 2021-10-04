import React, { useState } from 'react';
import CommentDetails from './CommentDetails';
import { Input } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import IngredientDetails from './IngredientDetails';


function Recipe({recipe, updateRecipe, deleteRecipe}) {

    const [newRecipe, setNewRecipe] = useState({...recipe});
    const [editMode, setEditMode] = useState(false);
    const [comments, setComment] = useState(recipe.comments)
    const [user, setUser] = useState(recipe.user.username)
    const [ingredients, setIngredients] = useState(recipe.ingredients)



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

    
    return (
        <div>
            <p>{recipe.name}</p>
            <p>{recipe.preparation_time}</p>
            <p>{recipe.calories}</p>
            <img src={recipe.image_url} alt={recipe.name} width="240px"></img>
            <iframe src={recipe.video_url} title={recipe.name}></iframe>
            <p>{recipe.description}</p>
            <p>{recipe.instructions}</p>
            <h5>User:</h5>
            <p>{user}</p>
            <h5>Comments:</h5>
            {comments && comments.map((comment) => <CommentDetails key={comment.id} comment={comment}/>)}
            <h5>Ingredients:</h5>
            {ingredients && ingredients.map((ingredient) => <IngredientDetails key={ingredient.id} ingredient={ingredient}/>)}
            {editMode && (
                <>
                    <form onSubmit={handleUpdate}>
                    <Input name="name" value={newRecipe.name} onChange={handleChange}/><br/>
                    <Input name="preparation_time" value={newRecipe.preparation_time} onChange={handleChange}/><br/>
                    <Input name="calories" value={newRecipe.calories} onChange={handleChange}/><br/>
                    <Input name="image_url" value={newRecipe.image_url} onChange={handleChange}/><br/>
                    <Input name="video_url" value={newRecipe.video_url} onChange={handleChange}/><br/>
                    <Input name="description" value={newRecipe.description} onChange={handleChange}/><br/>
                    <TextField name="instructions" style ={{width: '75%'}} value={newRecipe.instructions} onChange={handleChange}/><br/>
                    <button type="submit">Update Recipe</button><br/>
                    <button onClick={() => deleteRecipe(recipe)}>Delete Recipe</button>
                    </form>
                </>
            )}
            <button onClick={toggleEdit}>Modify Recipe</button>
        </div>
    );
}

export default Recipe;