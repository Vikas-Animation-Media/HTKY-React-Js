// /**
//  * @file src/App.jsx
//  * @description Root Application component configured with TanStack Query Provider,
//  * React Router DOM, and MainLayout routing shell.
//  */

// import { lazy } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { MainLayout } from "./components/layout/MainLayout";

// // Singleton TanStack Query Client instance configured with safe production defaults
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // 5 minutes cache validity
//       gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
//       retry: 2,
//       refetchOnWindowFocus: false, // Prevents aggressive background API spamming
//     },
//   },
// });

// // Fail-safe Lazy-loaded Home Page component with module loading error boundary
// const Home = lazy(() =>
//   import("./pages/Home").catch((error) => {
//     console.error(
//       "[Lazy Load Error] Failed to import Home page module:",
//       error,
//     );
//     return {
//       default: () => (
//         <div className="p-8 text-center bg-red-50 text-[#800000] rounded-md my-4 border border-red-200">
//           <p className="font-semibold text-base">
//             Unable to load page content. Please refresh your browser.
//           </p>
//         </div>
//       ),
//     };
//   }),
// );

// // Fallback Presentational Component for Unmatched Routes (404 Page)
// const NotFound = () => (
//   <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4 py-8">
//     <h2 className="text-5xl font-extrabold text-[#800000] mb-2 tracking-wide">
//       404
//     </h2>
//     <p className="text-gray-700 font-medium mb-4">
//       The requested page could not be found.
//     </p>
//     <a
//       href="/"
//       className="bg-[#800000] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-red-900 transition-colors shadow"
//     >
//       Return to Home
//     </a>
//   </div>
// );

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Routes>
//           {/* Main Layout Shell wrapping dynamic sub-routes via <Outlet /> */}
//           <Route path="/" element={<MainLayout />}>
//             <Route index element={<Home />} />
//             <Route path="*" element={<NotFound />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }

/**
 * @file src/App.jsx
 * @description Root Application Routing Configuration.
 * Combines React Router v6.4+ Data APIs (createBrowserRouter) with
 * React.lazy() for optimal bundle splitting and 100% crash immunity.
 */

import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainLayout } from "./components/layout/MainLayout";
import { APP_COLORS } from "./constants/appColors";
import { APP_FONTS } from "./constants/appTheme";

// 1. TanStack Query Configuration (Safe Defaults)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// 2. Global Route Error Boundary (Catches BOTH runtime crashes AND chunk load failures)
const GlobalErrorFallback = () => (
  <div
    className="w-full h-screen flex flex-col items-center justify-center p-4 text-center"
    style={{
      backgroundColor: APP_COLORS.surfaceLight,
      fontFamily: APP_FONTS.body,
    }}
  >
    <h1
      className="text-3xl font-extrabold mb-3"
      style={{ color: APP_COLORS.primary }}
    >
      Page Failed to Load
    </h1>
    <p className="font-medium mb-6" style={{ color: APP_COLORS.textSecondary }}>
      We encountered an issue displaying this content.
    </p>
    <a
      href="/"
      className="px-6 py-2.5 rounded shadow font-semibold hover:opacity-80 transition-opacity"
      style={{
        backgroundColor: APP_COLORS.primary,
        color: APP_COLORS.textInverse,
      }}
    >
      Return to Home Page
    </a>
  </div>
);

// 3. Fallback for 404 Routes
const NotFoundFallback = () => (
  <div
    className="w-full h-[60vh] flex items-center justify-center font-bold text-2xl"
    style={{ color: APP_COLORS.primary }}
  >
    404 - Page Not Found
  </div>
);

// 4. Lazy Loaded Pages (Bundle Splitting)
const HomePage = lazy(() => import("./pages/Home"));

// 5. Modern Data Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <GlobalErrorFallback />, // Ultimate crash protection here
    children: [
      {
        index: true,
        // Suspense wraps lazy loaded components
        element: (
          <Suspense
            fallback={
              <div className="p-8 text-center animate-pulse">Loading...</div>
            }
          >
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFoundFallback />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
