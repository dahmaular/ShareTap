/* eslint-disable no-useless-catch */ /* eslint-disable prettier/prettier */
import {API, Auth} from 'aws-amplify';
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api';

import {ExtractType} from '../types/extractApiTypes';
import {
  listBusinessCategories,
  listReceivedCards,
  listScheduledMessages,
} from '../graphql/queries';
import {
  CreateScheduleMessageMutation,
  ListBusinessCategoriesQuery,
  ListReceivedCardsQuery,
  ListScheduledMessagesQuery,
  ReminderInput,
  ScheduleMessageInput,
  SetReminderMutation,
} from '../types/apiTypes';
import {createScheduleMessage, setReminder} from '../graphql/mutations';

export type ListBusinessCategoriesResponse =
  ExtractType<ListBusinessCategoriesQuery>;

export type ListReceivedCardsResponse = ExtractType<ListReceivedCardsQuery>;

export type ScheduleMessageResponse =
  ExtractType<CreateScheduleMessageMutation>;

export type SetReminderResponse = ExtractType<SetReminderMutation>;

export type ListScheduledMessagesResponse =
  ExtractType<ListScheduledMessagesQuery>;

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
    return {data: data.listReceivedCards};
  } catch (error) {
    throw error;
  }
};

export const scheduleMessageService = async (
  scheduleMessagePayload: ScheduleMessageInput,
) => {
  try {
    const {data} = (await API.graphql({
      query: createScheduleMessage,
      variables: {scheduleMessagePayload: scheduleMessagePayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ScheduleMessageResponse;
    };
    return {data: data.createScheduleMessage};
  } catch (error) {
    throw error;
  }
};

export const setReminderService = async (reminderPayload: ReminderInput) => {
  try {
    const {data} = (await API.graphql({
      query: setReminder,
      variables: {reminderPayload: reminderPayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: SetReminderResponse;
    };
    return {data: data.setReminder};
  } catch (error) {
    throw error;
  }
};

export const ListScheduledMessagesService = async (userId: string) => {
  try {
    const {data} = (await API.graphql({
      query: listScheduledMessages,
      variables: {userId},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: ListScheduledMessagesResponse;
    };
    return {data: data.listScheduledMessages};
  } catch (error) {
    throw error;
  }
};
