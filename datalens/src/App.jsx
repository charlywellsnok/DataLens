import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import StatsContainer from "./Components/StatsContainer";
import SearchSection from "./Components/SearchSection";
import "./App.css";

const App = () => {
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://api.spoonacular.com/recipes/complexSearch?apiKey=08b29b61f09f431585bde9e8c56494f3&number=10&addRecipeInformation=true"
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log("API RESPONSE:", data);

        const recipes = data.results || [];

        setList(recipes);
        setFilteredResults(recipes);

      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // SEARCH (like your crypto example)
  const searchItems = (value) => {
    setSearchInput(value);

    if (value.trim() !== "") {
      const filtered = list.filter((item) =>
        (item.title || "")
          .toLowerCase()
          .includes(value.toLowerCase())
      );

      setFilteredResults(filtered);
    } else {
      setFilteredResults(list);
    }
  };

  return (
    <div className="App">

      <Sidebar />

      <StatsContainer items={list} />

      <SearchSection
        searchInput={searchInput}
        searchItems={searchItems}
      />

      {loading && <p className="spinner">🍳 Loading recipes...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="Dashboard">

          {filteredResults.map((item) => (
            <div key={item.id} className="Card">

              <img
                src={item.image}
                alt={item.title}
                className="recipe-image"
              />

              <h3>{item.title}</h3>

              <p>⏱️ {item.readyInMinutes || "N/A"} mins</p>
              <p>⭐ {item.healthScore || "N/A"}</p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default App;
