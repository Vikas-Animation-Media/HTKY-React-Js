/**
 * @file src/pages/Home/index.jsx
 * @description Main landing page for the application.
 * Using index.jsx allows us to colocate Home-specific UI components in this folder later.
 */


export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-lg shadow-sm border border-gray-100 p-8 mt-4 animate-fade-in">
      <div className="text-center space-y-4">
        <h2
          className="text-3xl md:text-5xl font-bold text-[#800000] tracking-wider uppercase"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Welcome to Sree Devi Peetham
        </h2>

        <p className="text-gray-600 md:text-lg max-w-2xl mx-auto font-medium">
          The Home Page container is successfully mounted and connected to the
          Router.
        </p>

        <div className="pt-6">
          <span className="inline-block px-4 py-2 bg-orange-100 text-[#800000] font-semibold text-sm rounded border border-orange-200 border-dashed">
            Dynamic sections (Events, Announcements, Donations) will be added
            here next.
          </span>
        </div>
      </div>
    </div>
  );
}
