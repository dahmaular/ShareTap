/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCard = /* GraphQL */ `
  mutation CreateCard($card: CreateCardInput!) {
    createCard(card: $card) {
      card {
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
      error
    }
  }
`;
export const shareCard = /* GraphQL */ `
  mutation ShareCard($shareCardPayload: ShareCardPayload) {
    shareCard(shareCardPayload: $shareCardPayload)
  }
`;
export const createBusinessProfile = /* GraphQL */ `
  mutation CreateBusinessProfile(
    $createBusinessProfilePayload: BusinessProfilePayload
  ) {
    createBusinessProfile(
      createBusinessProfilePayload: $createBusinessProfilePayload
    ) {
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
export const deleteBusinessProfile = /* GraphQL */ `
  mutation DeleteBusinessProfile($id: String) {
    deleteBusinessProfile(id: $id)
  }
`;
export const updateBusinessProfile = /* GraphQL */ `
  mutation UpdateBusinessProfile(
    $businessProfilePayload: UpdateBusinessProfilePayload!
  ) {
    updateBusinessProfile(businessProfilePayload: $businessProfilePayload) {
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
export const activateUser = /* GraphQL */ `
  mutation ActivateUser($userId: String) {
    activateUser(userId: $userId)
  }
`;
export const removeUser = /* GraphQL */ `
  mutation RemoveUser($userId: String) {
    removeUser(userId: $userId)
  }
`;
export const suspendUser = /* GraphQL */ `
  mutation SuspendUser($userId: String) {
    suspendUser(userId: $userId)
  }
`;
export const subscriptionSession = /* GraphQL */ `
  mutation SubscriptionSession(
    $subscriptionSessionPayload: CreateSubscriptionSessionPayload
  ) {
    subscriptionSession(
      subscriptionSessionPayload: $subscriptionSessionPayload
    ) {
      url
      error
    }
  }
`;
export const updateUserSubscription = /* GraphQL */ `
  mutation UpdateUserSubscription(
    $updateUserSubscriptionPayload: UpdateUserSubscriptionPayload!
  ) {
    updateUserSubscription(
      updateUserSubscriptionPayload: $updateUserSubscriptionPayload
    ) {
      userSubscriptionData {
        id
        subscriptionData {
          customerPlan
          subscriptionPrice
        }
        createdAt
        updatedAt
      }
      error
    }
  }
`;
export const cancelUserSubscription = /* GraphQL */ `
  mutation CancelUserSubscription($userId: String) {
    cancelUserSubscription(userId: $userId) {
      data
      error
    }
  }
`;
export const userBillingPortal = /* GraphQL */ `
  mutation UserBillingPortal($userId: String) {
    userBillingPortal(userId: $userId) {
      url
      error
    }
  }
`;
export const disableUserCard = /* GraphQL */ `
  mutation DisableUserCard($cardId: String) {
    disableUserCard(cardId: $cardId)
  }
`;
export const signUp = /* GraphQL */ `
  mutation SignUp($signUpPayload: SignupPayload) {
    signUp(signUpPayload: $signUpPayload)
  }
`;
export const confirmSignUp = /* GraphQL */ `
  mutation ConfirmSignUp($confirmSignUpPayload: ConfirmSignUpPayload) {
    confirmSignUp(confirmSignUpPayload: $confirmSignUpPayload)
  }
`;
export const createCardTemplate = /* GraphQL */ `
  mutation CreateCardTemplate($cardTemplatePayload: CardTemplateInput) {
    createCardTemplate(cardTemplatePayload: $cardTemplatePayload) {
      cardTemplate {
        id
        backgroundColor
        borderBottomColor
      }
      error
    }
  }
`;
