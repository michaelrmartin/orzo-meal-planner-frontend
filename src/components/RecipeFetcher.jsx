import "./RecipeFetcher.css";
import { useState } from "react";

export function RecipeFetcher() {
  const [url, setUrl] = useState("");
  // const [recipe, setRecipe] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
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
      <input type="submit" value="Fetch Recipe" />
    </form>
  );
}
