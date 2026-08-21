/**
 * @file src/components/AboutHtky/AboutHtky.jsx
 * @description About section updated to match the deep red layout from the new screenshot, preserving original fonts.
 */

import { useNavigate } from "react-router-dom";
import { useGetAboutHsky } from "../../../hooks/queries/Home/useAboutHinduSchool";

export const AboutHsky = () => {
  const navigate = useNavigate();
  const { data: aboutList, isLoading } = useGetAboutHsky();

  if (isLoading) {
    return (
      <section className="w-full py-16 bg-[#800000]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse flex flex-col items-center">
            {/* Skeleton Title */}
            <div className="h-10 bg-white/20 rounded w-64 mb-4" />
            <div className="h-4 bg-white/20 rounded w-48 mb-12" />

            {/* Skeleton Content */}
            <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-14">
              <div className="w-full lg:w-1/2 h-80 sm:h-96 bg-white/20 rounded-md" />
              <div className="w-full lg:w-1/2 space-y-4 pt-4">
                <div className="h-4 bg-white/20 rounded w-full" />
                <div className="h-4 bg-white/20 rounded w-full" />
                <div className="h-4 bg-white/20 rounded w-5/6" />
                <div className="flex justify-end pt-6">
                  <div className="h-10 bg-white/20 rounded w-36" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!aboutList || aboutList.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 lg:py-10 bg-[#800000] overflow-hidden">
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {aboutList.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id || index}
              className={`flex flex-col ${index !== 0 ? "mt-20" : ""}`}
            >
              {/* Top Centered Title & Divider */}
              <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white font-serif leading-tight tracking-wide">
                  {item.title}
                </h2>
                <div className="flex justify-center mt-3">
                  <img
                    src="/src/assets/border.png"
                    alt="divider"
                    className="w-48 sm:w-80 lg:w-96 h-auto object-cover pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>

              {/* Content Row: Image and Text */}
              <div
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-stretch gap-8 sm:gap-10 lg:gap-10`}
              >
                {/* Image Side (Clean edges like screenshot) */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-xl overflow-hidden shadow-xl rounded-sm">
                    <img
                      src={item.imageUrl}
                      alt={item.title || "About Section"}
                      className="w-full h-full min-h-[300px] lg:min-h-[360px] object-cover transition-transform duration-500 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                  {/* Description */}
                  <p className="text-base sm:text-lg lg:text-xl text-white text-justify leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Dynamic CTA Button (Right Aligned like SS) */}
                  {Array.isArray(item.buttons) && item.buttons.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center justify-end w-full">
                      {item.buttons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => navigate(btn.path)}
                          className="group flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md transform active:scale-95 bg-transparent text-white border border-white hover:bg-white/10"
                        >
                          {btn.label}
                          {/* Paper Plane Icon matches the Screenshot */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                          >
                            <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
