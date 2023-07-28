import "./FetchRecipe.css";
import { useState } from "react";
import axios from "axios";

export function FetchRecipe() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [rawRecipe, setRawRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFetchRecipe = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/fetch_recipe", { url: url });

      console.log("Response:", response.data);
      setRawRecipe(response.data.raw_recipe);
      setError(null);
      setUrl("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Fetching..." : "Fetch Recipe"}
        </button>
      </form>

      {error && <p>Error: {error}</p>}

      {rawRecipe && (
        <div>
          <img className="rawRecipe--image" src={rawRecipe.image} />
          <h2>{rawRecipe.title}</h2>
          <h4>{rawRecipe.description}</h4>
          <p>Chef: {rawRecipe.chef}</p>
          <h3>Ingredients:</h3>
          <ul>
            {rawRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <ol>
            {rawRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
