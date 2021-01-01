module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "focus"],
      borderColor: ["focus", "hover"],
    },
  },
  plugins: [],
};
