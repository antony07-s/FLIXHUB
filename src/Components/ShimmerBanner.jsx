function ShimmerBanner() {
  return (
    <div className="h-[50vh] md:h-[80vh] relative">
      {/* Banner placeholder */}
      <div className="shimmer w-full h-full" />

      {/* Text placeholders */}
      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 flex flex-col gap-3">
        
        <div className="shimmer h-8 md:h-12 w-48 md:w-96 rounded" />
        <div className="shimmer h-3 md:h-4 w-40 md:w-80 rounded" />
        <div className="shimmer h-3 md:h-4 w-32 md:w-64 rounded" />

        {/* Button placeholders */}
        <div className="flex gap-3 mt-1">
          <div className="shimmer h-8 md:h-10 w-20 md:w-24 rounded" />
          <div className="shimmer h-8 md:h-10 w-24 md:w-32 rounded" />
        </div>
      </div>
    </div>
  );
}

export default ShimmerBanner;