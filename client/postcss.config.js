// PostCSS pipeline: Tailwind compiles the @tailwind directives, autoprefixer
// adds vendor prefixes for older browsers. Vite picks this up automatically.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
