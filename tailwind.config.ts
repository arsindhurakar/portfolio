import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-300": "rgba(var(--color-primary-rgb), 0.9)",
        secondary: "var(--color-secondary)",
        text: "var(--color-white)",
        "background-primary": "var(--color-background-primary)",
        "background-secondary": "var(--color-background-secondary)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
        ghost: "var(--font-ghost)",
      },
      borderRadius: {
        small: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
      },
      fontSize: {
        h1: "var(--font-size-h1)",
        h2: "var(--font-size-h2)",
        h3: "var(--font-size-h3)",
        h4: "var(--font-size-h4)",
        h5: "var(--font-size-h5)",
        h6: "var(--font-size-h6)",
        base: "var(--font-size-p)",
        small: "var(--font-size-small)",
      },
    },
  },
  plugins: [],
};

export default config;
