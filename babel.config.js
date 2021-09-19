module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
        blocklist: null,
        allowlist:  [
          "GRAPHQL_ENDPOINT",
          "APPSYNC_APIKEY",
          "APPSYNC_REGION",
          "APPSYNC_APPID"
        ],
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
