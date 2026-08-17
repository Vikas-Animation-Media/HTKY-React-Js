/**
 * @file src/components/layout/Header.jsx
 * @description The main Header component.
 * Refactored strictly to consume centralized APP_STRINGS, APP_COLORS, and APP_FONTS.
 * 100% preserves the original responsive UI structure, grid, and layout logic.
 */

import { useGetHeaderSettings } from "../../hooks/queries/useGetHeaderSettings";
import { useGetParayanamCount } from "../../hooks/queries/useGetParayanamCount";
import { APP_COLORS } from "../../constants/appColors";
import { APP_STRINGS } from "../../constants/appStrings";
import { APP_FONTS } from "../../constants/appTheme";

export const Header = () => {
  const {
    data: headerData,
    isLoading: isHeaderLoading,
    isError: isHeaderError,
  } = useGetHeaderSettings();

  const { data: parayanamData, isLoading: isParayanamLoading } =
    useGetParayanamCount();

  // Skeleton loading state for sub-100ms perceived performance
  if (isHeaderLoading) {
    return (
      <header
        className="w-full bg-white px-3 md:px-8 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between shadow-sm animate-pulse border-b-4"
        style={{ borderColor: APP_COLORS.primary }}
      >
        <div className="flex flex-row items-center space-x-3 w-full md:w-auto mb-3 md:mb-0">
          <div className="w-12 h-12 md:w-20 md:h-20 bg-gray-200 rounded-full"></div>
          <div className="w-40 md:w-64 h-8 bg-gray-200 rounded"></div>
        </div>
        <div className="w-full md:w-48 h-12 md:h-16 bg-gray-200 rounded"></div>
      </header>
    );
  }

  // error handling
  if (isHeaderError || !headerData) {
    return (
      <header className="w-full bg-red-50 p-4 text-center text-red-600 font-bold border-b border-red-200">
        {APP_STRINGS.errorLoadingConfig}
      </header>
    );
  }

  return (
    <header className="w-full px-3 md:px-8 py-2 md:py-4 flex flex-col xl:flex-row items-center bg-[url('/src/assets/header-bg.png')] bg-repeat bg-center">
      {/* ROW 1 (Mobile): Logo + Temple Name Wrapper.
        Note: 'xl:contents' removes this wrapper container from layout box on desktop,
        restoring the original 3-column Desktop layout seamlessly!
      */}
      <div className="flex flex-row items-center justify-center space-x-3 w-full xl:contents mb-2.5 xl:mb-0">
        {/* Logo */}
        <div className="flex-shrink-0">
          {headerData.logoUrl ? (
            <img
              src={headerData.logoUrl}
              alt={`${headerData.templeName} Logo`}
              className="h-16 w-16 sm:h-16 sm:w-16 md:h-24 md:w-24 xl:max-h-[10rem] xl:max-w-[10rem] object-contain p-0.5"
              loading="lazy"
            />
          ) : (
            <div className="h-16 w-16 sm:h-16 sm:w-16 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-gray-500">
                {APP_STRINGS.noLogoText}
              </span>
            </div>
          )}
        </div>

        {/* Temple Name */}
        <div className="text-left xl:text-center xl:flex-grow px-1">
          <h1
            className="text-xl sm:text-2xl md:text-5xl xl:text-6xl font-bold tracking-wider uppercase leading-tight"
            style={{
              color: APP_COLORS.primary,
              fontFamily: APP_FONTS.heading,
            }}
          >
            {headerData.templeName}
          </h1>
        </div>
      </div>

      {/* ROW 2 & ROW 3 (Mobile): Buttons and Chanting Details Box */}
      <div className="flex flex-col items-center xl:items-end space-y-2 md:space-y-3 w-full xl:w-auto">
        {/* Buttons (Row 2 on Mobile) */}
        <div className="flex flex-row justify-center w-full shadow-md">
          <button
            className="text-white px-3 py-2 md:px-7 md:py-3 text-xs md:text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity w-1/2 xl:w-auto"
            style={{ backgroundColor: APP_COLORS.primary }}
          >
            {APP_STRINGS.btnRequestPuja}
          </button>
          <button
            className="text-white px-3 py-2 md:px-7 md:py-3 text-xs md:text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity border-l border-yellow-500 w-1/2 xl:w-auto"
            style={{ backgroundColor: APP_COLORS.primary }}
          >
            {APP_STRINGS.btnDevoteePortal}
          </button>
        </div>

        {/* Chanting Details Box (Row 3 on Mobile) */}
        <div
          className="border border-dashed p-2 text-[10px] md:text-xs xl:text-sm text-center xl:text-right bg-orange-50 rounded-sm w-full xl:min-w-[320px]"
          style={{ borderColor: APP_COLORS.primary }}
        >
          {isParayanamLoading ? (
            <div className="animate-pulse flex flex-col space-y-1.5 items-center xl:items-end">
              <div className="h-3 bg-orange-200 rounded w-3/4"></div>
              <div className="h-3 bg-orange-200 rounded w-1/2"></div>
            </div>
          ) : (
            <>
              <p
                className="font-semibold italic tracking-wider mb-0.5 md:mb-1"
                style={{ color: APP_COLORS.primary }}
              >
                {parayanamData?.eventName} {APP_STRINGS.countLabel}{" "}
                {parayanamData?.sum?.toLocaleString("en-US") || 0}
              </p>
              <p
                className="font-semibold italic tracking-wider"
                style={{ color: APP_COLORS.primary }}
              >
                {APP_STRINGS.kotiNamaLabel}{" "}
                {parayanamData?.kotiCount?.toLocaleString("en-US") || 0}
              </p>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
