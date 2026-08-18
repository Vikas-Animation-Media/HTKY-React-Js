import { useGetParayanamCount } from "../../../hooks/queries/useGetParayanamCount";
import { APP_COLORS } from "../../../constants/appColors";
import { APP_FONTS } from "../../../constants/appTheme";

export const ParayanamWidget = () => {
  const { data, isLoading, isError } = useGetParayanamCount();

  // Keyframes for the marching ants animation
  const animatedStyles = `
        @keyframes marching-ants {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -24; }
        }
        .animate-border {
            animation: marching-ants 1.5s linear infinite;
        }
    `;

  if (isLoading) {
    return (
      <section className="w-full bg-white py-8 flex justify-center items-center">
        <div className="w-[96%] max-w-[1350px] h-48 bg-orange-50/50 animate-pulse border border-orange-200 rounded-sm"></div>
      </section>
    );
  }

  if (isError || !data) {
    return null;
  }

  const targetCountStr = data.targetCount?.toLocaleString("en-US") || "0";
  const currentCountStr = data.sum?.toLocaleString("en-US") || "0";
  const kotiTargetStr =
    (data.targetCount * 1000).toLocaleString("en-US") || "0";
  const currentKotiCountStr = data.kotiCount?.toLocaleString("en-US") || "0";

  return (
    <section className="w-full bg-white py-6 md:py-10 flex justify-center items-center antialiased">
      <style>{animatedStyles}</style>
      <div
        className="relative w-[96%] max-w-[1450px] mx-auto bg-white bg-[url('/src/assets/bg-card.png')] bg-cover bg-center shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] rounded-[2px]"
        style={{ fontFamily: APP_FONTS.body }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-[2px]">
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            fill="none"
            stroke="#c2410c" /* Premium Orange/Red Stroke */
            strokeWidth="2"
            strokeDasharray="6, 6"
            className="animate-border"
          />
        </svg>

        {/* Content Layer (Z-10) */}
        <div className="relative z-10 w-full px-2 py-6 md:px-12 md:py-8 flex flex-col">
          {/* Top Row: Title & Dates */}
          <div className="text-center w-full flex flex-col items-center">
            <h2
              className="text-2xl md:text-[36px] font-bold mb-1.5 md:mb-2 tracking-wide drop-shadow-sm"
              style={{
                color: APP_COLORS.primary,
                fontFamily: APP_FONTS.heading,
                fontStyle: "italic",
              }}
            >
              {data.eventName}
            </h2>
            {data.startDate && data.endDate && (
              <p
                className="text-sm md:text-[20px] font-bold tracking-wide"
                style={{
                  color: APP_COLORS.primary,
                  fontFamily: APP_FONTS.heading,
                  fontStyle: "italic",
                }}
              >
                {data.startDate} - {data.endDate}
              </p>
            )}
          </div>

          {/* Faint Horizontal Divider */}
          <div className="w-full flex justify-center my-6 md:my-4">
            <div className="w-[100%] md:w-full h-px bg-red-900/15"></div>
          </div>

          {/* Middle Row: Participating Devotees */}
          <div className="text-center mb-2 md:mb-8">
            <p className="text-[18px] md:text-[23px] font-bold text-gray-900 tracking-wide">
              Participating Devotees:{" "}
              {data.participatingDevotees?.toLocaleString("en-US") || 0}
            </p>
          </div>

          {/* Bottom Data Grid */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-6 xl:px-8">
            {/* Column 1: Image Thumbnail */}
            <div className="w-full md:w-auto flex justify-center flex-shrink-0">
              {/* Uses a fallback gray block if image is missing from assets */}
              <div className="relative bg-gray-100 rounded-md shadow-md border border-gray-200 overflow-hidden flex items-center justify-center w-[160px] h-[100px] md:w-[150px] md:h-[95px]">
                <img
                  src="/src/assets/participant.jpeg"
                  alt="Parayanam"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => (e.target.style.opacity = "0")} // Hides broken image, reveals gray block
                />
              </div>
            </div>

            {/* Column 2: Target Stats */}
            <div className="flex flex-col space-y-2.5 text-[12px] md:text-[17px] font-semibold text-gray-700 flex-grow md:pl-6 text-center md:text-left">
              <p>
                Target Count Parayanam:{" "}
                <span className="font-bold text-black">{targetCountStr}</span>
              </p>
              <p>
                Koti Nama Stothra Parayanam:{" "}
                <span className="font-bold text-black">{kotiTargetStr}</span>
              </p>
            </div>

            {/* Vertical Divider (Visible on Desktop) */}
            <div className="hidden md:block w-px h-16 bg-red-900/15 mx-2 lg:mx-4"></div>

            {/* Column 3: Current Stats */}
            <div className="flex flex-col space-y-2.5 text-[12px] md:text-[17px] font-semibold text-gray-700 flex-grow text-center md:text-left">
              <p>
                Current Count Parayanam:{" "}
                <span className="font-bold text-black">
                  {currentCountStr} \ {targetCountStr}
                </span>
              </p>
              <p>
                Koti Nama Stothra Parayanam:{" "}
                <span className="font-bold text-black">
                  {currentKotiCountStr} \ {kotiTargetStr}
                </span>
              </p>
            </div>

            {/* Column 4: Action Button */}
            <div className="flex justify-center flex-shrink-0 mt-4 md:mt-0 md:pl-4">
              <button
                className="text-white px-8 py-3 text-[14px] font-bold uppercase tracking-wider transition-all hover:bg-red-800 shadow-md rounded-[2px]"
                style={{ backgroundColor: APP_COLORS.primary }}
              >
                Participate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
