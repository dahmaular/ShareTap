/* eslint-disable no-useless-catch */ /* eslint-disable prettier/prettier */
import {API, Auth} from 'aws-amplify';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api';

import {
  getPresignedUploadUrl,
  getUserProfile,
  listCardTemplates,
  listDrafts,
  listUserBusinessProfiles,
  listUserCards,
} from '../graphql/queries';
import {
  BusinessProfilePayload,
  CreateBusinessProfileMutation,
  CreateDraftInput,
  CreateDraftMutation,
  GetPresignedUploadUrlQuery,
  GetUserProfileQuery,
  ListDraftsQuery,
  ListUserBusinessProfilesQuery,
  ListUserCardsQuery,
  PresignedUploadInput,
  UpdateUserProfileInput,
  UpdateUserProfileMutation,
  UpdateUserProfilePayload,
} from '../types/apiTypes';
import {ExtractType} from '../types/extractApiTypes';
import {
  createBusinessProfile,
  createDraft,
  updateUserProfile,
} from '../graphql/mutations';

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

export type ListDraftResponse = ExtractType<ListDraftsQuery>;

export type CreateDraftResponse = ExtractType<CreateDraftMutation>;

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
    console.log(data.listUserCards?.cards);
    return {data: data};
  } catch (error) {
    throw error;
  }
};

export const listDraftService = async (userId: string) => {
  try {
    const {data} = (await API.graphql({
      query: listDrafts,
      variables: {userId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListDraftResponse;
    };
    return {data: data.listDrafts?.drafts};
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
    // console.log('This is response data', data);
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
    // console.log('This is response data', data);
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
    // console.log('This is the presigned response data', data);
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
    console.log('This is response data', data);
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
    // console.log('This is response data', data);
    return {data: data};
  } catch (e) {
    throw e;
  }
};

export const createDraftService = async (draft: CreateDraftInput) => {
  try {
    const {data} = (await API.graphql({
      query: createDraft,
      variables: {draft},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: CreateDraftResponse;
    };
    return {data: data};
  } catch (error) {
    throw error;
  }
};
