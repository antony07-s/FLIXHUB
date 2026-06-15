function ShimmerCard() {
  return (
    <div className="min-w-[140px] md:min-w-[200px] lg:min-w-[220px] rounded-lg overflow-hidden">
      
      {/* Poster placeholder */}
      <div className="shimmer w-full h-[200px] md:h-[280px] lg:h-[320px] rounded-lg" />

      {/* Title placeholder */}
      <div className="shimmer h-3 md:h-4 mt-2 rounded w-3/4" />

      {/* Rating placeholder */}
      <div className="shimmer h-3 md:h-4 mt-2 rounded w-1/4" />

    </div>
  );
}

export default ShimmerCard;