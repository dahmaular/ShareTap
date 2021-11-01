import {Hub} from '@aws-amplify/core';

import {
  APPSYNC_APIKEY,
  GRAPHQL_ENDPOINT,
  APPSYNC_REGION,
  APPSYNC_APPID,
  IDENTITY_POOL_ID,
  AWS_REGION,
  USER_POOL_ID,
  USER_POOL_WEB_CLIENT_ID,
  AWS_DOMAIN,
} from 'react-native-dotenv';

import {LoggedInState} from '../navigations/SwitchNavigator';

export const awsConfig = {
  Auth: {
    identityPoolId: IDENTITY_POOL_ID,
    region: AWS_REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: true,
    oauth: {
      domain: AWS_DOMAIN,
      redirectSignIn: 'tapiolla://',
      redirectSignOut: 'tapiolla://',
      responseType: 'token',
    },
  },

  API: {
    aws_appsync_region: APPSYNC_REGION, // (optional) - AWS AppSync region
    aws_appsync_graphqlEndpoint: GRAPHQL_ENDPOINT, // (optional) - AWS AppSync endpoint
    aws_appsync_authenticationType: 'API_KEY', // AMAZON_COGNITO_USER_POOLS or API_KEY (optional) - Primary AWS AppSync authentication type
    aws_appsync_apiKey: APPSYNC_APIKEY, // (optional) - AWS AppSync API Key
    aws_appsync_appId: APPSYNC_APPID,
  },
};

export const hubDispatch = (
  channel: 'navigation' | 'alert',
  data:
    | {
        type: 'regular' | 'error';
        text: string;
      }
    | LoggedInState,
) => {
  Hub.dispatch(channel, {
    event: '',
    data,
  });
};
