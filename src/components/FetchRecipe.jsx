import "./FetchRecipe.css";
import { useState } from "react";
import axios from "axios";
import { parseIngredient } from "parse-ingredient";

export function FetchRecipe() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [rawRecipe, setRawRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [parsedIngredients, setParsedIngredients] = useState([]);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleParseIngredients = () => {
    const parsedIngredientsArray = ingredients.map((ingredient) =>
      parseIngredient(ingredient, { normalizeUOM: true }, { allowLeadingOf: true })
    );
    setParsedIngredients(parsedIngredientsArray);
  };

  const handleFetchRecipe = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/fetch_recipe", { url: url });

      console.log("Response:", response.data);
      setRawRecipe(response.data.raw_recipe);
      setIngredients(response.data.raw_recipe.ingredients);
      setError(null);
      setUrl("");
      setIsLoading(false);
      handleParseIngredients();
      console.log(parsedIngredients);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Recipe Fetcher</h1>
      <form onSubmit={handleFetchRecipe}>
        <label htmlFor="url">Input Recipe URL</label>
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter Recipe URL"
          pattern="https://.*"
          size="30"
          required
        />
        <button className="button1" type="submit" disabled={isLoading}>
          {isLoading ? "Fetching..." : "Fetch Recipe"}
        </button>
      </form>

      {error && <p>Error: {error}</p>}

      {rawRecipe && (
        <div className="recipe-data">
          {rawRecipe.images.map((image, index) => (
            <img key={index} className="recipe-data-images" src={image} alt={`Image ${index}`} />
          ))}
          <h2 className="recipe-data-title">{rawRecipe.title}</h2>
          <h4 className="recipe-data-description">{rawRecipe.description}</h4>
          <p className="recipe-data-chef">Chef: {rawRecipe.chef}</p>
          <h3 className="recipe-data-ingredients-head">Ingredients:</h3>
          <ul className="recipe-data-ingredients">
            {rawRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3 className="recipe-data-instructions-head">Instructions:</h3>
          <ol className="recipe-data-instructions">
            {rawRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
