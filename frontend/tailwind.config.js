module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // add other paths if needed
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // set your preferred theme here
  },
}