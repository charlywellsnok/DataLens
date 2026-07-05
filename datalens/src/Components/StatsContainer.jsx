import StatCard from "./StatCard";

const StatsContainer = ({ items }) => {
  const total = items.length;

  const avgTime =
    total > 0
      ? Math.round(
          items.reduce((sum, item) => sum + item.readyInMinutes, 0) / total
        )
      : 0;

  const avgHealth =
    total > 0
      ? Math.round(
          items.reduce((sum, item) => sum + item.healthScore, 0) / total
        )
      : 0;

  return (
    <div className="stats-container">
      <StatCard value={`🍽️ ${total}`} label="Recipes" />
      <StatCard value={`⏱️ ${avgTime} min`} label="Avg Time" />
      <StatCard value={`🥗 ${avgHealth}`} label="Health Score" />
    </div>
  );
};

export default StatsContainer;