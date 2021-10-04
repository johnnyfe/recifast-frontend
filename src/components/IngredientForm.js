import { FormLabel, Input, Button } from '@material-ui/core';
import {React, useState } from 'react';
import { BASE_URL } from '../constrains';

function IngredientForm({handleAddIngredient, recipe}) {

    const [editMode, setEditMode] = useState(false)
    const [ingredient, setIngredient] = useState({
        name: "",
        calories: [],
        category: "",
        image_url: "",
        price: [],
        portion: [],
        quantity: [],
        recipe_id: [] 
    })
    function handleChange(e){
        const updatedValue = {...ingredient}
        updatedValue[e.target.name] = e.target.value;
        setIngredient(updatedValue);
    }

    function handleSubmit(e){
        e.preventDefault();
        const newIngredient = {
                name: ingredient.name,
                calories: ingredient.calories,
                category: ingredient.category,
                image_url: ingredient.image_url,
                price: ingredient.price,
                portion: ingredient.portion,
                quantity: ingredient.quantity,
                recipe_id: recipe.id 
            }
        fetch(BASE_URL + "ingredients", {
            method: "POST",
            body: JSON.stringify(newIngredient),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(handleAddIngredient);
    }

    function toggleEdit(){
        setEditMode(!editMode)
    }

    return (
        <div>
            <div className="ingredient-form">
            {editMode && (
                <>
                <h3>Create A New Ingredient</h3>
                <form onSubmit={handleSubmit}>
                    <FormLabel>Name: </FormLabel>
                    <Input name="name" placeholder="Banana" value={ingredient.name} onChange={handleChange} ></Input> <br/>
                    <FormLabel>Calories: </FormLabel>
                    <Input name="calories" placeholder="0...1000" value={ingredient.calories} onChange={handleChange} ></Input><br/>
                    <FormLabel>Category: </FormLabel>
                    <Input name="category" placeholder="fruit" value={ingredient.category} onChange={handleChange} ></Input><br/>
                    <FormLabel>Image Url: </FormLabel>
                    <Input name="image_url" placeholder="image_url.jpg" value={ingredient.image_url} onChange={handleChange} ></Input><br/>
                    <FormLabel>Portion: </FormLabel>
                    <Input name="portion" placeholder="1...1000" value={ingredient.portion} onChange={handleChange}></Input><br/>
                    <FormLabel>Price: </FormLabel>
                    <Input name="price" placeholder="1...10000" value={ingredient.price} onChange={handleChange}></Input><br/>
                    <FormLabel>Quantity: </FormLabel>
                    <Input name="quantity" placeholder="1...100" value={ingredient.quantity} onChange={handleChange}></Input><br/>
                    <Button type="submit" variant="outlinded">Create Ingredient</Button>
                </form>
            </>
            )}
            <Button variant='contained' onClick={toggleEdit}>Toggle Create New Ingredient</Button>
            </div>
        </div>
    );
}

export default IngredientForm;