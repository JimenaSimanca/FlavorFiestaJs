import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/recipes.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const foundRecipe = data.recipes.find((recipe) => recipe.id === parseInt(id, 10));
        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          throw new Error('Recipe not found');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    console.log(recipe); 
  }, [recipe]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className='recipe-body'>
    <div className="recipe-detail-container">
      <h1>{recipe.title}</h1>
      <h2>Ingredientes</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instrucciones</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
    <div>
    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
    </div>
    </div>
  );
};

export default RecipeDetail;
