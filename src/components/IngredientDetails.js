import React, { useState } from 'react';
import { Input } from '@material-ui/core';
import { Button } from '@material-ui/core';

function IngredientDetails({ingredient, updateIngredient}) {

    const [editMode, setEditMode] = useState(false);
    const [newIngredient, setNewIngredient] = useState({...ingredient})

    function toggleEdit(){
        setEditMode(!editMode)
    }

    function handleChange(e){
        const updatedValue = {...newIngredient}
        updatedValue[e.target.name] = e.target.value
        setNewIngredient(updatedValue)
    }

    function handleUpdate(e){
        e.preventDefault();
        updateIngredient(newIngredient);
        setEditMode(false);
    }


    return (
        <div>
            <b>{ingredient.name}</b>
            <img src={ingredient.image_url} width="200px" alt={ingredient.name}></img>
            <p>{ingredient.calories} calories</p>
            <p>{ingredient.category}</p>
            <p>Price: ${ingredient.price}</p>
            <p>{ingredient.quantity} units</p>
            <p>{ingredient.portion} OZ</p>
            {editMode && (
                <>
                    <form onSubmit={handleUpdate}>
                    <Input name="name" value={newIngredient.name} onChange={handleChange}/><br/>
                    <Input name="calories" value={newIngredient.calories} onChange={handleChange}/><br/>
                    <Input name="category" value={newIngredient.category} onChange={handleChange}/><br/>
                    <Input name="image_url" value={newIngredient.image_url} onChange={handleChange}/><br/>
                    <Input name="portion" value={newIngredient.portion} onChange={handleChange}/><br/>
                    <Input name="quantity" value={newIngredient.quantity} onChange={handleChange}/><br/>
                    <Button type="submit" variant="contained">Update Ingredient</Button>
                    </form>
                </>
            )}
            <button  onClick={toggleEdit}>Modify Ingredient</button>
        </div>
    );
}

export default IngredientDetails;