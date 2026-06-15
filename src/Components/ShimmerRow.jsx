import ShimmerCard from "./ShimmerCard";

function ShimmerRow() {
  return (
    <div className="px-4 md:px-8 mt-6 md:mt-8">
      
      {/* Title placeholder */}
      <div className="shimmer h-6 md:h-8 w-32 md:w-48 mb-3 md:mb-4 rounded" />

      {/* Cards row */}
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ShimmerCard key={item} />
        ))}
      </div>
    </div>
  );
}

export default ShimmerRow;