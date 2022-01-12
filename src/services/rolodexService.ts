/* eslint-disable no-useless-catch */ /* eslint-disable prettier/prettier */
import {API, Auth} from 'aws-amplify';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api';

import {ExtractType} from '../types/extractApiTypes';
import {listBusinessCategories, listReceivedCards} from '../graphql/queries';
import {
  ListBusinessCategoriesQuery,
  ListReceivedCardsQuery,
} from '../types/apiTypes';

export type ListBusinessCategoriesResponse =
  ExtractType<ListBusinessCategoriesQuery>;

export type ListReceivedCardsResponse = ExtractType<ListReceivedCardsQuery>;

export const listCategoriesService = async () => {
  try {
    const {data} = (await API.graphql({
      query: listBusinessCategories,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListBusinessCategoriesResponse;
    };
    return {data: data.listBusinessCategories?.categories};
  } catch (error) {
    throw error;
  }
};

export const listReceivedCardsService = async (userId: string) => {
  try {
    const {data} = (await API.graphql({
      query: listReceivedCards,
      variables: {userId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListReceivedCardsResponse;
    };
    return {data: data.listReceivedCards?.cards};
  } catch (error) {
    throw error;
  }
};
