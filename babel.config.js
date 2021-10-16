module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
        blocklist: null,
        allowlist: [
          'GRAPHQL_ENDPOINT',
          'APPSYNC_APIKEY',
          'APPSYNC_REGION',
          'APPSYNC_APPID',
          'IDENTITY_POOL_ID',
          'AWS_REGION',
          'USER_POOL_ID',
          'USER_POOL_WEB_CLIENT_ID',
          'AWS_DOMAIN',
        ],
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
