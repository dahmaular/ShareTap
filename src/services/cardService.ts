/* eslint-disable prettier/prettier */
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api-graphql';
import {API} from 'aws-amplify';
import {createCard} from '../graphql/mutations';
import {CreateCardInput, CreateCardMutation} from '../types/apiTypes';
import {ExtractType} from '../types/extractApiTypes';

export type CreateUserCardResponse = ExtractType<CreateCardMutation>;

export const createUserCard = async (cardPayload: CreateCardInput) => {
  try {
    const {data} = (await API.graphql({
      query: createCard,
      variables: {card: cardPayload},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: CreateUserCardResponse;
    };

    return {data: data.createCard};
  } catch (e) {
    throw e;
  }
};
