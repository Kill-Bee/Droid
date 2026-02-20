import { useAuth } from "../../../hooks/useAuth";

export default function AddButton({ onChange, select }) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <li>
      <select
        name=""
        id=""
        onChange={onChange}
        value={select}
        className="data"
      >
        <option value="" disabled hidden>
          Add data
        </option>
        <option value="/add-anime">Add Anime</option>
        <option value="/add-manga">Add Manga</option>
      </select>
    </li>
  );
}
