/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation {
    onCreateConversation {
      id
      recipients
      createdAt
      error
    }
  }
`;
export const onCreateMessageByConversationId = /* GraphQL */ `
  subscription OnCreateMessageByConversationId($conversationId: String) {
    onCreateMessageByConversationId(conversationId: $conversationId) {
      id
      message
      sender
      conversationId
      createdAt
      error
    }
  }
`;
