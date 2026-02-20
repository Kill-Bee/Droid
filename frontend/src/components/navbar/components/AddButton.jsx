import { useAuth } from "../../../hooks/useAuth";

export default function AddButton({ handleChange, select }) {
  const { isAuth } = useAuth();


  if (!isAuth) {
    return null;
  }

  return (
    <li>
      <select
        name=""
        id=""
        onChange={handleChange}
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
