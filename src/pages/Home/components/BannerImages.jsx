import { useState, useEffect } from "react";
import { useGetBannerImages } from "../../../hooks/queries/Home/useBannerImages";
import { APP_COLORS } from "../../../constants/appColors";
import { APP_FONTS } from "../../../constants/appTheme";

export const BannerImages = () => {
  const { data: bannerData, isLoading, isError } = useGetBannerImages();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!bannerData || bannerData.length <= 1) return;

    const scrollInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, [bannerData]);

  if (isLoading) {
    return (
      <div
        className="w-full h-64 md:h-96 lg:h-[500px] bg-gray-200 animate-pulse border-b-4"
        style={{ borderColor: APP_COLORS.primary }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span
            style={{
              color: APP_COLORS.textSecondary,
              fontFamily: APP_FONTS.body,
            }}
          >
            Loading Banners...
          </span>
        </div>
      </div>
    );
  }

  if (isError || !bannerData || bannerData.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden group shadow-md bg-white">
      <div
        className="flex w-full transition-transform duration-700 ease-in-out items-start h-auto md:h-96 lg:h-[500px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {bannerData.map((banner, index) => (
          <div
            key={banner.id}
            className={`w-full flex-shrink-0 relative bg-white overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
              currentIndex === index
                ? "max-h-[1500px] opacity-100"
                : "max-h-0 opacity-0 md:max-h-[1500px] md:opacity-100"
            } md:h-full`}
          >
            {/* Layout Logic */}
            {banner.bannerType === "IMAGE LEFT TEXT RIGHT" ? (
              <div className="flex flex-col md:flex-row w-full h-auto md:h-full">
                {/* Mobile par h-auto, Desktop par h-full */}
                <div className="w-full h-auto md:w-1/2 md:h-full">
                  <img
                    src={banner.imageUrl}
                    alt={banner.heading || "Temple Banner"}
                    className="w-full h-auto md:h-full object-contain md:object-fill"
                    loading="lazy"
                  />
                </div>

                <div className="w-full h-auto md:w-1/2 md:h-full flex flex-col justify-center px-5 py-6 md:px-12 md:py-8">
                  {banner.heading && (
                    <h2
                      className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold uppercase mb-2 md:mb-4"
                      style={{
                        color: APP_COLORS.primary,
                        fontFamily: APP_FONTS.heading,
                      }}
                    >
                      {banner.heading}
                    </h2>
                  )}
                  {banner.description && (
                    <div
                      className="text-xs sm:text-sm md:text-base lg:text-lg line-clamp-4"
                      style={{
                        color: APP_COLORS.textPrimary,
                        fontFamily: APP_FONTS.body,
                      }}
                      dangerouslySetInnerHTML={{ __html: banner.description }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <img
                src={banner.imageUrl}
                alt="Temple Banner"
                className="w-full h-auto md:h-full object-contain md:object-fill block"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {bannerData.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-6 md:w-8" : "opacity-50"
              }`}
              style={{
                backgroundColor:
                  currentIndex === index
                    ? APP_COLORS.primary
                    : APP_COLORS.textSecondary,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
