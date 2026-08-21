/**
 * @file src/pages/Home/index.jsx
 * @description Main landing page for the application.
 * Using index.jsx allows us to colocate Home-specific UI components in this folder.
 */

import { BannerImages } from "./components/BannerImages";
import { ParayanamWidget } from "./components/ParayanamWidget";
import { EventsWidget } from "./components/Events";
import { DonationCards } from "./components/DonationCards";
import { AboutHtky } from "./components/AboutHtky";
import { AboutHsky } from "./components/AboutHsky";
import { VolunteerSubscribe } from "./components/VolunteerSubscribe";

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      {/* 1. Dynamic Auto-Scrolling Hero Banner */}
      <BannerImages />
      <ParayanamWidget />
      <EventsWidget />
      <AboutHtky />
      <DonationCards />
      <AboutHsky />
      <VolunteerSubscribe />
    </div>
  );
}
