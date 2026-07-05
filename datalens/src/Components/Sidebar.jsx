const Sidebar = ({ setCategory }) => {
  return (
    <div className="sidebar">
      <h1 className="logo">🍽️</h1>

      <h2 className="app-title">Recipe Explorer</h2>

      <div className="menu">

        <div className="menu-item" onClick={() => setCategory("all")}>
          🏠 Dashboard
        </div>

        <div className="menu-item" onClick={() => setCategory("quick")}>
          ⚡ Quick Meals
        </div>

        <div className="menu-item" onClick={() => setCategory("healthy")}>
          🥗 Healthy Recipes
        </div>

        <div className="menu-item" onClick={() => setCategory("vegan")}>
          🌱 Vegan
        </div>

        <div className="menu-item" onClick={() => setCategory("vegetarian")}>
          🥦 Vegetarian
        </div>

      </div>
    </div>
  );
};

export default Sidebar;