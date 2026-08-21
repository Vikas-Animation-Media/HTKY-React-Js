/**
 * @file src/pages/Home/components/VolunteerSubscribe.jsx
 * @description Dual CTA block for Volunteer Registration and Subscription.
 * Uses a dark overlay over dynamic background images for a premium look.
 */

import { useNavigate } from "react-router-dom";
import { useGetVolunteerSubscribe } from "../../../hooks/queries/Home/useVolunteerSubscribe";

export const VolunteerSubscribe = () => {
  const navigate = useNavigate();
  const { data: ctaList, isLoading } = useGetVolunteerSubscribe();

  // Skeleton Loader for sub-100ms perceived performance
  if (isLoading) {
    return (
      <section className="w-full flex flex-col md:flex-row h-auto md:h-80">
        {[1, 2].map((idx) => (
          <div
            key={idx}
            className="w-full md:w-1/2 h-72 md:h-full bg-gray-900 animate-pulse flex flex-col items-center justify-center p-8 space-y-4"
          >
            <div className="h-8 bg-white/20 rounded w-64" />
            <div className="h-4 bg-white/20 rounded w-full max-w-sm" />
            <div className="h-4 bg-white/20 rounded w-3/4 max-w-sm" />
            <div className="h-10 bg-white/20 rounded w-32 mt-4" />
          </div>
        ))}
      </section>
    );
  }

  if (!ctaList || ctaList.length === 0) return null;

  return (
    <section className="w-full flex flex-col md:flex-row border-t-4 border-red-900">
      {ctaList.map((item, index) => (
        <div
          key={item.id || index}
          className="relative w-full md:w-1/2 flex flex-col items-center justify-center text-center p-10 sm:p-14 md:p-16 min-h-[340px] md:min-h-[380px] overflow-hidden group"
        >
          {/* Background Image with Hover Scale */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          />

          {/* Dark Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 w-full h-full bg-black/75 md:bg-black/70 transition-colors duration-300 group-hover:bg-black/60" />

          {/* Content (z-10 ensures it stays above the overlay) */}
          <div className="relative z-10 flex flex-col items-center space-y-5 max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {item.title}
            </h2>

            <p className="text-sm sm:text-[15px] text-gray-200 leading-relaxed font-medium">
              {item.description}
            </p>

            {Array.isArray(item.buttons) && item.buttons.length > 0 && (
              <div className="pt-4">
                {item.buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(btn.path)}
                    className="px-8 py-2.5 bg-[#a30000] hover:bg-red-900 transition-colors duration-300 text-white text-sm font-semibold tracking-wider rounded-sm shadow-md active:scale-95 uppercase"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
