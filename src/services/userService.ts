/* eslint-disable no-useless-catch */ /* eslint-disable prettier/prettier */
import {API, Auth} from 'aws-amplify';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api';

import {
  listCardTemplates,
  listUserBusinessProfiles,
  listUserCards,
} from '../graphql/queries';
import {
  ListUserBusinessProfilesQuery,
  ListUserCardsQuery,
} from '../types/apiTypes';
import {ExtractType} from '../types/extractApiTypes';

export type ListUserCardsResponse = ExtractType<ListUserCardsQuery>;

export type TodoType = ExtractType<ListUserCardsResponse>;

export type ListCardTemplateResponse = ExtractType<ListUserCardsQuery>;

export type ListUserBusinessProfileResponse =
  ExtractType<ListUserBusinessProfilesQuery>;

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
    return {data: data};
  } catch (error) {
    throw error;
  }
};

export const listUserCardTemplateService = async () => {
  try {
    const {data} = (await API.graphql({
      query: listCardTemplates,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListCardTemplateResponse;
    };
    return {data: data};
  } catch (error) {
    throw error;
  }
};

export const listUserBusinessProfilesService = async (userId: string) => {
  try {
    const {data} = (await API.graphql({
      query: listUserBusinessProfiles,
      variables: {userId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListUserBusinessProfileResponse;
    };
    return {data: data.listUserBusinessProfiles};
  } catch (error) {
    throw error;
  }
};
