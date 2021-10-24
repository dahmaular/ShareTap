/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listReceivedCards = /* GraphQL */ `
  query ListReceivedCards($userId: String) {
    listReceivedCards(userId: $userId) {
      cards {
        cardDetails {
          id
          email
          createdAt
          businessProfileId
          userId
          profession
          status
          color
          category
        }
        businessProfile {
          id
          name
          role
          phone
          website
          category
          address
          userId
        }
      }
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
          email
          createdAt
          businessProfileId
          userId
          profession
          status
          color
          category
        }
        businessProfile {
          id
          name
          role
          phone
          website
          category
          address
          userId
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
          email
          createdAt
          businessProfileId
          userId
          profession
          status
          color
          category
        }
        businessProfile {
          id
          name
          role
          phone
          website
          category
          address
          userId
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
        firstName
        lastName
        email
        address
        phoneNumber
        avatar
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
        firstName
        lastName
        email
        address
        phoneNumber
        avatar
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
        firstName
        lastName
        email
        address
        phoneNumber
        avatar
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
        name
        role
        phone
        website
        category
        address
        socialLinks {
          facebook
          twitter
          linkedIn
        }
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
        name
        role
        phone
        website
        category
        address
        socialLinks {
          facebook
          twitter
          linkedIn
        }
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
          email
          createdAt
          businessProfileId
          userId
          profession
          status
          color
          category
        }
        businessProfile {
          id
          name
          role
          phone
          website
          category
          address
          userId
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
  query ListAllUsers {
    listAllUsers {
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
      error
    }
  }
`;
export const viewUserCardsForAdmin = /* GraphQL */ `
  query ViewUserCardsForAdmin($userId: String) {
    viewUserCardsForAdmin(userId: $userId) {
      cards {
        cardDetails {
          id
          email
          createdAt
          businessProfileId
          userId
          profession
          status
          color
          category
        }
        businessProfile {
          id
          name
          role
          phone
          website
          category
          address
          userId
        }
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
          email
          createdAt
          businessProfileId
          userId
          profession
          status
          color
          category
        }
        businessProfile {
          id
          name
          role
          phone
          website
          category
          address
          userId
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
        description
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
          email
          createdAt
          businessProfileId
          userId
          profession
          status
          color
          category
        }
        businessProfile {
          id
          name
          role
          phone
          website
          category
          address
          userId
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
