/**
 * @file src/pages/Home/index.jsx
 * @description Main landing page for the application.
 * Using index.jsx allows us to colocate Home-specific UI components in this folder.
 */

import { BannerImages } from "./components/BannerImages";
import { ParayanamWidget } from "./components/ParayanamWidget";
import { APP_COLORS } from "../../constants/appColors";
import { APP_FONTS } from "../../constants/appTheme";
import { APP_STRINGS } from "../../constants/appStrings";

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      {/* 1. Dynamic Auto-Scrolling Hero Banner */}
      <BannerImages />
      <ParayanamWidget />

      {/* Placeholder for future Home Page sections (Events, Announcements, etc.) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        <h2
          className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4"
          style={{ color: APP_COLORS.primary, fontFamily: APP_FONTS.heading }}
        >
          Welcome to Sree Devi Peetham
        </h2>
        <p
          className="text-center max-w-2xl"
          style={{
            color: APP_COLORS.textSecondary,
            fontFamily: APP_FONTS.body,
          }}
        >
          {APP_STRINGS.loadingContent || "More features coming soon..."}
        </p>
      </section>
    </div>
  );
}
