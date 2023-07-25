import "./RecipeFetcher.css";
import { useState } from "react";
import fetch from "node-fetch";

export function RecipeFetcher() {
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handeFetchRecipe = async () => {
    try {
      const response = await fetch(url);
      const htmlContent = await response.text();

      const 
    }
    const recipeData = parseRecipeFromHTML();
    setRecipe(recipeData);
  };

  return (
    <form>
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
      <button onClick={handleFetchRecipe}>Fetch Recipe</button>
    </form>
  );
}
