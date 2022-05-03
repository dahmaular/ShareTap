import {API, Auth, graphqlOperation} from 'aws-amplify';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api';

import {ExtractType} from '../types/extractApiTypes';
import {
  ConversationInput,
  CreateConversationMutation,
  CreateMessageMutation,
  ListMessagesForConversationQuery,
  ListUserConversationsQuery,
  MessageInput,
  OnCreateMessageByConversationIdSubscription,
} from '../types/apiTypes';
import {
  listMessagesForConversation,
  listUserConversations,
} from '../graphql/queries';
import {createConversation, createMessage} from '../graphql/mutations';
import {onCreateMessageByConversationId} from '../graphql/subscriptions';

export type ListUserConversationsResponse =
  ExtractType<ListUserConversationsQuery>;

export type ListUserConversationsByIdResponse =
  ExtractType<ListMessagesForConversationQuery>;

export type createMessageResponse = ExtractType<CreateMessageMutation>;

export type createConverstionResponse = ExtractType<CreateConversationMutation>;

export type ListenToUserConversationsByIdResponse =
  ExtractType<OnCreateMessageByConversationIdSubscription>;

export const listUserConversationsService = async (userId: string) => {
  try {
    const {data} = (await API.graphql({
      query: listUserConversations,
      variables: {userId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListUserConversationsResponse;
    };
    return {data: data.listUserConversations};
  } catch (error) {
    throw error;
  }
};

export const listUserConversationsByIdService = async (
  conversationId: string,
) => {
  try {
    const {data} = (await API.graphql({
      query: listMessagesForConversation,
      variables: {conversationId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListUserConversationsByIdResponse;
    };
    return {data: data.listMessagesForConversation};
  } catch (error) {
    throw error;
  }
};

export const createMessageService = async (messagePayload: MessageInput) => {
  try {
    const {data} = (await API.graphql({
      query: createMessage,
      variables: {messagePayload: messagePayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: createMessageResponse;
    };
    return {data: data.createMessage};
  } catch (error) {
    throw error;
  }
};

export const createConversationService = async (
  conversationPayload: ConversationInput,
) => {
  try {
    const {data} = (await API.graphql({
      query: createConversation,
      variables: {conversationPayload: conversationPayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: createConverstionResponse;
    };
    return {data: data.createConversation};
  } catch (error) {
    throw error;
  }
};
