function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export const Theme = {
  colors: {
    primary: getCssVar("--color-primary"),
    secondary: getCssVar("--color-secondary"),
    text: getCssVar("--color-white"),
    "background-primary": getCssVar("--color-background-primary"),
    "background-secondary": getCssVar("--color-background-primary"),
  },

  fonts: {
    heading: getCssVar("--font-heading"),
    body: getCssVar("--font-body"),
  },

  borderRadius: {
    sm: getCssVar("--radius-sm"),
    md: getCssVar("--radius-md"),
    lg: getCssVar("--radius-lg"),
  },

  spacing: {
    xs: getCssVar("--spacing-xs"),
    sm: getCssVar("--spacing-sm"),
    md: getCssVar("--spacing-md"),
    lg: getCssVar("--spacing-lg"),
    xl: getCssVar("--spacing-xl"),
  },

  fontSizes: {
    h1: getCssVar("--font-size-h1"),
    h2: getCssVar("--font-size-h2"),
    h3: getCssVar("--font-size-h3"),
    h4: getCssVar("--font-size-h4"),
    h5: getCssVar("--font-size-h5"),
    h6: getCssVar("--font-size-h6"),
    p: getCssVar("--font-size-p"),
    small: getCssVar("--font-size-small"),
  },
};
