/* eslint-disable no-useless-catch */ /* eslint-disable prettier/prettier */
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api-graphql';
import {API} from 'aws-amplify';
import {
  createCard,
  createCardTemplate,
  shareCard,
  updateEndpoint,
} from '../graphql/mutations';
import {listCardsByBusinessProfileId} from '../graphql/queries';
import {
  CardTemplateInput,
  CreateCardInput,
  CreateCardMutation,
  CreateCardTemplateMutation,
  ListCardsByBusinessProfileIdQuery,
  ShareCardMutation,
  ShareCardPayload,
  UpdateEndpointMutation,
} from '../types/apiTypes';
import {ExtractType} from '../types/extractApiTypes';

export type CreateUserCardResponse = ExtractType<CreateCardMutation>;
export type ListCardsByBusinessProfileIdResponse =
  ExtractType<ListCardsByBusinessProfileIdQuery>;

export type CreateCardTemplateResponse =
  ExtractType<CreateCardTemplateMutation>;

export type ShareCardResponse = ExtractType<ShareCardMutation>;

export type UpdateEndpointResponse = ExtractType<UpdateEndpointMutation>;

export const createUserCard = async (cardPayload: CreateCardInput) => {
  try {
    const {data} = (await API.graphql({
      query: createCard,
      variables: {card: cardPayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: CreateUserCardResponse;
    };
    console.log('This is response data', data);
    return {data: data.createCard};
  } catch (e) {
    throw e;
  }
};

export const updateUserDeviceToken = async (token: string) => {
  try {
    const {data} = (await API.graphql({
      query: updateEndpoint,
      variables: {deviceToken: token},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: UpdateEndpointResponse;
    };
    return {data: data.updateEndpoint};
  } catch (e) {
    throw e;
  }
};

export const shareCardService = async (sharePayload: ShareCardPayload) => {
  try {
    const {data} = (await API.graphql({
      query: shareCard,
      variables: {shareCardPayload: sharePayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ShareCardResponse;
    };
    return {data: data.shareCard};
  } catch (error) {
    throw error;
  }
};

export const createCardTemplateService = async (
  templatePayload: CardTemplateInput,
) => {
  try {
    const {data} = (await API.graphql({
      query: createCardTemplate,
      variables: {cardTemplatePayload: templatePayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: CreateCardTemplateResponse;
    };
    return {data: data.createCardTemplate};
  } catch (error) {
    throw error;
  }
};

export const listCardsByBusinessProfileIdService = async (
  businessProfileId: string,
) => {
  try {
    const {data} = (await API.graphql({
      query: listCardsByBusinessProfileId,
      variables: {businessProfileId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListCardsByBusinessProfileIdResponse;
    };
    return {data: data.listCardsByBusinessProfileId};
  } catch (error) {
    throw error;
  }
};
