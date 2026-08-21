/**
 * @file src/pages/Home/components/DonationCards.jsx
 * @description Dynamic grid of donation cards.
 * Now strictly consumes the useGetDonationCards hook for future-proof API readiness.
 */

import { useNavigate } from "react-router-dom";
import { useGetDonationCards } from "../../../hooks/queries/Home/useGetDonationCards";
import { APP_COLORS } from "../../../constants/appColors";
import { APP_FONTS } from "../../../constants/appTheme";

export const DonationCards = () => {
  const navigate = useNavigate();
  const { data: donationCards, isLoading, isError } = useGetDonationCards();

  const handleCardClick = (path) => {
    // Fast SPA navigation
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Rule #1 & #2: Safe loading skeleton so layout doesn't jump
  if (isLoading) {
    return (
      <section className="w-full bg-white py-12 md:py-20 flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-64 bg-gray-100 animate-pulse rounded shadow-sm"></div>
          <div className="h-64 bg-gray-100 animate-pulse rounded shadow-sm"></div>
          <div className="h-64 bg-gray-100 animate-pulse rounded shadow-sm"></div>
        </div>
      </section>
    );
  }

  // Rule #5: Graceful fallback if data fetching fails or is empty
  if (isError || !donationCards || donationCards.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-7 md:py-10 flex flex-col items-center bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 text-gray-800">
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-7 px-4 flex flex-col items-center">
        <h2
          className="text-2xl md:text-4xl font-bold tracking-wide"
          style={{ color: APP_COLORS.primary, fontFamily: APP_FONTS.heading }}
        >
          Hindu Temple of Kentucky Services
        </h2>
        {/* Decorative Divider */}
        <img
          src="/src/assets/border.png"
          alt="divider"
          className="mt-3 md:mt-4 w-48 md:w-80 h-auto opacity-80 pointer-events-none"
          loading="lazy"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>

      {/* Dynamic Grid Canvas */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {donationCards.map((card) => (
            /* Card Wrapper: Interactive group for hover animations */
            <div
              key={card.id}
              onClick={() => handleCardClick(card.path)}
              className="group flex flex-col bg-white rounded-[4px] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
            >
              {/* Card Image Wrapper with Zoom Effect */}
              <div className="w-full h-56 md:h-48 lg:h-64 overflow-hidden bg-gray-100 relative,">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-fill transition-transform duration-700 ease-in-out group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.opacity = 0;
                    e.target.parentElement.classList.add("bg-slate-200");
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="w-full p-5 md:p-6 flex flex-col items-center justify-center bg-white z-10">
                <h3
                  className="text-lg md:text-xl font-bold text-gray-900 text-center tracking-wide"
                  style={{ fontFamily: APP_FONTS.body }}
                >
                  {card.title}
                </h3>
                {/* Divider under title */}
                <img
                  src="/src/assets/border2.png"
                  alt="divider"
                  className="mt-2 w-20 md:w-24 h-auto opacity-70 pointer-events-none transition-opacity group-hover:opacity-100"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
