import { useRef } from "react";

export default function MediaSlider({
  title,
  children,
  loading,
  skeletonComponent: SkeletonComponent,
  skeletonCount = 10,
}) {
  const containerRef = useRef(null);

  const handleSlideLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const handleSlideRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  const skeletonItems = Array.from({ length: skeletonCount });

  return (
    <>
      {title && <h1>{title}</h1>}
      <div className="slider-wrapper">
        <button
          className="slide-arrow slide-arrow-left"
          onClick={handleSlideLeft}
        ></button>
        {loading ? (
          <div className="container-slide" ref={containerRef}>
            {skeletonItems.map((_, i) => (
              <SkeletonComponent key={`skel-${i}`} />
            ))}
          </div>
        ) : (
          <div className="container-slide" ref={containerRef}>
            {children}
          </div>
        )}
        <button
          className="slide-arrow slide-arrow-right"
          onClick={handleSlideRight}
        ></button>
      </div>
    </>
  );
}
