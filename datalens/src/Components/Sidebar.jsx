const Sidebar = ({ category, setCategory }) => {
  const items = [
    { key: "all", icon: "🏠", label: "Dashboard" },
    { key: "quick", icon: "⚡", label: "Quick Meals" },
    { key: "healthy", icon: "🥗", label: "Healthy Recipes" },
    { key: "vegan", icon: "🌱", label: "Vegan" },
    { key: "vegetarian", icon: "🥦", label: "Vegetarian" },
  ];

  return (
    <div className="sidebar">
      <h1 className="logo">🍽️</h1>
      <h2 className="app-title">Recipe Explorer</h2>

      <div className="menu">
        {items.map((item) => (
          <div
            key={item.key}
            className={`menu-item ${category === item.key ? "active" : ""}`}
            onClick={() => setCategory(item.key)}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;