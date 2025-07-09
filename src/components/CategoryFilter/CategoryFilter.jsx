import "./CategoryFilter.css";

function CategoryFilter({
  selectedSource,
  onSelectSource,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="filter-container">
      <label>Source filter: </label>
      <select
        value={selectedSource}
        onChange={(e) => onSelectSource(e.target.value)}
      >
        <option value="All">All tasks</option>
        <option value="api">API tasks</option>
        <option value="user">User tasks</option>
      </select>

      {selectedSource !== "api" && (
        <>
          <label>Category filter: </label>
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
          >
            <option value="All">All categories</option>
            <option value="Job">Job</option>
            <option value="Family">Family</option>
            <option value="Private">Private</option>
          </select>
        </>
      )}
    </div>
  );
}

export default CategoryFilter;
