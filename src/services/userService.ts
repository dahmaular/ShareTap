import {API, Auth, withSSRContext} from 'aws-amplify';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api';

export const getUserIdService = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    const userId = `USR-${user?.attributes.sub}`;

    return {userId};
  } catch (error) {
    throw error;
  }
};
