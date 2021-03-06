import { FormLabel, Input, Button } from '@material-ui/core';
import { Create, Send } from '@material-ui/icons';
import {React, useState } from 'react';
import { BASE_URL } from '../constrains';
import Error from '../style/Error';
import "../style/IngredientForm.css"

function IngredientForm({handleAddIngredient}) {

    const [editMode, setEditMode] = useState(false)
    const [errors, setErrors] = useState([]);
    const [ingredient, setIngredient] = useState({
        name: "",
        calories: [],
        category: "",
        image_url: "",
        price: [],
        portion: [],
        quantity: [], 
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
                quantity: ingredient.quantity 
            }
        fetch(BASE_URL + "ingredients", {
            method: "POST",
            body: JSON.stringify(newIngredient),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => handleAddIngredient(data))
                } else {
                  r.json().then((err) => setErrors(err.error));
                }
              });
    }

    function toggleEdit(){
        setEditMode(!editMode)
    }

    return (
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
                        <Button type="submit" variant="outlinded"><Send></Send>Create Ingredient</Button>
                        <p className="ingredient-errors">
                        {errors.map((err) => (
                            <Error key={err}>{err}</Error>
                        ))}   
                        </p>
                    </form>
                </>
                )}
                    <Button variant='contained' onClick={toggleEdit}><Create></Create>Toggle Create New Ingredient</Button>
        </div>
    );
}

export default IngredientForm;