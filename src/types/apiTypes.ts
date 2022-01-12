export type CreateCardInput = {
  name?: string | null,
  role?: string | null,
  email?: string | null,
  phone?: string | null,
  address?: string | null,
  website?: string | null,
  facebook?: string | null,
  twitter?: string | null,
  linkedIn?: string | null,
  userId?: string | null,
  businessProfileId?: string | null,
  cardTemplateId?: string | null,
};

export type ShareCardPayload = {
  sender?: string | null,
  cardId?: string | null,
  recipient?: string | null,
};

export type BusinessProfilePayload = {
  companyName?: string | null,
  role?: string | null,
  category?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  userId?: string | null,
};

export type UpdateBusinessProfilePayload = {
  id?: string | null,
  companyName?: string | null,
  role?: string | null,
  category?: string | null,
  startDate?: string | null,
  endDate?: string | null,
};

export type CreateSubscriptionSessionPayload = {
  userId: string,
  customerPlan: string,
};

export type UpdateUserSubscriptionPayload = {
  userId: string,
  customerPlan: string,
};

export type SignupPayload = {
  phone_number: string,
  email: string,
  username: string,
  password: string,
};

export type ConfirmSignUpPayload = {
  username?: string | null,
  confirmationCode?: string | null,
};

export type CardTemplateInput = {
  backgroundColor?: string | null,
  borderBottomColor?: string | null,
};

export type RemoveReceivedCardPayload = {
  cardId?: string | null,
  userId?: string | null,
};

export type UpdateSubscriptionFeaturesInput = {
  premiumFeatures?: string | null,
  standardFeatures?: string | null,
};

export type PushNotificationInput = {
  title?: string | null,
  body?: string | null,
};

export type ListAllUsersInput = {
  limit?: number | null,
  isFirst?: boolean | null,
  lastEvaluatedKey?: NextKeyInput | null,
};

export type NextKeyInput = {
  partitionType?: string | null,
  id?: string | null,
  item?: string | null,
};

export type CreateCardMutationVariables = {
  card: CreateCardInput,
};

export type CreateCardMutation = {
  createCard:  {
    __typename: "CreateCardPayload",
    card:  {
      __typename: "Card",
      id: string,
      name: string | null,
      role: string | null,
      email: string | null,
      phone: string | null,
      address: string | null,
      website: string | null,
      facebook: string | null,
      twitter: string | null,
      linkedIn: string | null,
      createdAt: string | null,
      businessProfileId: string,
      userId: string | null,
      cardTemplateId: string | null,
      status: string | null,
      color: string | null,
      category: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type ShareCardMutationVariables = {
  shareCardPayload?: ShareCardPayload | null,
};

export type ShareCardMutation = {
  shareCard: string | null,
};

export type CreateBusinessProfileMutationVariables = {
  createBusinessProfilePayload?: BusinessProfilePayload | null,
};

export type CreateBusinessProfileMutation = {
  createBusinessProfile:  {
    __typename: "BusinessProfileResponse",
    businessProfile:  {
      __typename: "BusinessProfile",
      id: string | null,
      companyName: string | null,
      role: string | null,
      category: string | null,
      startDate: string | null,
      endDate: string | null,
      userId: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type DeleteBusinessProfileMutationVariables = {
  id?: string | null,
};

export type DeleteBusinessProfileMutation = {
  deleteBusinessProfile: string | null,
};

export type UpdateBusinessProfileMutationVariables = {
  businessProfilePayload: UpdateBusinessProfilePayload,
};

export type UpdateBusinessProfileMutation = {
  updateBusinessProfile:  {
    __typename: "BusinessProfileResponse",
    businessProfile:  {
      __typename: "BusinessProfile",
      id: string | null,
      companyName: string | null,
      role: string | null,
      category: string | null,
      startDate: string | null,
      endDate: string | null,
      userId: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type ActivateUserMutationVariables = {
  userId?: string | null,
};

export type ActivateUserMutation = {
  activateUser: string | null,
};

export type RemoveUserMutationVariables = {
  userId?: string | null,
};

export type RemoveUserMutation = {
  removeUser: string | null,
};

export type SuspendUserMutationVariables = {
  userId?: string | null,
};

export type SuspendUserMutation = {
  suspendUser: string | null,
};

export type SubscriptionSessionMutationVariables = {
  subscriptionSessionPayload?: CreateSubscriptionSessionPayload | null,
};

export type SubscriptionSessionMutation = {
  subscriptionSession:  {
    __typename: "SubscriptionSessionPayload",
    url: string | null,
    error: string | null,
  } | null,
};

export type UpdateUserSubscriptionMutationVariables = {
  updateUserSubscriptionPayload: UpdateUserSubscriptionPayload,
};

export type UpdateUserSubscriptionMutation = {
  updateUserSubscription:  {
    __typename: "UpdateUserSubscriptionResponse",
    userSubscriptionData:  {
      __typename: "SubscriptionResponse",
      id: string | null,
      subscriptionData:  {
        __typename: "SubscriptionDetails",
        customerPlan: string | null,
        subscriptionPrice: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type CancelUserSubscriptionMutationVariables = {
  userId?: string | null,
};

export type CancelUserSubscriptionMutation = {
  cancelUserSubscription:  {
    __typename: "CancelUserSubscriptionResponse",
    data: string | null,
    error: string | null,
  } | null,
};

export type UserBillingPortalMutationVariables = {
  userId?: string | null,
};

export type UserBillingPortalMutation = {
  userBillingPortal:  {
    __typename: "UserBillingPortalPayload",
    url: string | null,
    error: string | null,
  } | null,
};

export type DisableUserCardMutationVariables = {
  cardId?: string | null,
};

export type DisableUserCardMutation = {
  disableUserCard: string | null,
};

export type SignUpMutationVariables = {
  signUpPayload?: SignupPayload | null,
};

export type SignUpMutation = {
  signUp: string | null,
};

export type ConfirmSignUpMutationVariables = {
  confirmSignUpPayload?: ConfirmSignUpPayload | null,
};

export type ConfirmSignUpMutation = {
  confirmSignUp: string | null,
};

export type CreateCardTemplateMutationVariables = {
  cardTemplatePayload?: CardTemplateInput | null,
};

export type CreateCardTemplateMutation = {
  createCardTemplate:  {
    __typename: "CardTemplateResponse",
    cardTemplate:  {
      __typename: "CardTemplate",
      id: string | null,
      backgroundColor: string | null,
      borderBottomColor: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type RemoveReceivedCardMutationVariables = {
  removeReceivedCardPayload?: RemoveReceivedCardPayload | null,
};

export type RemoveReceivedCardMutation = {
  removeReceivedCard: string | null,
};

export type ActivateUserCardMutationVariables = {
  cardId?: string | null,
};

export type ActivateUserCardMutation = {
  activateUserCard: string | null,
};

export type UpdateAboutPageMutationVariables = {
  data?: string | null,
};

export type UpdateAboutPageMutation = {
  updateAboutPage:  {
    __typename: "PageData",
    id: string | null,
    data: string | null,
    updatedAt: string | null,
    error: string | null,
  } | null,
};

export type UpdatePrivacyPolicyPageMutationVariables = {
  data?: string | null,
};

export type UpdatePrivacyPolicyPageMutation = {
  updatePrivacyPolicyPage:  {
    __typename: "PageData",
    id: string | null,
    data: string | null,
    updatedAt: string | null,
    error: string | null,
  } | null,
};

export type UpdateTermsAndConditionsPageMutationVariables = {
  data?: string | null,
};

export type UpdateTermsAndConditionsPageMutation = {
  updateTermsAndConditionsPage:  {
    __typename: "PageData",
    id: string | null,
    data: string | null,
    updatedAt: string | null,
    error: string | null,
  } | null,
};

export type UpdateSubscriptionFeaturesMutationVariables = {
  updateFeatures?: UpdateSubscriptionFeaturesInput | null,
};

export type UpdateSubscriptionFeaturesMutation = {
  updateSubscriptionFeatures:  {
    __typename: "UpdateSubscriptionFeaturesPayload",
    id: string | null,
    features:  {
      __typename: "SubscriptionFeatures",
      premiumFeatures: string | null,
      standardFeatures: string | null,
    } | null,
    updatedAt: string | null,
    error: string | null,
  } | null,
};

export type SendPushNotificationMutationVariables = {
  sendNotification?: PushNotificationInput | null,
};

export type SendPushNotificationMutation = {
  sendPushNotification:  {
    __typename: "NotificationResponse",
    data: string | null,
    error: string | null,
  } | null,
};

export type UpdateEndpointMutationVariables = {
  deviceToken?: string | null,
};

export type UpdateEndpointMutation = {
  updateEndpoint:  {
    __typename: "NotificationResponse",
    data: string | null,
    error: string | null,
  } | null,
};

export type ListReceivedCardsQueryVariables = {
  userId?: string | null,
};

export type ListReceivedCardsQuery = {
  listReceivedCards:  {
    __typename: "CardsPayload",
    cards:  Array< {
      __typename: "CardResponse",
      cardDetails:  {
        __typename: "Card",
        id: string,
        name: string | null,
        role: string | null,
        email: string | null,
        phone: string | null,
        address: string | null,
        website: string | null,
        facebook: string | null,
        twitter: string | null,
        linkedIn: string | null,
        createdAt: string | null,
        businessProfileId: string,
        userId: string | null,
        cardTemplateId: string | null,
        status: string | null,
        color: string | null,
        category: string | null,
      } | null,
      cardTemplate:  {
        __typename: "CardTemplate",
        id: string | null,
        backgroundColor: string | null,
        borderBottomColor: string | null,
      } | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type ListUserCardsQueryVariables = {
  userId?: string | null,
};

export type ListUserCardsQuery = {
  listUserCards:  {
    __typename: "CardsPayload",
    cards:  Array< {
      __typename: "CardResponse",
      cardDetails:  {
        __typename: "Card",
        id: string,
        name: string | null,
        role: string | null,
        email: string | null,
        phone: string | null,
        address: string | null,
        website: string | null,
        facebook: string | null,
        twitter: string | null,
        linkedIn: string | null,
        createdAt: string | null,
        businessProfileId: string,
        userId: string | null,
        cardTemplateId: string | null,
        status: string | null,
        color: string | null,
        category: string | null,
      } | null,
      cardTemplate:  {
        __typename: "CardTemplate",
        id: string | null,
        backgroundColor: string | null,
        borderBottomColor: string | null,
      } | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type ListSharedCardsQueryVariables = {
  userId?: string | null,
};

export type ListSharedCardsQuery = {
  listSharedCards:  {
    __typename: "CardsPayload",
    cards:  Array< {
      __typename: "CardResponse",
      cardDetails:  {
        __typename: "Card",
        id: string,
        name: string | null,
        role: string | null,
        email: string | null,
        phone: string | null,
        address: string | null,
        website: string | null,
        facebook: string | null,
        twitter: string | null,
        linkedIn: string | null,
        createdAt: string | null,
        businessProfileId: string,
        userId: string | null,
        cardTemplateId: string | null,
        status: string | null,
        color: string | null,
        category: string | null,
      } | null,
      cardTemplate:  {
        __typename: "CardTemplate",
        id: string | null,
        backgroundColor: string | null,
        borderBottomColor: string | null,
      } | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type ListUsersWhoSharedACardQueryVariables = {
  cardId?: string | null,
};

export type ListUsersWhoSharedACardQuery = {
  listUsersWhoSharedACard:  {
    __typename: "UsersPayload",
    users:  Array< {
      __typename: "User",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      address: string | null,
      phoneNumber: string | null,
      avatar: string | null,
      userName: string | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type ListReceiversFromUserQueryVariables = {
  userId?: string | null,
};

export type ListReceiversFromUserQuery = {
  listReceiversFromUser:  {
    __typename: "UsersPayload",
    users:  Array< {
      __typename: "User",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      address: string | null,
      phoneNumber: string | null,
      avatar: string | null,
      userName: string | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type ListSendersToUserQueryVariables = {
  userId?: string | null,
};

export type ListSendersToUserQuery = {
  listSendersToUser:  {
    __typename: "UsersPayload",
    users:  Array< {
      __typename: "User",
      id: string,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      address: string | null,
      phoneNumber: string | null,
      avatar: string | null,
      userName: string | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type ListUserBusinessProfilesQueryVariables = {
  userId?: string | null,
};

export type ListUserBusinessProfilesQuery = {
  listUserBusinessProfiles:  {
    __typename: "BusinessProfilesPayload",
    businessProfiles:  Array< {
      __typename: "BusinessProfile",
      id: string | null,
      companyName: string | null,
      role: string | null,
      category: string | null,
      startDate: string | null,
      endDate: string | null,
      userId: string | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type GetBusinessProfileByIdQueryVariables = {
  id?: string | null,
};

export type GetBusinessProfileByIdQuery = {
  getBusinessProfileById:  {
    __typename: "BusinessProfileResponse",
    businessProfile:  {
      __typename: "BusinessProfile",
      id: string | null,
      companyName: string | null,
      role: string | null,
      category: string | null,
      startDate: string | null,
      endDate: string | null,
      userId: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type ListCardsByBusinessProfileIdQueryVariables = {
  businessProfileId?: string | null,
};

export type ListCardsByBusinessProfileIdQuery = {
  listCardsByBusinessProfileId:  {
    __typename: "CardsPayload",
    cards:  Array< {
      __typename: "CardResponse",
      cardDetails:  {
        __typename: "Card",
        id: string,
        name: string | null,
        role: string | null,
        email: string | null,
        phone: string | null,
        address: string | null,
        website: string | null,
        facebook: string | null,
        twitter: string | null,
        linkedIn: string | null,
        createdAt: string | null,
        businessProfileId: string,
        userId: string | null,
        cardTemplateId: string | null,
        status: string | null,
        color: string | null,
        category: string | null,
      } | null,
      cardTemplate:  {
        __typename: "CardTemplate",
        id: string | null,
        backgroundColor: string | null,
        borderBottomColor: string | null,
      } | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type AdminDashboardQuery = {
  adminDashboard:  {
    __typename: "AdminDashboardPayload",
    totalUsers: number | null,
    totalInactiveUsers: number | null,
    totalCardsCreated: number | null,
    totalCardsShared: number | null,
    totalEarnings: string | null,
    error: string | null,
  } | null,
};

export type ListAllUsersQueryVariables = {
  listUsers?: ListAllUsersInput | null,
};

export type ListAllUsersQuery = {
  listAllUsers:  {
    __typename: "ListUsersPayload",
    users:  Array< {
      __typename: "ListUser",
      id: string,
      positionId: number | null,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      avatar: string | null,
      userName: string | null,
      totalCards: number | null,
      subscriptionPlan: string | null,
      group: string | null,
    } | null > | null,
    total: number | null,
    lastEvaluatedKey:  {
      __typename: "NextKey",
      partitionType: string | null,
      id: string | null,
      item: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type MostSharedCardsQueryVariables = {
  userId?: string | null,
};

export type MostSharedCardsQuery = {
  mostSharedCards:  {
    __typename: "CardsPayload",
    cards:  Array< {
      __typename: "CardResponse",
      cardDetails:  {
        __typename: "Card",
        id: string,
        name: string | null,
        role: string | null,
        email: string | null,
        phone: string | null,
        address: string | null,
        website: string | null,
        facebook: string | null,
        twitter: string | null,
        linkedIn: string | null,
        createdAt: string | null,
        businessProfileId: string,
        userId: string | null,
        cardTemplateId: string | null,
        status: string | null,
        color: string | null,
        category: string | null,
      } | null,
      cardTemplate:  {
        __typename: "CardTemplate",
        id: string | null,
        backgroundColor: string | null,
        borderBottomColor: string | null,
      } | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type CountUserCardsQueryVariables = {
  userId?: string | null,
};

export type CountUserCardsQuery = {
  countUserCards: number | null,
};

export type ListSubscriptionPlansQuery = {
  listSubscriptionPlans:  {
    __typename: "SubscriptionPlansPayload",
    subscriptionPlans:  Array< {
      __typename: "SubscriptionPlanResponse",
      plan: string | null,
      currency: string | null,
      price: string | null,
      features: string | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type GetUserSubscriptionStatusQueryVariables = {
  userId?: string | null,
};

export type GetUserSubscriptionStatusQuery = {
  getUserSubscriptionStatus:  {
    __typename: "UserSubscriptionStatusPayload",
    userSubscriptionData:  {
      __typename: "SubscriptionResponse",
      id: string | null,
      subscriptionData:  {
        __typename: "SubscriptionDetails",
        customerPlan: string | null,
        subscriptionPrice: string | null,
      } | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    renewalDate: string | null,
    cardLastDigits: string | null,
    cardBrand: string | null,
    currency: string | null,
    error: string | null,
  } | null,
};

export type GetUsersBySubscriptionPlanQueryVariables = {
  plan?: string | null,
};

export type GetUsersBySubscriptionPlanQuery = {
  getUsersBySubscriptionPlan:  {
    __typename: "ListUsersPayload",
    users:  Array< {
      __typename: "ListUser",
      id: string,
      positionId: number | null,
      firstName: string | null,
      lastName: string | null,
      email: string | null,
      avatar: string | null,
      userName: string | null,
      totalCards: number | null,
      subscriptionPlan: string | null,
      group: string | null,
    } | null > | null,
    total: number | null,
    lastEvaluatedKey:  {
      __typename: "NextKey",
      partitionType: string | null,
      id: string | null,
      item: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type ListDisabledUserCardsQueryVariables = {
  userId?: string | null,
};

export type ListDisabledUserCardsQuery = {
  listDisabledUserCards:  {
    __typename: "CardsPayload",
    cards:  Array< {
      __typename: "CardResponse",
      cardDetails:  {
        __typename: "Card",
        id: string,
        name: string | null,
        role: string | null,
        email: string | null,
        phone: string | null,
        address: string | null,
        website: string | null,
        facebook: string | null,
        twitter: string | null,
        linkedIn: string | null,
        createdAt: string | null,
        businessProfileId: string,
        userId: string | null,
        cardTemplateId: string | null,
        status: string | null,
        color: string | null,
        category: string | null,
      } | null,
      cardTemplate:  {
        __typename: "CardTemplate",
        id: string | null,
        backgroundColor: string | null,
        borderBottomColor: string | null,
      } | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type ListBusinessCategoriesQuery = {
  listBusinessCategories:  {
    __typename: "ListCategoriesPayload",
    categories: Array< string | null > | null,
    error: string | null,
  } | null,
};

export type ListCardTemplatesQuery = {
  listCardTemplates:  {
    __typename: "ListCardTemplatesPayload",
    cardTemplates:  Array< {
      __typename: "CardTemplate",
      id: string | null,
      backgroundColor: string | null,
      borderBottomColor: string | null,
    } | null > | null,
    error: string | null,
  } | null,
};

export type GetCardTemplateByIdQueryVariables = {
  id?: string | null,
};

export type GetCardTemplateByIdQuery = {
  getCardTemplateById:  {
    __typename: "CardTemplateResponse",
    cardTemplate:  {
      __typename: "CardTemplate",
      id: string | null,
      backgroundColor: string | null,
      borderBottomColor: string | null,
    } | null,
    error: string | null,
  } | null,
};

export type GetAboutPageQuery = {
  getAboutPage:  {
    __typename: "PageData",
    id: string | null,
    data: string | null,
    updatedAt: string | null,
    error: string | null,
  } | null,
};

export type GetPrivacyPolicyPageQuery = {
  getPrivacyPolicyPage:  {
    __typename: "PageData",
    id: string | null,
    data: string | null,
    updatedAt: string | null,
    error: string | null,
  } | null,
};

export type GetTermsAndConditionsPageQuery = {
  getTermsAndConditionsPage:  {
    __typename: "PageData",
    id: string | null,
    data: string | null,
    updatedAt: string | null,
    error: string | null,
  } | null,
};