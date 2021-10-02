import React from 'react';

function Recipe({recipe}) {


    return (
        <div>
            <p>{recipe.name}</p>
            <p>{recipe.preparation_time}</p>
            <img src={recipe.image_url} alt={recipe.name} width="240px"></img>
            <iframe src={recipe.video_url} title={recipe.name}></iframe>
            <p>{recipe.description}</p>
            <p>{recipe.instructions}</p>
        </div>
    );
}

export default Recipe;