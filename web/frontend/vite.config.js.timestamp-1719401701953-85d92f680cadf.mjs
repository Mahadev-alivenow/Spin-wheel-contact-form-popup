// vite.config.js
import { defineConfig } from "file:///Users/maddy/Downloads/Shopify%20template/node_modules/vite/dist/node/index.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import react from "file:///Users/maddy/Downloads/Shopify%20template/node_modules/@vitejs/plugin-react/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/maddy/Downloads/Shopify%20template/web/frontend/vite.config.js";
if (process.env.npm_lifecycle_event === "build" && !process.env.CI && !process.env.SHOPIFY_API_KEY) {
  console.warn(
    "\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n"
  );
}
var proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false
};
var host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, "") : "localhost";
var hmrConfig;
if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443
  };
}
var vite_config_default = defineConfig({
  root: dirname(fileURLToPath(__vite_injected_original_import_meta_url)),
  plugins: [react()],
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY)
  },
  resolve: {
    preserveSymlinks: true
  },
  server: {
    host: "localhost",
    port: process.env.FRONTEND_PORT,
    hmr: hmrConfig,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/api(/|(\\?.*)?$)": proxyOptions,
      "^/userdata(/|(\\?.*)?$)": proxyOptions
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFkZHkvRG93bmxvYWRzL1Nob3BpZnkgdGVtcGxhdGUvd2ViL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFkZHkvRG93bmxvYWRzL1Nob3BpZnkgdGVtcGxhdGUvd2ViL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYWRkeS9Eb3dubG9hZHMvU2hvcGlmeSUyMHRlbXBsYXRlL3dlYi9mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBkaXJuYW1lIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwidXJsXCI7XG5pbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbmlmIChcbiAgcHJvY2Vzcy5lbnYubnBtX2xpZmVjeWNsZV9ldmVudCA9PT0gXCJidWlsZFwiICYmXG4gICFwcm9jZXNzLmVudi5DSSAmJlxuICAhcHJvY2Vzcy5lbnYuU0hPUElGWV9BUElfS0VZXG4pIHtcbiAgY29uc29sZS53YXJuKFxuICAgIFwiXFxuQnVpbGRpbmcgdGhlIGZyb250ZW5kIGFwcCB3aXRob3V0IGFuIEFQSSBrZXkuIFRoZSBmcm9udGVuZCBidWlsZCB3aWxsIG5vdCBydW4gd2l0aG91dCBhbiBBUEkga2V5LiBTZXQgdGhlIFNIT1BJRllfQVBJX0tFWSBlbnZpcm9ubWVudCB2YXJpYWJsZSB3aGVuIHJ1bm5pbmcgdGhlIGJ1aWxkIGNvbW1hbmQuXFxuXCJcbiAgKTtcbn1cblxuY29uc3QgcHJveHlPcHRpb25zID0ge1xuICB0YXJnZXQ6IGBodHRwOi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuQkFDS0VORF9QT1JUfWAsXG4gIGNoYW5nZU9yaWdpbjogZmFsc2UsXG4gIHNlY3VyZTogdHJ1ZSxcbiAgd3M6IGZhbHNlLFxufTtcblxuY29uc3QgaG9zdCA9IHByb2Nlc3MuZW52LkhPU1RcbiAgPyBwcm9jZXNzLmVudi5IT1NULnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCBcIlwiKVxuICA6IFwibG9jYWxob3N0XCI7XG5cbmxldCBobXJDb25maWc7XG5pZiAoaG9zdCA9PT0gXCJsb2NhbGhvc3RcIikge1xuICBobXJDb25maWcgPSB7XG4gICAgcHJvdG9jb2w6IFwid3NcIixcbiAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxuICAgIHBvcnQ6IDY0OTk5LFxuICAgIGNsaWVudFBvcnQ6IDY0OTk5LFxuICB9O1xufSBlbHNlIHtcbiAgaG1yQ29uZmlnID0ge1xuICAgIHByb3RvY29sOiBcIndzc1wiLFxuICAgIGhvc3Q6IGhvc3QsXG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuRlJPTlRFTkRfUE9SVCxcbiAgICBjbGllbnRQb3J0OiA0NDMsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKSxcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBkZWZpbmU6IHtcbiAgICBcInByb2Nlc3MuZW52LlNIT1BJRllfQVBJX0tFWVwiOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5TSE9QSUZZX0FQSV9LRVkpLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgcHJlc2VydmVTeW1saW5rczogdHJ1ZSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCJsb2NhbGhvc3RcIixcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5GUk9OVEVORF9QT1JULFxuICAgIGhtcjogaG1yQ29uZmlnLFxuICAgIHByb3h5OiB7XG4gICAgICBcIl4vKFxcXFw/LiopPyRcIjogcHJveHlPcHRpb25zLFxuICAgICAgXCJeL2FwaSgvfChcXFxcPy4qKT8kKVwiOiBwcm94eU9wdGlvbnMsXG4gICAgICBcIl4vdXNlcmRhdGEoL3woXFxcXD8uKik/JClcIjogcHJveHlPcHRpb25zLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1YsU0FBUyxvQkFBb0I7QUFDN1csU0FBUyxlQUFlO0FBQ3hCLFNBQVMscUJBQXFCO0FBRTlCLE9BQU8sV0FBVztBQUo4TCxJQUFNLDJDQUEyQztBQU1qUSxJQUNFLFFBQVEsSUFBSSx3QkFBd0IsV0FDcEMsQ0FBQyxRQUFRLElBQUksTUFDYixDQUFDLFFBQVEsSUFBSSxpQkFDYjtBQUNBLFVBQVE7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxlQUFlO0FBQUEsRUFDbkIsUUFBUSxvQkFBb0IsUUFBUSxJQUFJLFlBQVk7QUFBQSxFQUNwRCxjQUFjO0FBQUEsRUFDZCxRQUFRO0FBQUEsRUFDUixJQUFJO0FBQ047QUFFQSxJQUFNLE9BQU8sUUFBUSxJQUFJLE9BQ3JCLFFBQVEsSUFBSSxLQUFLLFFBQVEsZUFBZSxFQUFFLElBQzFDO0FBRUosSUFBSTtBQUNKLElBQUksU0FBUyxhQUFhO0FBQ3hCLGNBQVk7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQ0YsT0FBTztBQUNMLGNBQVk7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWO0FBQUEsSUFDQSxNQUFNLFFBQVEsSUFBSTtBQUFBLElBQ2xCLFlBQVk7QUFBQSxFQUNkO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNLFFBQVEsY0FBYyx3Q0FBZSxDQUFDO0FBQUEsRUFDNUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLCtCQUErQixLQUFLLFVBQVUsUUFBUSxJQUFJLGVBQWU7QUFBQSxFQUMzRTtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU0sUUFBUSxJQUFJO0FBQUEsSUFDbEIsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLE1BQ2Ysc0JBQXNCO0FBQUEsTUFDdEIsMkJBQTJCO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
