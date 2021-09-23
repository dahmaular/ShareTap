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
          "APPSYNC_APPID",
          "LOAD_STORYBOOK"
        ],
        safe: false,
        allowUndefined: true,
      },
    ],
   'react-native-reanimated/plugin',

  ],
};
