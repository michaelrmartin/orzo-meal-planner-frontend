import "./CreateUrl.css";
import { useState } from "react";
import axios from "axios";

export function CreateUrl() {
  const [url, setUrl] = useState("");

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleCreateUrl = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/urls", { url: url });

      console.log("Response:", response.data);
      setUrl("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleCreateUrl}>
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
      <button type="submit">Fetch Recipe</button>
    </form>
  );
}
