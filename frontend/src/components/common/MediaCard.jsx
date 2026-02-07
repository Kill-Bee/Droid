import "./MediaCard.css";

export default function MediaCard({ 
  id, 
  title, 
  coverImage, 
  onClick, 
  maxTitleLength = 20,
  className = "card",
  children 
}) {
  const truncatedTitle = title?.length > maxTitleLength 
    ? title.substring(0, maxTitleLength) + "..." 
    : title;

  const handleClick = () => {
    if (onClick) onClick(id);
  };

  return (
    <div className={className} style={{ cursor: onClick ? "pointer" : "default" }}>
      <div>
        <img
          src={coverImage || "https://via.placeholder.com/300x400?text=No+Image"}
          alt={title}
          onClick={handleClick}
        />
        <h3 onClick={handleClick}>{truncatedTitle}</h3>
        {children}
      </div>
    </div>
  );
}
