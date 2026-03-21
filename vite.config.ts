import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

// const app = VitePWA({
//   registerType: "autoUpdate",
//   manifest: {
//     name: "Account Mannager",
//     short_name: "AMS",
//     description: "Save your account infomation",
//     theme_color: "#00695c",
//     display: "standalone",
//     scope: "/",
//     start_url: "/",
//     icons: [
//       {
//         src: "./public/logo192.png",
//         sizes: "192x192",
//         type: "image/png",
//       },
//       {
//         src: "./public/logo512.png",
//         sizes: "512x512",
//         type: "image/png",
//       },
//     ],
//   },
//   workbox: {
//     cleanupOutdatedCaches: true,
//   },
// })
export default defineConfig({
  plugins: [react()],
});
