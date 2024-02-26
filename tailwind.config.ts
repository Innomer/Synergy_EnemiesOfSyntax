import { nextui } from "@nextui-org/react";
import type { LayoutTheme, ConfigThemes } from "@nextui-org/react";
import svgToDataUri from "mini-svg-data-uri";

import colors from "tailwindcss/colors";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

const theme: ConfigThemes = {
  light: {
    layout: {
      boxShadow: {
        small:
          "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
        medium:
          "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
        large:
          "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
      },
    },
    colors: {
      danger: "#dc2626",
    },
  },
  dark: {
    layout: {
      boxShadow: {
        small:
          "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
        medium:
          "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
        large:
          "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
      },
    },
    colors: {
      danger: "#b91c1c",
    },
  },
};

const layout: LayoutTheme = {
  spacingUnit: 4, // in px
  disabledOpacity: ".5", // this value is applied as opacity-[value] when the component is disabled
  dividerWeight: "1px", // h-divider the default height applied to the divider component
  fontSize: {
    tiny: "0.75rem", // text-tiny
    small: "0.875rem", // text-small
    medium: "1rem", // text-medium
    large: "1.125rem", // text-large
  },
  lineHeight: {
    tiny: "1rem", // text-tiny
    small: "1.25rem", // text-small
    medium: "1.5rem", // text-medium
    large: "1.75rem", // text-large
  },
  radius: {
    small: "8px", // rounded-small
    medium: "12px", // rounded-medium
    large: "14px", // rounded-large
  },
  borderWidth: {
    small: "1px", // border-small
    medium: "2px", // border-medium (default)
    large: "3px", // border-large
  },
};
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
const config = {
  content: [
    "./src/components/**/*.tsx",
    "./src/app/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple-deep": "#52057B",
        "purple-lighter": "#892CDC",
        "purple-lightest": "#BC6FF1",
        greenish: "#064331",
        yellowish: "#EBE000",
      },
      animation: {
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both",
      },
      keyframes: {
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: layout,
      themes: theme,
    }),
    addVariablesForColors,
    require("@tailwindcss/aspect-ratio"),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

export default config;
