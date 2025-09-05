/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
   ],
   theme: {
      screens: {
         sm: "1px", // applies styles for screens wider than or equal to 640px

         md: "768px",
         // => @media (min-width: 768px) { ... }

         lg: "992px",
         // => @media (min-width: 992px) { ... }

         xl: "1200px",
         // => @media (min-width: 1200px) { ... }
      },
      extend: {},
   },
   plugins: [],
};
