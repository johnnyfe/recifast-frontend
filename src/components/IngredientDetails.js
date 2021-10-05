import React, { useState } from 'react';
import { Button, Input, FormLabel } from '@material-ui/core';

function IngredientDetails({ingredient, updateIngredient, deleteIngredient}) {

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
                    <h3>Update Ingredient Form:</h3>
                    <form onSubmit={handleUpdate}>
                    <FormLabel>Name: </FormLabel>
                    <Input name="name" placeholder="Banana" value={newIngredient.name} onChange={handleChange}/><br/>
                    <FormLabel>Calories: </FormLabel>
                    <Input name="calories" placeholder="0...1000" value={newIngredient.calories} onChange={handleChange}/><br/>
                    <FormLabel>Category: </FormLabel>
                    <Input name="category" placeholder="fruit" value={newIngredient.category} onChange={handleChange}/><br/>
                    <FormLabel>Image Url: </FormLabel>
                    <Input name="image_url" placeholder="image_url.jpg" value={newIngredient.image_url} onChange={handleChange}/><br/>
                    <FormLabel>Portion: </FormLabel>
                    <Input name="portion" placeholder="1...1000" value={newIngredient.portion} onChange={handleChange}/><br/>
                    <FormLabel>Price: </FormLabel>
                    <Input name="price" placeholder="1...10000" value={newIngredient.price} onChange={handleChange}/><br/>
                    <FormLabel>Quantity: </FormLabel>
                    <Input name="quantity" placeholder="1...100" value={newIngredient.quantity} onChange={handleChange}/><br/>
                    <Button type="submit" variant="outlined">Update Ingredient</Button>
                    <Button variant="outlined" onClick={() => deleteIngredient(ingredient)}>Delete Ingredient</Button>
                    </form>
                </>
            )}
            <Button variant="contained" onClick={toggleEdit}>Modify Ingredient</Button>
        </div>
    );
}

export default IngredientDetails;