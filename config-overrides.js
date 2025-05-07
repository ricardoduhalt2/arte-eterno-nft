const webpack = require('webpack');

module.exports = function override(config) {
  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "stream": require.resolve("stream-browserify"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "crypto": require.resolve("crypto-browserify"),
    "buffer": require.resolve("buffer"),
    "url": require.resolve("url"),
    "assert": require.resolve("assert"),
    "os": require.resolve("os-browserify/browser"),
    "path": require.resolve("path-browserify"),
    "process": require.resolve("process/browser"),
    "fs": false,
    "net": false,
    "tls": false,
  };

  // Add buffer plugin
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process',
    }),
  ];

  return config;
};