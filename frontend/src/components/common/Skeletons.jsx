import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function CarouselSkeleton() {
  return (
    <SkeletonTheme baseColor="#1d1c1c" highlightColor="#444">
      <div className="carousel-skeleton-wrapper">
        <Skeleton width="100%" height={1000} borderRadius={8} />
      </div>
    </SkeletonTheme>
  );
}

export function CardSkeleton({ width = 200, height = 300 }) {
  return (
    <SkeletonTheme baseColor="#1d1c1c" highlightColor="#444">
      <div className="card-skeleton">
        <div className="img-skeleton">
          <Skeleton width={width} height={height} borderRadius={8} />
        </div>
        <div className="title-skeleton">
          <Skeleton width={width} />
        </div>
      </div>
    </SkeletonTheme>
  );
}
