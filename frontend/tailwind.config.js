module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // add other paths if needed
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: true, // set your preferred theme here
  },
}