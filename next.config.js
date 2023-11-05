/** @type {import('next').NextConfig} */

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const monacoRules = [
  {
    test: /\.ttf$/,
    type: "asset/resource",
  },
];

module.exports = {
  webpack: (config, { isServer }) => {
    // Modify config and then return it
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["javascript", "markdown", "yaml", "typescript", "python"],
          filename: "static/[name].worker.js",
        })
      );
      config.module.rules.push(...monacoRules);
    }

    return config;
  },
};
