import React, { useState } from 'react';
import { Input, Button, TextField, FormLabel } from '@material-ui/core';
import { BASE_URL } from '../constrains';

function RecipeForm({handleAddRecipe}) {
    const [editMode, setEditMode] = useState(false)
    const [recipe, setRecipe] = useState({
        name: "",
        preparation_time: [],
        calories: [],
        image_url: "",
        video_url: "",
        description: "",
        instructions: ""
    })

    const [comment, setComment] = useState({
        description: "",
        rating: []
    })

    const [user, setUser] = useState({
        username: "",
        name: "",
    })
    const [ingredient, setIngredient] = useState({
        name: "",
        calories: [],
        category: "",
        image_url: "",
        price: [],
        portion: [],
        quantity: [], 
    })
    function handleChangeComment(e){
        const updatedValueComment = {...comment}
        updatedValueComment[e.target.name] = e.target.value;
        setComment(updatedValueComment);
    }

    function handleChangeUser(e){
        const updatedValueUser = {...user}
        updatedValueUser[e.target.name] = e.target.value;
        setUser(updatedValueUser);
    }

    function handleChangeRecipe(e){
        const updatedValueRecipe = {...recipe}
        updatedValueRecipe[e.target.name] = e.target.value;
        setRecipe(updatedValueRecipe);
    }
    function handleChangeIngredient(e){
        const updatedValueIngredient = {...ingredient}
        updatedValueIngredient[e.target.name] = e.target.value;
        setIngredient(updatedValueIngredient);
    }

    function handleSubmit(e){
        e.preventDefault();
        const newRecipe = {
                name: recipe.name,
                preparation_time: recipe.preparation_time,
                calories: recipe.calories,
                image_url: recipe.image_url,
                video_url: recipe.video_url,
                description: recipe.description,
                instructions: recipe.instructions,
                ingredients: ingredient,
                user: user,
                comments: comment 
            }
        fetch(BASE_URL + "recipes", {
            method: "POST",
            body: JSON.stringify(newRecipe),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(handleAddRecipe);
    }

    function toggleEdit(){
        setEditMode(!editMode)
    }

    return (
        <div>
            <div className="ingredient-form">
            {editMode && (
                <>
                <h3>Create A Recipe</h3>
                <form onSubmit={handleSubmit}>
                    <FormLabel>Recipe Name: </FormLabel>
                    <Input name="name" value={recipe.name} onChange={handleChangeRecipe}/><br/>
                    <FormLabel>Recipe Time: </FormLabel>
                    <Input name="preparation_time" value={recipe.preparation_time} onChange={handleChangeRecipe}/><br/>
                    <FormLabel>Recipe Calories: </FormLabel>
                    <Input name="calories" value={recipe.calories} onChange={handleChangeRecipe}/><br/>
                    <FormLabel>Recipe Image Url: </FormLabel>
                    <Input name="image_url" value={recipe.image_url} onChange={handleChangeRecipe}/><br/>
                    <FormLabel>Recipe Video Url: </FormLabel>
                    <Input name="video_url" value={recipe.video_url} onChange={handleChangeRecipe}/><br/>
                    <FormLabel>Recipe Description: </FormLabel>
                    <Input name="description" value={recipe.description} onChange={handleChangeRecipe}/><br/>
                    <FormLabel>Recipe Intructions: </FormLabel>
                    <TextField name="instructions" style ={{width: '75%'}} value={recipe.instructions} onChange={handleChangeRecipe}/><br/>
                    <FormLabel>Ingredient Name: </FormLabel>
                    <Input name="name" placeholder="Banana" value={ingredient.name} onChange={handleChangeIngredient} ></Input> <br/>
                    <FormLabel>Ingredient Calories: </FormLabel>
                    <Input name="calories" placeholder="0...1000" value={ingredient.calories} onChange={handleChangeIngredient} ></Input><br/>
                    <FormLabel>Ingredient Category: </FormLabel>
                    <Input name="category" placeholder="fruit" value={ingredient.category} onChange={handleChangeIngredient} ></Input><br/>
                    <FormLabel>Ingredient Image Url: </FormLabel>
                    <Input name="image_url" placeholder="image_url.jpg" value={ingredient.image_url} onChange={handleChangeIngredient} ></Input><br/>
                    <FormLabel>Ingredient Portion: </FormLabel>
                    <Input name="portion" placeholder="1...1000" value={ingredient.portion} onChange={handleChangeIngredient}></Input><br/>
                    <FormLabel>Ingredient Price: </FormLabel>
                    <Input name="price" placeholder="1...10000" value={ingredient.price} onChange={handleChangeIngredient}></Input><br/>
                    <FormLabel>Ingredient Quantity: </FormLabel>
                    <Input name="quantity" placeholder="1...100" value={ingredient.quantity} onChange={handleChangeIngredient}></Input><br/>
                    <FormLabel>Username: </FormLabel>
                    <Input name="username" placeholder="fire81" value={user.username} onChange={handleChangeUser}></Input><br/>
                    <FormLabel>Name of User: </FormLabel>
                    <Input name="name" placeholder="fire81" value={user.name} onChange={handleChangeUser}></Input><br/>
                    <FormLabel>Comment: </FormLabel>
                    <Input name="description" placeholder="fire81" value={comment.description} onChange={handleChangeComment}></Input><br/>
                    <FormLabel>Rating: </FormLabel>
                    <Input name="rating" placeholder="1...5" value={comment.rating} onChange={handleChangeComment}></Input><br/>
                    <Button type="submit" variant="outlinded">Create Recipe</Button>
                </form>
            </>
            )}
            <Button variant='contained' onClick={toggleEdit}>Toggle Create Recipe Form</Button>
            </div>
        </div>
    );
}

export default RecipeForm;