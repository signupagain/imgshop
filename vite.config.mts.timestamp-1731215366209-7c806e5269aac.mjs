// vite.config.mts
import AutoImport from "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/node_modules/unplugin-vue-components/dist/vite.js";
import Fonts from "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/node_modules/unplugin-fonts/dist/vite.mjs";
import Layouts from "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Vue from "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueRouter from "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/node_modules/unplugin-vue-router/dist/vite.js";
import VueDevTools from "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Vuetify, { transformAssetUrls } from "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/node_modules/vite-plugin-vuetify/dist/index.mjs";
import { defineConfig } from "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///E:/NODE_ENV/v20.18.0/project/Vue/imgshop/vite.config.mts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({
      dts: "src/@types/typed-router.d.ts"
    }),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        {
          "vue-router/auto": ["useRoute", "useRouter"]
        }
      ],
      dts: "src/@types/auto-imports.d.ts",
      eslintrc: {
        enabled: true
      },
      vueTemplate: true
    }),
    Components({
      dts: "src/@types/components.d.ts"
    }),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss"
      }
    }),
    Fonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900"
          }
        ]
      }
    }),
    VueDevTools()
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  },
  server: {
    port: 3e3,
    proxy: {
      "/pexels": {
        target: "https://api.pexels.com/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pexels/, "")
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    },
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[hash:base64:5]"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcTk9ERV9FTlZcXFxcdjIwLjE4LjBcXFxccHJvamVjdFxcXFxWdWVcXFxcaW1nc2hvcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcTk9ERV9FTlZcXFxcdjIwLjE4LjBcXFxccHJvamVjdFxcXFxWdWVcXFxcaW1nc2hvcFxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L05PREVfRU5WL3YyMC4xOC4wL3Byb2plY3QvVnVlL2ltZ3Nob3Avdml0ZS5jb25maWcubXRzXCI7Ly8gUGx1Z2luc1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgRm9udHMgZnJvbSAndW5wbHVnaW4tZm9udHMvdml0ZSdcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSdcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgVnVldGlmeSwgeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5J1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFtcblx0XHRWdWVSb3V0ZXIoe1xuXHRcdFx0ZHRzOiAnc3JjL0B0eXBlcy90eXBlZC1yb3V0ZXIuZC50cycsXG5cdFx0fSksXG5cdFx0TGF5b3V0cygpLFxuXHRcdEF1dG9JbXBvcnQoe1xuXHRcdFx0aW1wb3J0czogW1xuXHRcdFx0XHQndnVlJyxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCd2dWUtcm91dGVyL2F1dG8nOiBbJ3VzZVJvdXRlJywgJ3VzZVJvdXRlciddLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdGR0czogJ3NyYy9AdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuXHRcdFx0ZXNsaW50cmM6IHtcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR2dWVUZW1wbGF0ZTogdHJ1ZSxcblx0XHR9KSxcblx0XHRDb21wb25lbnRzKHtcblx0XHRcdGR0czogJ3NyYy9AdHlwZXMvY29tcG9uZW50cy5kLnRzJyxcblx0XHR9KSxcblx0XHRWdWUoe1xuXHRcdFx0dGVtcGxhdGU6IHsgdHJhbnNmb3JtQXNzZXRVcmxzIH0sXG5cdFx0fSksXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3Z1ZXRpZnlqcy92dWV0aWZ5LWxvYWRlci90cmVlL21hc3Rlci9wYWNrYWdlcy92aXRlLXBsdWdpbiNyZWFkbWVcblx0XHRWdWV0aWZ5KHtcblx0XHRcdGF1dG9JbXBvcnQ6IHRydWUsXG5cdFx0XHRzdHlsZXM6IHtcblx0XHRcdFx0Y29uZmlnRmlsZTogJ3NyYy9zdHlsZXMvc2V0dGluZ3Muc2NzcycsXG5cdFx0XHR9LFxuXHRcdH0pLFxuXHRcdEZvbnRzKHtcblx0XHRcdGdvb2dsZToge1xuXHRcdFx0XHRmYW1pbGllczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6ICdSb2JvdG8nLFxuXHRcdFx0XHRcdFx0c3R5bGVzOiAnd2dodEAxMDA7MzAwOzQwMDs1MDA7NzAwOzkwMCcsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0fSksXG5cdFx0VnVlRGV2VG9vbHMoKSxcblx0XSxcblx0ZGVmaW5lOiB7ICdwcm9jZXNzLmVudic6IHt9IH0sXG5cdHJlc29sdmU6IHtcblx0XHRhbGlhczoge1xuXHRcdFx0J0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG5cdFx0fSxcblx0XHRleHRlbnNpb25zOiBbJy5qcycsICcuanNvbicsICcuanN4JywgJy5tanMnLCAnLnRzJywgJy50c3gnLCAnLnZ1ZSddLFxuXHR9LFxuXHRzZXJ2ZXI6IHtcblx0XHRwb3J0OiAzMDAwLFxuXHRcdHByb3h5OiB7XG5cdFx0XHQnL3BleGVscyc6IHtcblx0XHRcdFx0dGFyZ2V0OiAnaHR0cHM6Ly9hcGkucGV4ZWxzLmNvbS92MS8nLFxuXHRcdFx0XHRjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHRcdHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvcGV4ZWxzLywgJycpLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9LFxuXHRjc3M6IHtcblx0XHRwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG5cdFx0XHRzY3NzOiB7XG5cdFx0XHRcdGFwaTogJ21vZGVybi1jb21waWxlcicsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0bW9kdWxlczoge1xuXHRcdFx0bG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZScsXG5cdFx0XHRnZW5lcmF0ZVNjb3BlZE5hbWU6ICdbaGFzaDpiYXNlNjQ6NV0nLFxuXHRcdH0sXG5cdH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZUFBZTtBQUN0QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFdBQVcsMEJBQTBCO0FBRzVDLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZSxXQUFXO0FBWmlLLElBQU0sMkNBQTJDO0FBZXJQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNULEtBQUs7QUFBQSxJQUNOLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxNQUNWLFNBQVM7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0MsbUJBQW1CLENBQUMsWUFBWSxXQUFXO0FBQUEsUUFDNUM7QUFBQSxNQUNEO0FBQUEsTUFDQSxLQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDVCxTQUFTO0FBQUEsTUFDVjtBQUFBLE1BQ0EsYUFBYTtBQUFBLElBQ2QsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1YsS0FBSztBQUFBLElBQ04sQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLE1BQ0gsVUFBVSxFQUFFLG1CQUFtQjtBQUFBLElBQ2hDLENBQUM7QUFBQTtBQUFBLElBRUQsUUFBUTtBQUFBLE1BQ1AsWUFBWTtBQUFBLE1BQ1osUUFBUTtBQUFBLFFBQ1AsWUFBWTtBQUFBLE1BQ2I7QUFBQSxJQUNELENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNQLFVBQVU7QUFBQSxVQUNUO0FBQUEsWUFDQyxNQUFNO0FBQUEsWUFDTixRQUFRO0FBQUEsVUFDVDtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsSUFDRCxDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsRUFDYjtBQUFBLEVBQ0EsUUFBUSxFQUFFLGVBQWUsQ0FBQyxFQUFFO0FBQUEsRUFDNUIsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUNyRDtBQUFBLElBQ0EsWUFBWSxDQUFDLE9BQU8sU0FBUyxRQUFRLFFBQVEsT0FBTyxRQUFRLE1BQU07QUFBQSxFQUNuRTtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ04sV0FBVztBQUFBLFFBQ1YsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxVQUFRLEtBQUssUUFBUSxhQUFhLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSixxQkFBcUI7QUFBQSxNQUNwQixNQUFNO0FBQUEsUUFDTCxLQUFLO0FBQUEsTUFDTjtBQUFBLElBQ0Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLGtCQUFrQjtBQUFBLE1BQ2xCLG9CQUFvQjtBQUFBLElBQ3JCO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
