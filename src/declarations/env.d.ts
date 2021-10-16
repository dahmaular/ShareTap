declare module 'react-native-dotenv' {
  export const GRAPHQL_ENDPOINT: string;
  export const APPSYNC_APIKEY: string;
  export const APPSYNC_REGION: string;
  export const APPSYNC_APPID: string;
  export const IDENTITY_POOL_ID: string;
  export const AWS_REGION: string;
  export const USER_POOL_ID: string;
  export const USER_POOL_WEB_CLIENT_ID: string;
  export const AWS_DOMAIN: string;
  export const ENV: 'dev' | 'prod';
}
