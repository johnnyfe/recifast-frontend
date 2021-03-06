import React, { useState } from 'react';
import { Input, Button, TextField, FormLabel } from '@material-ui/core';
import { BASE_URL } from '../constrains';
import "../style/RecipeForm.css"
import Error from '../style/Error';
import { Create, Send } from '@material-ui/icons';

function RecipeForm({handleAddRecipe, recipes}) {

    const [editMode, setEditMode] = useState(false)
    const [errors, setErrors] = useState([]);
    const [recipe, setRecipe] = useState({
        name: "",
        preparation_time: [],
        calories: [],
        image_url: "",
        video_url: "",
        description: "",
        instructions: ""
    })


    function handleChangeRecipe(e){
        const updatedValueRecipe = {...recipe}
        updatedValueRecipe[e.target.name] = e.target.value;
        setRecipe(updatedValueRecipe);
    }

    function handleSubmit(e){
        e.preventDefault();
        setErrors([]);
        const newRecipe = {
                name: recipe.name,
                preparation_time: recipe.preparation_time,
                calories: recipe.calories,
                image_url: recipe.image_url,
                video_url: recipe.video_url,
                description: recipe.description,
                instructions: recipe.instructions,
                user_id: recipes[0].user.id
            }
        fetch(BASE_URL + "recipes", {
            method: "POST",
            body: JSON.stringify(newRecipe),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => handleAddRecipe(data))
                } else {
                  r.json().then((err) => setErrors(err.error));
                }
              });
            }
    

    function toggleEdit(){
        setEditMode(!editMode)
    }

    return (
        <div>
            <div className="recipe-form">
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
                    <Button type="submit" variant="outlinded"><Send></Send>Create Recipe</Button>
                    <p className="recipe-errors">
                     {errors.map((err) => (
                        <Error key={err}>{err}</Error>
                    ))}   
                    </p> 
                </form>
            </>
            )}
            <Button variant='contained' onClick={toggleEdit}><Create></Create>Toggle Create Recipe Form</Button>
            </div>
        </div>
    );
}

export default RecipeForm;