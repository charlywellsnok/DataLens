const FilterSection = ({ timeFilter, setTimeFilter }) => {
  return (
    <div className="FilterSection">
      <select
        value={timeFilter}
        onChange={(e) => setTimeFilter(e.target.value)}
      >
        <option value="All">🍽️ All Recipes</option>
        <option value="15">⚡ Ready in 15 mins</option>
        <option value="30">⏱️ Ready in 30 mins</option>
        <option value="60">🍲 Ready in 60 mins</option>
      </select>
    </div>
  );
};

export default FilterSection;