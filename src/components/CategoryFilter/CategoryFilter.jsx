import "./CategoryFilter.css";

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="filter-container">
      <label>Category filter: </label>
      <select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="All">All tasks</option>
        <option value="api">API tasks</option>
        <option value="user">User tasks</option>
      </select>
    </div>
  );
}

export default CategoryFilter;
