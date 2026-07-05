const FilterSection = ({ timeFilter, setTimeFilter, minHealth, setMinHealth }) => {
  return (
    <div className="FilterSection" style={{ gap: "20px", flexWrap: "wrap" }}>
      <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
        <option value="All">🍽️ All Recipes</option>
        <option value="15">⚡ Ready in 15 mins</option>
        <option value="30">⏱️ Ready in 30 mins</option>
        <option value="60">🍲 Ready in 60 mins</option>
      </select>

      <div style={{ color: "white", display: "flex", alignItems: "center", gap: "10px" }}>
        <label htmlFor="healthRange">Min Health Score: {minHealth}</label>
        <input
          id="healthRange"
          type="range"
          min="0"
          max="100"
          step="5"
          value={minHealth}
          onChange={(e) => setMinHealth(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default FilterSection;