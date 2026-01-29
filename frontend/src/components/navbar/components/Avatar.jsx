import { useNavigate } from "react-router-dom";

export default function Avatar({ avatar }) {
  const navigate = useNavigate();

  return (
    <img
      src={
        avatar ||
        "https://i.pinimg.com/736x/32/9c/c6/329cc6ad5210a2c666554d58c7a433e8.jpg"
      }
      alt="profile"
      onClick={() => navigate("/profile")}
    />
  );
}
