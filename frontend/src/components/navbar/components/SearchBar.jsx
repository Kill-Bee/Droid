export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-btn"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
}
