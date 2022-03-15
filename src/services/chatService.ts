import {API, Auth, graphqlOperation} from 'aws-amplify';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api';

import {ExtractType} from '../types/extractApiTypes';
import {
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
import {createMessage} from '../graphql/mutations';
import {onCreateMessageByConversationId} from '../graphql/subscriptions';

export type ListUserConversationsResponse =
  ExtractType<ListUserConversationsQuery>;

export type ListUserConversationsByIdResponse =
  ExtractType<ListMessagesForConversationQuery>;

export type createMessageResponse = ExtractType<CreateMessageMutation>;

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

export const listenToConversationsByIdService = async (
  conversationId: string,
) => {
  try {
    const {data} = (await API.graphql({
      query: onCreateMessageByConversationId,
      variables: {conversationId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListenToUserConversationsByIdResponse;
    };
    return {data: data.onCreateMessageByConversationId};
  } catch (error) {
    throw error;
  }
};
