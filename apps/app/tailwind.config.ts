import baseConfig from "@v1/ui/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // breakpoint for only apply page checkout screen abbreviation
        checkout: "990px",
      },
    },
  },
  presets: [baseConfig],
} satisfies Config;
