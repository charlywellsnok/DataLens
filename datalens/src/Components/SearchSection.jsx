const SearchSection = ({ searchInput, searchItems }) => {
  return (
    <div className="SearchSection">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchInput}
        onChange={(e) => searchItems(e.target.value)}
      />
    </div>
  );
};

export default SearchSection;