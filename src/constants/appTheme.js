/**
 * @file src/constants/appTheme.js
 * @description Centralized Theme & Typography configuration inspired by Flutter's ThemeData and TextTheme.
 * Provides a single source of truth for Font Families, Text Styles, Shadows, and Radius extensions.
 * Uses Object.freeze() to prevent runtime mutations and ensure memory safety.
 */

import { APP_COLORS } from "./appColors";

/**
 * Font Families used across the application
 */
export const APP_FONTS = Object.freeze({
    heading: "Georgia, serif", // Primary heading font (Traditional/Serif look for temple theme)
    body: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", // Clean modern sans-serif for body
});

/**
 * Centralized Text Styles
 */
export const APP_TYPOGRAPHY = Object.freeze({
    // Main Temple Heading (Hero/Header Title)
    headerTitle: {
        fontFamily: APP_FONTS.heading,
        fontSize: "clamp(1.25rem, 4vw, 3.75rem)", // Responsive font scaling (xl to 6xl)
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        lineHeight: "1.1",
        color: APP_COLORS.primary,
    },

    // Section Headings (H2)
    sectionHeading: {
        fontFamily: APP_FONTS.heading,
        fontSize: "1.5rem", // 24px
        fontWeight: "700",
        letterSpacing: "0.025em",
        lineHeight: "1.3",
        color: APP_COLORS.textPrimary,
    },

    // Subsection Headings (H3)
    subSectionHeading: {
        fontFamily: APP_FONTS.heading,
        fontSize: "1.125rem", // 18px
        fontWeight: "600",
        lineHeight: "1.4",
        color: APP_COLORS.textPrimary,
    },

    // Body Regular Text
    bodyRegular: {
        fontFamily: APP_FONTS.body,
        fontSize: "0.875rem", // 14px
        fontWeight: "400",
        lineHeight: "1.5",
        color: APP_COLORS.textSecondary,
    },

    // Button Labels
    buttonText: {
        fontFamily: APP_FONTS.body,
        fontSize: "0.875rem", // 14px
        fontWeight: "600",
        letterSpacing: "0.025em",
        textTransform: "capitalize",
    },

    // Badge / Small Captions
    caption: {
        fontFamily: APP_FONTS.body,
        fontSize: "0.75rem", // 12px
        fontWeight: "500",
        lineHeight: "1.2",
        color: APP_COLORS.textSecondary,
    },
});

/**
 * UI Style Extensions (Equivalent to Flutter's ThemeExtension)
 * Defines reusable shadows, borders, and rounded radii.
 */
export const APP_THEME_EXTENSION = Object.freeze({
    // Border Radius Options
    borderRadius: {
        small: "2px",
        medium: "4px",
        large: "8px",
        full: "9999px",
    },

    // Elevation / Shadows
    shadows: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        elevated: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        dropdown: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },

    // Component Borders
    borders: {
        standard: `1px solid ${APP_COLORS.border}`,
        dashedBrand: `1px dashed ${APP_COLORS.primary}`,
        thickHeaderBorder: `4px solid ${APP_COLORS.primary}`,
    },
});