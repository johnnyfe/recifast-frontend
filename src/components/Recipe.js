import React, { useState } from 'react';

function Recipe({recipe, updateRecipe, deleteRecipe}) {

    const [newRecipe, setNewRecipe] = useState({...recipe});
    const [editMode, setEditMode] = useState(false);

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
            {editMode && (
                <>
                    <form onSubmit={handleUpdate}>
                    <input name="name" value={newRecipe.name} onChange={handleChange}></input><br/>
                    <input name="preparation_time" value={newRecipe.preparation_time} onChange={handleChange}></input><br/>
                    <input name="calories" value={newRecipe.calories} onChange={handleChange}></input><br/>
                    <input name="image_url" value={newRecipe.image_url} onChange={handleChange}></input><br/>
                    <input name="video_url" value={newRecipe.video_url} onChange={handleChange}></input><br/>
                    <input name="description" value={newRecipe.description} onChange={handleChange}></input><br/>
                    <textarea name="instructions" rows="25" cols="100" value={newRecipe.instructions} onChange={handleChange}></textarea><br/>
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