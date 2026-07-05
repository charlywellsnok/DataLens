import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import StatsContainer from "./Components/StatsContainer";
import SearchSection from "./Components/SearchSection";
import FilterSection from "./Components/FilterSection";
import "./App.css";

const App = () => {
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("all");
  const [timeFilter, setTimeFilter] = useState("All");
  const [minHealth, setMinHealth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
const response = await fetch(
  `https://api.spoonacular.com/recipes/complexSearch?apiKey=08b29b61f09f431585bde9e8c56494f3&number=10&addRecipeInformation=true`
);

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
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

  // Re-run every filter + search together whenever any of them change
  useEffect(() => {
    let result = [...list];

    // Search (by title)
    if (searchInput.trim() !== "") {
      result = result.filter((item) =>
        (item.title || "").toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // Category filter (sidebar) — uses diet/type attributes, not title
    if (category !== "all") {
      result = result.filter((item) => {
        if (category === "quick") return (item.readyInMinutes || 0) <= 20;
        if (category === "healthy") return (item.healthScore || 0) >= 70;
        if (category === "vegan") return item.vegan === true;
        if (category === "vegetarian") return item.vegetarian === true;
        return true;
      });
    }

    // Time filter (dropdown) — uses readyInMinutes
    if (timeFilter !== "All") {
      result = result.filter(
        (item) => (item.readyInMinutes || 0) <= Number(timeFilter)
      );
    }

    // Health score filter (slider) — uses healthScore, user-set bound
    result = result.filter((item) => (item.healthScore || 0) >= minHealth);

    setFilteredResults(result);
  }, [list, searchInput, category, timeFilter, minHealth]);

  const searchItems = (value) => {
    setSearchInput(value);
  };

  return (
    <div className="App">
      <Sidebar category={category} setCategory={setCategory} />

      <StatsContainer items={list} />

      <SearchSection searchInput={searchInput} searchItems={searchItems} />

      <FilterSection
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        minHealth={minHealth}
        setMinHealth={setMinHealth}
      />

      {loading && <p className="spinner">🍳 Loading recipes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="Dashboard">
          {filteredResults.length === 0 && (
            <p style={{ color: "white" }}>No recipes match your filters.</p>
          )}

          {filteredResults.map((item) => (
            <div key={item.id} className="Card">
              <img src={item.image} alt={item.title} className="recipe-image" />
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