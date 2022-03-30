/* eslint-disable no-useless-catch */ /* eslint-disable prettier/prettier */
import {API, Auth} from 'aws-amplify';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api';

import {
  getPresignedUploadUrl,
  getUserProfile,
  listCardTemplates,
  listUserBusinessProfiles,
  listUserCards,
} from '../graphql/queries';
import {
  BusinessProfilePayload,
  CreateBusinessProfileMutation,
  GetPresignedUploadUrlQuery,
  GetUserProfileQuery,
  ListUserBusinessProfilesQuery,
  ListUserCardsQuery,
  PresignedUploadInput,
  UpdateUserProfileInput,
  UpdateUserProfileMutation,
  UpdateUserProfilePayload,
} from '../types/apiTypes';
import {ExtractType} from '../types/extractApiTypes';
import {createBusinessProfile, updateUserProfile} from '../graphql/mutations';

export type ListUserCardsResponse = ExtractType<ListUserCardsQuery>;

export type TodoType = ExtractType<ListUserCardsResponse>;

export type ListCardTemplateResponse = ExtractType<ListUserCardsQuery>;

export type ListUserBusinessProfileResponse =
  ExtractType<ListUserBusinessProfilesQuery>;

export type GetUserProfileResponse = ExtractType<GetUserProfileQuery>;

export type CreateBusinessProfileResponse =
  ExtractType<CreateBusinessProfileMutation>;

export type UpdateUserProfileResponse = ExtractType<UpdateUserProfileMutation>;

export type GetPresignedUrlResponse = ExtractType<GetPresignedUploadUrlQuery>;

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

export const getUserProfileService = async (userId: string) => {
  try {
    const {data} = (await API.graphql({
      query: getUserProfile,
      variables: {userId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: GetUserProfileResponse;
    };
    return {data: data};
  } catch (error) {
    throw error;
  }
};

export const getPresignedUrlUploadService = async (
  presignedUploadInput: PresignedUploadInput,
) => {
  try {
    const {data} = (await API.graphql({
      query: getPresignedUploadUrl,
      variables: {presignedUploadInput},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: GetPresignedUrlResponse;
    };
    return {data: data};
  } catch (error) {
    throw error;
  }
};

export const createUserBusinessProfile = async (
  cardPayload: BusinessProfilePayload,
) => {
  try {
    const {data} = (await API.graphql({
      query: createBusinessProfile,
      variables: {createBusinessProfilePayload: cardPayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: CreateBusinessProfileResponse;
    };
    return {data: data};
  } catch (e) {
    throw e;
  }
};

export const updateUserProfileService = async (
  userProfilePayload: UpdateUserProfileInput,
) => {
  try {
    const {data} = (await API.graphql({
      query: updateUserProfile,
      variables: {updateUserProfilePayload: userProfilePayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: UpdateUserProfileResponse;
    };
    return {data: data};
  } catch (e) {
    throw e;
  }
};
