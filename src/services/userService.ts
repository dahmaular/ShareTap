import {API, Auth} from 'aws-amplify';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api';

import {listUserCards} from '../graphql/queries';
import {ListUserCardsQuery} from '../types/apiTypes';
import {ExtractType} from '../types/extractApiTypes';

export type ListUserCardsResponse = ExtractType<ListUserCardsQuery>;

export type TodoType = ExtractType<ListUserCardsResponse>;

export const getUserIdService = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    const userId = `USR-${user?.attributes.sub}`;

    return userId;
  } catch (error) {
    throw error;
  }
};

export const listUserCardsService = async (userId: string) => {
  try {
    const {data} = (await API.graphql({
      query: listUserCards,
      variables: {userId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListUserCardsResponse;
    };
    return {data: data.listUserCards.cards};
  } catch (error) {
    throw error;
  }
};
