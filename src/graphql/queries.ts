/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listReceivedCards = /* GraphQL */ `
  query ListReceivedCards($userId: String) {
    listReceivedCards(userId: $userId) {
      error
    }
  }
`;
export const listUserCards = /* GraphQL */ `
  query ListUserCards($userId: String) {
    listUserCards(userId: $userId) {
      cards {
        cardDetails {
          id
          name
          role
          email
          phone
          address
          website
          facebook
          twitter
          linkedIn
          createdAt
          businessProfileId
          userId
          cardTemplateId
          status
          color
          category
        }
        cardTemplate {
          id
          backgroundColor
          borderBottomColor
        }
      }
      error
    }
  }
`;
export const listSharedCards = /* GraphQL */ `
  query ListSharedCards($userId: String) {
    listSharedCards(userId: $userId) {
      cards {
        cardDetails {
          id
          name
          role
          email
          phone
          address
          website
          facebook
          twitter
          linkedIn
          createdAt
          businessProfileId
          userId
          cardTemplateId
          status
          color
          category
        }
        cardTemplate {
          id
          backgroundColor
          borderBottomColor
        }
      }
      error
    }
  }
`;
export const listUsersWhoSharedACard = /* GraphQL */ `
  query ListUsersWhoSharedACard($cardId: String) {
    listUsersWhoSharedACard(cardId: $cardId) {
      users {
        id
        backgroundImage
        avatar
        firstName
        lastName
        location
        twitter
        facebook
        biography
        email
        userName
      }
      error
    }
  }
`;
export const listReceiversFromUser = /* GraphQL */ `
  query ListReceiversFromUser($userId: String) {
    listReceiversFromUser(userId: $userId) {
      users {
        id
        backgroundImage
        avatar
        firstName
        lastName
        location
        twitter
        facebook
        biography
        email
        userName
      }
      error
    }
  }
`;
export const listSendersToUser = /* GraphQL */ `
  query ListSendersToUser($userId: String) {
    listSendersToUser(userId: $userId) {
      users {
        id
        backgroundImage
        avatar
        firstName
        lastName
        location
        twitter
        facebook
        biography
        email
        userName
      }
      error
    }
  }
`;
export const listUserBusinessProfiles = /* GraphQL */ `
  query ListUserBusinessProfiles($userId: String) {
    listUserBusinessProfiles(userId: $userId) {
      businessProfiles {
        id
        companyName
        role
        category
        startDate
        endDate
        userId
      }
      error
    }
  }
`;
export const getBusinessProfileById = /* GraphQL */ `
  query GetBusinessProfileById($id: String) {
    getBusinessProfileById(id: $id) {
      businessProfile {
        id
        companyName
        role
        category
        startDate
        endDate
        userId
      }
      error
    }
  }
`;
export const listCardsByBusinessProfileId = /* GraphQL */ `
  query ListCardsByBusinessProfileId($businessProfileId: String) {
    listCardsByBusinessProfileId(businessProfileId: $businessProfileId) {
      cards {
        cardDetails {
          id
          name
          role
          email
          phone
          address
          website
          facebook
          twitter
          linkedIn
          createdAt
          businessProfileId
          userId
          cardTemplateId
          status
          color
          category
        }
        cardTemplate {
          id
          backgroundColor
          borderBottomColor
        }
      }
      error
    }
  }
`;
export const adminDashboard = /* GraphQL */ `
  query AdminDashboard {
    adminDashboard {
      totalUsers
      totalInactiveUsers
      totalCardsCreated
      totalCardsShared
      totalEarnings
      error
    }
  }
`;
export const listAllUsers = /* GraphQL */ `
  query ListAllUsers($listUsers: ListAllUsersInput) {
    listAllUsers(listUsers: $listUsers) {
      users {
        id
        positionId
        firstName
        lastName
        email
        avatar
        userName
        totalCards
        subscriptionPlan
        group
      }
      total
      lastEvaluatedKey {
        partitionType
        id
        item
      }
      error
    }
  }
`;
export const mostSharedCards = /* GraphQL */ `
  query MostSharedCards($userId: String) {
    mostSharedCards(userId: $userId) {
      cards {
        cardDetails {
          id
          name
          role
          email
          phone
          address
          website
          facebook
          twitter
          linkedIn
          createdAt
          businessProfileId
          userId
          cardTemplateId
          status
          color
          category
        }
        cardTemplate {
          id
          backgroundColor
          borderBottomColor
        }
      }
      error
    }
  }
`;
export const countUserCards = /* GraphQL */ `
  query CountUserCards($userId: String) {
    countUserCards(userId: $userId)
  }
`;
export const listSubscriptionPlans = /* GraphQL */ `
  query ListSubscriptionPlans {
    listSubscriptionPlans {
      subscriptionPlans {
        plan
        currency
        price
        features
      }
      error
    }
  }
`;
export const getUserSubscriptionStatus = /* GraphQL */ `
  query GetUserSubscriptionStatus($userId: String) {
    getUserSubscriptionStatus(userId: $userId) {
      userSubscriptionData {
        id
        subscriptionData {
          customerPlan
          subscriptionPrice
        }
        createdAt
        updatedAt
      }
      renewalDate
      cardLastDigits
      cardBrand
      currency
      error
    }
  }
`;
export const getUsersBySubscriptionPlan = /* GraphQL */ `
  query GetUsersBySubscriptionPlan($plan: String) {
    getUsersBySubscriptionPlan(plan: $plan) {
      users {
        id
        positionId
        firstName
        lastName
        email
        avatar
        userName
        totalCards
        subscriptionPlan
        group
      }
      total
      lastEvaluatedKey {
        partitionType
        id
        item
      }
      error
    }
  }
`;
export const listDisabledUserCards = /* GraphQL */ `
  query ListDisabledUserCards($userId: String) {
    listDisabledUserCards(userId: $userId) {
      cards {
        cardDetails {
          id
          name
          role
          email
          phone
          address
          website
          facebook
          twitter
          linkedIn
          createdAt
          businessProfileId
          userId
          cardTemplateId
          status
          color
          category
        }
        cardTemplate {
          id
          backgroundColor
          borderBottomColor
        }
      }
      error
    }
  }
`;
export const listBusinessCategories = /* GraphQL */ `
  query ListBusinessCategories {
    listBusinessCategories {
      categories
      error
    }
  }
`;
export const listCardTemplates = /* GraphQL */ `
  query ListCardTemplates {
    listCardTemplates {
      cardTemplates {
        id
        backgroundColor
        borderBottomColor
      }
      error
    }
  }
`;
export const getCardTemplateById = /* GraphQL */ `
  query GetCardTemplateById($id: String) {
    getCardTemplateById(id: $id) {
      cardTemplate {
        id
        backgroundColor
        borderBottomColor
      }
      error
    }
  }
`;
export const getAboutPage = /* GraphQL */ `
  query GetAboutPage {
    getAboutPage {
      id
      data
      updatedAt
      error
    }
  }
`;
export const getPrivacyPolicyPage = /* GraphQL */ `
  query GetPrivacyPolicyPage {
    getPrivacyPolicyPage {
      id
      data
      updatedAt
      error
    }
  }
`;
export const getTermsAndConditionsPage = /* GraphQL */ `
  query GetTermsAndConditionsPage {
    getTermsAndConditionsPage {
      id
      data
      updatedAt
      error
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($userId: String) {
    getUserProfile(userId: $userId) {
      userDetails {
        id
        backgroundImage
        avatar
        firstName
        lastName
        location
        twitter
        facebook
        biography
        email
        userName
      }
      userBusinessProfiles {
        id
        companyName
        role
        category
        startDate
        endDate
        userId
      }
      error
    }
  }
`;
export const getPresignedUploadUrl = /* GraphQL */ `
  query GetPresignedUploadUrl($presignedUploadInput: PresignedUploadInput) {
    getPresignedUploadUrl(presignedUploadInput: $presignedUploadInput)
  }
`;
export const listUserConversations = /* GraphQL */ `
  query ListUserConversations($userId: String) {
    listUserConversations(userId: $userId) {
      id
      recipientUserId
      recipientUsername
      recipientAvatar
      lastMessage
      createdAt
      error
    }
  }
`;
export const getConversation = /* GraphQL */ `
  query GetConversation($id: String) {
    getConversation(id: $id) {
      id
      recipients
      createdAt
      error
    }
  }
`;
export const listMessagesForConversation = /* GraphQL */ `
  query ListMessagesForConversation($conversationId: String) {
    listMessagesForConversation(conversationId: $conversationId) {
      id
      message
      sender
      conversationId
      createdAt
      error
    }
  }
`;
export const listScheduledMessages = /* GraphQL */ `
  query ListScheduledMessages($userId: String) {
    listScheduledMessages(userId: $userId) {
      scheduledMessages {
        message
        sender
        conversationId
        minute
        hour
        day
        month
        year
      }
      error
    }
  }
`;
export const listDrafts = /* GraphQL */ `
  query ListDrafts($userId: String) {
    listDrafts(userId: $userId) {
      drafts {
        id
        createdAt
        name
        role
        email
        phone
        address
        website
        facebook
        twitter
        linkedIn
        businessProfileId
        userId
        cardTemplateId
        status
        color
        category
      }
      error
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts($userId: String) {
    listContacts(userId: $userId) {
      contacts {
        id
        createdAt
        userId
        contactId
        name
        phone
      }
      error
    }
  }
`;
export const listUserReminders = /* GraphQL */ `
  query ListUserReminders($userId: String) {
    listUserReminders(userId: $userId) {
      reminders {
        userId
        message
        minute
        hour
        day
        month
        year
      }
      error
    }
  }
`;
