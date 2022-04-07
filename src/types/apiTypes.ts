/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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

export type CreateCardPayload = {
  __typename: "CreateCardPayload",
  card?: Card | null,
  error?: string | null,
};

export type Card = {
  __typename: "Card",
  id: string,
  name?: string | null,
  role?: string | null,
  email?: string | null,
  phone?: string | null,
  address?: string | null,
  website?: string | null,
  facebook?: string | null,
  twitter?: string | null,
  linkedIn?: string | null,
  createdAt?: string | null,
  businessProfileId: string,
  userId?: string | null,
  cardTemplateId?: string | null,
  status?: string | null,
  color?: string | null,
  category?: string | null,
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

export type BusinessProfileResponse = {
  __typename: "BusinessProfileResponse",
  businessProfile?: BusinessProfile | null,
  error?: string | null,
};

export type BusinessProfile = {
  __typename: "BusinessProfile",
  id?: string | null,
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

export type SubscriptionSessionPayload = {
  __typename: "SubscriptionSessionPayload",
  url?: string | null,
  error?: string | null,
};

export type UpdateUserSubscriptionPayload = {
  userId: string,
  customerPlan: string,
};

export type UpdateUserSubscriptionResponse = {
  __typename: "UpdateUserSubscriptionResponse",
  userSubscriptionData?: SubscriptionResponse | null,
  error?: string | null,
};

export type SubscriptionResponse = {
  __typename: "SubscriptionResponse",
  id?: string | null,
  subscriptionData?: SubscriptionDetails | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type SubscriptionDetails = {
  __typename: "SubscriptionDetails",
  customerPlan?: string | null,
  subscriptionPrice?: string | null,
};

export type CancelUserSubscriptionResponse = {
  __typename: "CancelUserSubscriptionResponse",
  data?: string | null,
  error?: string | null,
};

export type UserBillingPortalPayload = {
  __typename: "UserBillingPortalPayload",
  url?: string | null,
  error?: string | null,
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

export type CardTemplateResponse = {
  __typename: "CardTemplateResponse",
  cardTemplate?: CardTemplate | null,
  error?: string | null,
};

export type CardTemplate = {
  __typename: "CardTemplate",
  id?: string | null,
  backgroundColor?: string | null,
  borderBottomColor?: string | null,
};

export type RemoveReceivedCardPayload = {
  cardId?: string | null,
  userId?: string | null,
};

export type PageData = {
  __typename: "PageData",
  id?: string | null,
  data?: string | null,
  updatedAt?: string | null,
  error?: string | null,
};

export type UpdateSubscriptionFeaturesInput = {
  premiumFeatures?: string | null,
  standardFeatures?: string | null,
};

export type UpdateSubscriptionFeaturesPayload = {
  __typename: "UpdateSubscriptionFeaturesPayload",
  id?: string | null,
  features?: SubscriptionFeatures | null,
  updatedAt?: string | null,
  error?: string | null,
};

export type SubscriptionFeatures = {
  __typename: "SubscriptionFeatures",
  premiumFeatures?: string | null,
  standardFeatures?: string | null,
};

export type PushNotificationInput = {
  title?: string | null,
  body?: string | null,
};

export type NotificationResponse = {
  __typename: "NotificationResponse",
  data?: string | null,
  error?: string | null,
};

export type UpdateUserProfileInput = {
  id?: string | null,
  backgroundImage?: string | null,
  avatar?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  location?: string | null,
  twitter?: string | null,
  facebook?: string | null,
  biography?: string | null,
};

export type UpdateUserProfilePayload = {
  __typename: "UpdateUserProfilePayload",
  userProfile?: User | null,
  error?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  backgroundImage?: string | null,
  avatar?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  location?: string | null,
  twitter?: string | null,
  facebook?: string | null,
  biography?: string | null,
  email?: string | null,
  userName?: string | null,
};

export type ConversationInput = {
  recipients?: Array< string | null > | null,
};

export type Conversation = {
  __typename: "Conversation",
  id?: string | null,
  recipients?: Array< string | null > | null,
  createdAt?: string | null,
  error?: string | null,
};

export type MessageInput = {
  message?: string | null,
  sender?: string | null,
  conversationId?: string | null,
};

export type Message = {
  __typename: "Message",
  id?: string | null,
  message?: string | null,
  sender?: string | null,
  conversationId?: string | null,
  createdAt?: string | null,
  error?: string | null,
};

export type ScheduleMessageInput = {
  message?: string | null,
  sender?: string | null,
  conversationId?: string | null,
  minute?: string | null,
  hour?: string | null,
  day?: string | null,
  month?: string | null,
  year?: string | null,
};

export type ScheduleMessagePayload = {
  __typename: "ScheduleMessagePayload",
  data?: string | null,
  error?: string | null,
};

export type CreateDraftInput = {
  name?: string | null,
  role?: string | null,
  email?: string | null,
  phone?: string | null,
  address?: string | null,
  website?: string | null,
  facebook?: string | null,
  twitter?: string | null,
  linkedIn?: string | null,
  businessProfileId?: string | null,
  userId?: string | null,
  cardTemplateId?: string | null,
  status?: string | null,
  color?: string | null,
  category?: string | null,
};

export type DraftPayload = {
  __typename: "DraftPayload",
  draft?: Draft | null,
  error?: string | null,
};

export type Draft = {
  __typename: "Draft",
  id?: string | null,
  createdAt?: string | null,
  name?: string | null,
  role?: string | null,
  email?: string | null,
  phone?: string | null,
  address?: string | null,
  website?: string | null,
  facebook?: string | null,
  twitter?: string | null,
  linkedIn?: string | null,
  businessProfileId: string,
  userId?: string | null,
  cardTemplateId?: string | null,
  status?: string | null,
  color?: string | null,
  category?: string | null,
};

export type ReminderInput = {
  userId?: string | null,
  message?: string | null,
  minute?: string | null,
  hour?: string | null,
  day?: string | null,
  month?: string | null,
  year?: string | null,
};

export type ReminderPayload = {
  __typename: "ReminderPayload",
  data?: string | null,
  error?: string | null,
};

export type ReceivedCardsPayload = {
  __typename: "ReceivedCardsPayload",
  receivedCards?:  Array<ReceivedCardsData | null > | null,
  error?: string | null,
};

export type ReceivedCardsData = {
  __typename: "ReceivedCardsData",
  id?: number | null,
  category?: string | null,
  data?: ReceivedCardsResponse | null,
};

export type ReceivedCardsResponse = {
  __typename: "ReceivedCardsResponse",
  cards?:  Array<CardResponse | null > | null,
};

export type CardResponse = {
  __typename: "CardResponse",
  cardDetails?: Card | null,
  cardTemplate?: CardTemplate | null,
};

export type CardsPayload = {
  __typename: "CardsPayload",
  cards?:  Array<CardResponse | null > | null,
  error?: string | null,
};

export type UsersPayload = {
  __typename: "UsersPayload",
  users?:  Array<User | null > | null,
  error?: string | null,
};

export type BusinessProfilesPayload = {
  __typename: "BusinessProfilesPayload",
  businessProfiles?:  Array<BusinessProfile | null > | null,
  error?: string | null,
};

export type AdminDashboardPayload = {
  __typename: "AdminDashboardPayload",
  totalUsers?: number | null,
  totalInactiveUsers?: number | null,
  totalCardsCreated?: number | null,
  totalCardsShared?: number | null,
  totalEarnings?: string | null,
  error?: string | null,
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

export type ListUsersPayload = {
  __typename: "ListUsersPayload",
  users?:  Array<ListUser | null > | null,
  total?: number | null,
  lastEvaluatedKey?: NextKey | null,
  error?: string | null,
};

export type ListUser = {
  __typename: "ListUser",
  id: string,
  positionId?: number | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  avatar?: string | null,
  userName?: string | null,
  totalCards?: number | null,
  subscriptionPlan?: string | null,
  group?: string | null,
};

export type NextKey = {
  __typename: "NextKey",
  partitionType?: string | null,
  id?: string | null,
  item?: string | null,
};

export type SubscriptionPlansPayload = {
  __typename: "SubscriptionPlansPayload",
  subscriptionPlans?:  Array<SubscriptionPlanResponse | null > | null,
  error?: string | null,
};

export type SubscriptionPlanResponse = {
  __typename: "SubscriptionPlanResponse",
  plan?: string | null,
  currency?: string | null,
  price?: string | null,
  features?: string | null,
};

export type UserSubscriptionStatusPayload = {
  __typename: "UserSubscriptionStatusPayload",
  userSubscriptionData?: SubscriptionResponse | null,
  renewalDate?: string | null,
  cardLastDigits?: string | null,
  cardBrand?: string | null,
  currency?: string | null,
  error?: string | null,
};

export type ListCategoriesPayload = {
  __typename: "ListCategoriesPayload",
  categories?: Array< string | null > | null,
  error?: string | null,
};

export type ListCardTemplatesPayload = {
  __typename: "ListCardTemplatesPayload",
  cardTemplates?:  Array<CardTemplate | null > | null,
  error?: string | null,
};

export type UserProfilePayload = {
  __typename: "UserProfilePayload",
  userDetails?: User | null,
  userBusinessProfiles?:  Array<BusinessProfile | null > | null,
  error?: string | null,
};

export type PresignedUploadInput = {
  key?: string | null,
  type?: string | null,
};

export type UserConversation = {
  __typename: "UserConversation",
  id?: string | null,
  recipientUserId?: string | null,
  recipientUsername?: string | null,
  recipientAvatar?: string | null,
  lastMessage?: string | null,
  createdAt?: string | null,
  error?: string | null,
};

export type ListScheduledMessagesPayload = {
  __typename: "ListScheduledMessagesPayload",
  scheduledMessages?:  Array<ScheduleMessage | null > | null,
  error?: string | null,
};

export type ScheduleMessage = {
  __typename: "ScheduleMessage",
  message?: string | null,
  sender?: string | null,
  conversationId?: string | null,
  minute?: string | null,
  hour?: string | null,
  day?: string | null,
  month?: string | null,
  year?: string | null,
};

export type ListDraftsPayload = {
  __typename: "ListDraftsPayload",
  drafts?:  Array<Draft | null > | null,
  error?: string | null,
};

export type ListContactsInput = {
  name?: string | null,
  phoneNumber?: string | null,
};

export type ListContactsPayload = {
  __typename: "ListContactsPayload",
  tapiollaContacts?:  Array<TapiollaContact | null > | null,
  phoneContacts?:  Array<PhoneContact | null > | null,
  error?: string | null,
};

export type TapiollaContact = {
  __typename: "TapiollaContact",
  name?: string | null,
  phoneNumber?: string | null,
  id?: string | null,
};

export type PhoneContact = {
  __typename: "PhoneContact",
  name?: string | null,
  phoneNumber?: string | null,
};

export type ListRemindersPayload = {
  __typename: "ListRemindersPayload",
  reminders?:  Array<Reminder | null > | null,
  error?: string | null,
};

export type Reminder = {
  __typename: "Reminder",
  userId?: string | null,
  message?: string | null,
  minute?: string | null,
  hour?: string | null,
  day?: string | null,
  month?: string | null,
  year?: string | null,
};

export type CreateCardMutationVariables = {
  card: CreateCardInput,
};

export type CreateCardMutation = {
  createCard?:  {
    __typename: "CreateCardPayload",
    card?:  {
      __typename: "Card",
      id: string,
      name?: string | null,
      role?: string | null,
      email?: string | null,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      facebook?: string | null,
      twitter?: string | null,
      linkedIn?: string | null,
      createdAt?: string | null,
      businessProfileId: string,
      userId?: string | null,
      cardTemplateId?: string | null,
      status?: string | null,
      color?: string | null,
      category?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type ShareCardMutationVariables = {
  shareCardPayload?: ShareCardPayload | null,
};

export type ShareCardMutation = {
  shareCard?: string | null,
};

export type CreateBusinessProfileMutationVariables = {
  createBusinessProfilePayload?: BusinessProfilePayload | null,
};

export type CreateBusinessProfileMutation = {
  createBusinessProfile?:  {
    __typename: "BusinessProfileResponse",
    businessProfile?:  {
      __typename: "BusinessProfile",
      id?: string | null,
      companyName?: string | null,
      role?: string | null,
      category?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      userId?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type DeleteBusinessProfileMutationVariables = {
  id?: string | null,
};

export type DeleteBusinessProfileMutation = {
  deleteBusinessProfile?: string | null,
};

export type UpdateBusinessProfileMutationVariables = {
  businessProfilePayload: UpdateBusinessProfilePayload,
};

export type UpdateBusinessProfileMutation = {
  updateBusinessProfile?:  {
    __typename: "BusinessProfileResponse",
    businessProfile?:  {
      __typename: "BusinessProfile",
      id?: string | null,
      companyName?: string | null,
      role?: string | null,
      category?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      userId?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type ActivateUserMutationVariables = {
  userId?: string | null,
};

export type ActivateUserMutation = {
  activateUser?: string | null,
};

export type RemoveUserMutationVariables = {
  userId?: string | null,
};

export type RemoveUserMutation = {
  removeUser?: string | null,
};

export type SuspendUserMutationVariables = {
  userId?: string | null,
};

export type SuspendUserMutation = {
  suspendUser?: string | null,
};

export type SubscriptionSessionMutationVariables = {
  subscriptionSessionPayload?: CreateSubscriptionSessionPayload | null,
};

export type SubscriptionSessionMutation = {
  subscriptionSession?:  {
    __typename: "SubscriptionSessionPayload",
    url?: string | null,
    error?: string | null,
  } | null,
};

export type UpdateUserSubscriptionMutationVariables = {
  updateUserSubscriptionPayload: UpdateUserSubscriptionPayload,
};

export type UpdateUserSubscriptionMutation = {
  updateUserSubscription?:  {
    __typename: "UpdateUserSubscriptionResponse",
    userSubscriptionData?:  {
      __typename: "SubscriptionResponse",
      id?: string | null,
      subscriptionData?:  {
        __typename: "SubscriptionDetails",
        customerPlan?: string | null,
        subscriptionPrice?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type CancelUserSubscriptionMutationVariables = {
  userId?: string | null,
};

export type CancelUserSubscriptionMutation = {
  cancelUserSubscription?:  {
    __typename: "CancelUserSubscriptionResponse",
    data?: string | null,
    error?: string | null,
  } | null,
};

export type UserBillingPortalMutationVariables = {
  userId?: string | null,
};

export type UserBillingPortalMutation = {
  userBillingPortal?:  {
    __typename: "UserBillingPortalPayload",
    url?: string | null,
    error?: string | null,
  } | null,
};

export type DisableUserCardMutationVariables = {
  cardId?: string | null,
};

export type DisableUserCardMutation = {
  disableUserCard?: string | null,
};

export type SignUpMutationVariables = {
  signUpPayload?: SignupPayload | null,
};

export type SignUpMutation = {
  signUp?: string | null,
};

export type ConfirmSignUpMutationVariables = {
  confirmSignUpPayload?: ConfirmSignUpPayload | null,
};

export type ConfirmSignUpMutation = {
  confirmSignUp?: string | null,
};

export type CreateCardTemplateMutationVariables = {
  cardTemplatePayload?: CardTemplateInput | null,
};

export type CreateCardTemplateMutation = {
  createCardTemplate?:  {
    __typename: "CardTemplateResponse",
    cardTemplate?:  {
      __typename: "CardTemplate",
      id?: string | null,
      backgroundColor?: string | null,
      borderBottomColor?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type RemoveReceivedCardMutationVariables = {
  removeReceivedCardPayload?: RemoveReceivedCardPayload | null,
};

export type RemoveReceivedCardMutation = {
  removeReceivedCard?: string | null,
};

export type ActivateUserCardMutationVariables = {
  cardId?: string | null,
};

export type ActivateUserCardMutation = {
  activateUserCard?: string | null,
};

export type UpdateAboutPageMutationVariables = {
  data?: string | null,
};

export type UpdateAboutPageMutation = {
  updateAboutPage?:  {
    __typename: "PageData",
    id?: string | null,
    data?: string | null,
    updatedAt?: string | null,
    error?: string | null,
  } | null,
};

export type UpdatePrivacyPolicyPageMutationVariables = {
  data?: string | null,
};

export type UpdatePrivacyPolicyPageMutation = {
  updatePrivacyPolicyPage?:  {
    __typename: "PageData",
    id?: string | null,
    data?: string | null,
    updatedAt?: string | null,
    error?: string | null,
  } | null,
};

export type UpdateTermsAndConditionsPageMutationVariables = {
  data?: string | null,
};

export type UpdateTermsAndConditionsPageMutation = {
  updateTermsAndConditionsPage?:  {
    __typename: "PageData",
    id?: string | null,
    data?: string | null,
    updatedAt?: string | null,
    error?: string | null,
  } | null,
};

export type UpdateSubscriptionFeaturesMutationVariables = {
  updateFeatures?: UpdateSubscriptionFeaturesInput | null,
};

export type UpdateSubscriptionFeaturesMutation = {
  updateSubscriptionFeatures?:  {
    __typename: "UpdateSubscriptionFeaturesPayload",
    id?: string | null,
    features?:  {
      __typename: "SubscriptionFeatures",
      premiumFeatures?: string | null,
      standardFeatures?: string | null,
    } | null,
    updatedAt?: string | null,
    error?: string | null,
  } | null,
};

export type SendPushNotificationMutationVariables = {
  sendNotification?: PushNotificationInput | null,
};

export type SendPushNotificationMutation = {
  sendPushNotification?:  {
    __typename: "NotificationResponse",
    data?: string | null,
    error?: string | null,
  } | null,
};

export type UpdateEndpointMutationVariables = {
  deviceToken?: string | null,
};

export type UpdateEndpointMutation = {
  updateEndpoint?:  {
    __typename: "NotificationResponse",
    data?: string | null,
    error?: string | null,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  updateUserProfilePayload?: UpdateUserProfileInput | null,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UpdateUserProfilePayload",
    userProfile?:  {
      __typename: "User",
      id: string,
      backgroundImage?: string | null,
      avatar?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      location?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      biography?: string | null,
      email?: string | null,
      userName?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type CreateConversationMutationVariables = {
  conversationPayload?: ConversationInput | null,
};

export type CreateConversationMutation = {
  createConversation?:  {
    __typename: "Conversation",
    id?: string | null,
    recipients?: Array< string | null > | null,
    createdAt?: string | null,
    error?: string | null,
  } | null,
};

export type CreateMessageMutationVariables = {
  messagePayload?: MessageInput | null,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id?: string | null,
    message?: string | null,
    sender?: string | null,
    conversationId?: string | null,
    createdAt?: string | null,
    error?: string | null,
  } | null,
};

export type CreateScheduleMessageMutationVariables = {
  scheduleMessagePayload?: ScheduleMessageInput | null,
};

export type CreateScheduleMessageMutation = {
  createScheduleMessage?:  {
    __typename: "ScheduleMessagePayload",
    data?: string | null,
    error?: string | null,
  } | null,
};

export type CreateDraftMutationVariables = {
  draft?: CreateDraftInput | null,
};

export type CreateDraftMutation = {
  createDraft?:  {
    __typename: "DraftPayload",
    draft?:  {
      __typename: "Draft",
      id?: string | null,
      createdAt?: string | null,
      name?: string | null,
      role?: string | null,
      email?: string | null,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      facebook?: string | null,
      twitter?: string | null,
      linkedIn?: string | null,
      businessProfileId: string,
      userId?: string | null,
      cardTemplateId?: string | null,
      status?: string | null,
      color?: string | null,
      category?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type SetReminderMutationVariables = {
  reminderPayload?: ReminderInput | null,
};

export type SetReminderMutation = {
  setReminder?:  {
    __typename: "ReminderPayload",
    data?: string | null,
    error?: string | null,
  } | null,
};

export type ListReceivedCardsQueryVariables = {
  userId?: string | null,
};

export type ListReceivedCardsQuery = {
  listReceivedCards?:  {
    __typename: "ReceivedCardsPayload",
    receivedCards?:  Array< {
      __typename: "ReceivedCardsData",
      id?: number | null,
      category?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListUserCardsQueryVariables = {
  userId?: string | null,
};

export type ListUserCardsQuery = {
  listUserCards?:  {
    __typename: "CardsPayload",
    cards?:  Array< {
      __typename: "CardResponse",
      cardDetails?:  {
        __typename: "Card",
        id: string,
        name?: string | null,
        role?: string | null,
        email?: string | null,
        phone?: string | null,
        address?: string | null,
        website?: string | null,
        facebook?: string | null,
        twitter?: string | null,
        linkedIn?: string | null,
        createdAt?: string | null,
        businessProfileId: string,
        userId?: string | null,
        cardTemplateId?: string | null,
        status?: string | null,
        color?: string | null,
        category?: string | null,
      } | null,
      cardTemplate?:  {
        __typename: "CardTemplate",
        id?: string | null,
        backgroundColor?: string | null,
        borderBottomColor?: string | null,
      } | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListSharedCardsQueryVariables = {
  userId?: string | null,
};

export type ListSharedCardsQuery = {
  listSharedCards?:  {
    __typename: "CardsPayload",
    cards?:  Array< {
      __typename: "CardResponse",
      cardDetails?:  {
        __typename: "Card",
        id: string,
        name?: string | null,
        role?: string | null,
        email?: string | null,
        phone?: string | null,
        address?: string | null,
        website?: string | null,
        facebook?: string | null,
        twitter?: string | null,
        linkedIn?: string | null,
        createdAt?: string | null,
        businessProfileId: string,
        userId?: string | null,
        cardTemplateId?: string | null,
        status?: string | null,
        color?: string | null,
        category?: string | null,
      } | null,
      cardTemplate?:  {
        __typename: "CardTemplate",
        id?: string | null,
        backgroundColor?: string | null,
        borderBottomColor?: string | null,
      } | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListUsersWhoSharedACardQueryVariables = {
  cardId?: string | null,
};

export type ListUsersWhoSharedACardQuery = {
  listUsersWhoSharedACard?:  {
    __typename: "UsersPayload",
    users?:  Array< {
      __typename: "User",
      id: string,
      backgroundImage?: string | null,
      avatar?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      location?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      biography?: string | null,
      email?: string | null,
      userName?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListReceiversFromUserQueryVariables = {
  userId?: string | null,
};

export type ListReceiversFromUserQuery = {
  listReceiversFromUser?:  {
    __typename: "UsersPayload",
    users?:  Array< {
      __typename: "User",
      id: string,
      backgroundImage?: string | null,
      avatar?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      location?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      biography?: string | null,
      email?: string | null,
      userName?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListSendersToUserQueryVariables = {
  userId?: string | null,
};

export type ListSendersToUserQuery = {
  listSendersToUser?:  {
    __typename: "UsersPayload",
    users?:  Array< {
      __typename: "User",
      id: string,
      backgroundImage?: string | null,
      avatar?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      location?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      biography?: string | null,
      email?: string | null,
      userName?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListUserBusinessProfilesQueryVariables = {
  userId?: string | null,
};

export type ListUserBusinessProfilesQuery = {
  listUserBusinessProfiles?:  {
    __typename: "BusinessProfilesPayload",
    businessProfiles?:  Array< {
      __typename: "BusinessProfile",
      id?: string | null,
      companyName?: string | null,
      role?: string | null,
      category?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      userId?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type GetBusinessProfileByIdQueryVariables = {
  id?: string | null,
};

export type GetBusinessProfileByIdQuery = {
  getBusinessProfileById?:  {
    __typename: "BusinessProfileResponse",
    businessProfile?:  {
      __typename: "BusinessProfile",
      id?: string | null,
      companyName?: string | null,
      role?: string | null,
      category?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      userId?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type ListCardsByBusinessProfileIdQueryVariables = {
  businessProfileId?: string | null,
};

export type ListCardsByBusinessProfileIdQuery = {
  listCardsByBusinessProfileId?:  {
    __typename: "CardsPayload",
    cards?:  Array< {
      __typename: "CardResponse",
      cardDetails?:  {
        __typename: "Card",
        id: string,
        name?: string | null,
        role?: string | null,
        email?: string | null,
        phone?: string | null,
        address?: string | null,
        website?: string | null,
        facebook?: string | null,
        twitter?: string | null,
        linkedIn?: string | null,
        createdAt?: string | null,
        businessProfileId: string,
        userId?: string | null,
        cardTemplateId?: string | null,
        status?: string | null,
        color?: string | null,
        category?: string | null,
      } | null,
      cardTemplate?:  {
        __typename: "CardTemplate",
        id?: string | null,
        backgroundColor?: string | null,
        borderBottomColor?: string | null,
      } | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type AdminDashboardQuery = {
  adminDashboard?:  {
    __typename: "AdminDashboardPayload",
    totalUsers?: number | null,
    totalInactiveUsers?: number | null,
    totalCardsCreated?: number | null,
    totalCardsShared?: number | null,
    totalEarnings?: string | null,
    error?: string | null,
  } | null,
};

export type ListAllUsersQueryVariables = {
  listUsers?: ListAllUsersInput | null,
};

export type ListAllUsersQuery = {
  listAllUsers?:  {
    __typename: "ListUsersPayload",
    users?:  Array< {
      __typename: "ListUser",
      id: string,
      positionId?: number | null,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      avatar?: string | null,
      userName?: string | null,
      totalCards?: number | null,
      subscriptionPlan?: string | null,
      group?: string | null,
    } | null > | null,
    total?: number | null,
    lastEvaluatedKey?:  {
      __typename: "NextKey",
      partitionType?: string | null,
      id?: string | null,
      item?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type MostSharedCardsQueryVariables = {
  userId?: string | null,
};

export type MostSharedCardsQuery = {
  mostSharedCards?:  {
    __typename: "CardsPayload",
    cards?:  Array< {
      __typename: "CardResponse",
      cardDetails?:  {
        __typename: "Card",
        id: string,
        name?: string | null,
        role?: string | null,
        email?: string | null,
        phone?: string | null,
        address?: string | null,
        website?: string | null,
        facebook?: string | null,
        twitter?: string | null,
        linkedIn?: string | null,
        createdAt?: string | null,
        businessProfileId: string,
        userId?: string | null,
        cardTemplateId?: string | null,
        status?: string | null,
        color?: string | null,
        category?: string | null,
      } | null,
      cardTemplate?:  {
        __typename: "CardTemplate",
        id?: string | null,
        backgroundColor?: string | null,
        borderBottomColor?: string | null,
      } | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type CountUserCardsQueryVariables = {
  userId?: string | null,
};

export type CountUserCardsQuery = {
  countUserCards?: number | null,
};

export type ListSubscriptionPlansQuery = {
  listSubscriptionPlans?:  {
    __typename: "SubscriptionPlansPayload",
    subscriptionPlans?:  Array< {
      __typename: "SubscriptionPlanResponse",
      plan?: string | null,
      currency?: string | null,
      price?: string | null,
      features?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type GetUserSubscriptionStatusQueryVariables = {
  userId?: string | null,
};

export type GetUserSubscriptionStatusQuery = {
  getUserSubscriptionStatus?:  {
    __typename: "UserSubscriptionStatusPayload",
    userSubscriptionData?:  {
      __typename: "SubscriptionResponse",
      id?: string | null,
      subscriptionData?:  {
        __typename: "SubscriptionDetails",
        customerPlan?: string | null,
        subscriptionPrice?: string | null,
      } | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    renewalDate?: string | null,
    cardLastDigits?: string | null,
    cardBrand?: string | null,
    currency?: string | null,
    error?: string | null,
  } | null,
};

export type GetUsersBySubscriptionPlanQueryVariables = {
  plan?: string | null,
};

export type GetUsersBySubscriptionPlanQuery = {
  getUsersBySubscriptionPlan?:  {
    __typename: "ListUsersPayload",
    users?:  Array< {
      __typename: "ListUser",
      id: string,
      positionId?: number | null,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      avatar?: string | null,
      userName?: string | null,
      totalCards?: number | null,
      subscriptionPlan?: string | null,
      group?: string | null,
    } | null > | null,
    total?: number | null,
    lastEvaluatedKey?:  {
      __typename: "NextKey",
      partitionType?: string | null,
      id?: string | null,
      item?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type ListDisabledUserCardsQueryVariables = {
  userId?: string | null,
};

export type ListDisabledUserCardsQuery = {
  listDisabledUserCards?:  {
    __typename: "CardsPayload",
    cards?:  Array< {
      __typename: "CardResponse",
      cardDetails?:  {
        __typename: "Card",
        id: string,
        name?: string | null,
        role?: string | null,
        email?: string | null,
        phone?: string | null,
        address?: string | null,
        website?: string | null,
        facebook?: string | null,
        twitter?: string | null,
        linkedIn?: string | null,
        createdAt?: string | null,
        businessProfileId: string,
        userId?: string | null,
        cardTemplateId?: string | null,
        status?: string | null,
        color?: string | null,
        category?: string | null,
      } | null,
      cardTemplate?:  {
        __typename: "CardTemplate",
        id?: string | null,
        backgroundColor?: string | null,
        borderBottomColor?: string | null,
      } | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListBusinessCategoriesQuery = {
  listBusinessCategories?:  {
    __typename: "ListCategoriesPayload",
    categories?: Array< string | null > | null,
    error?: string | null,
  } | null,
};

export type ListCardTemplatesQuery = {
  listCardTemplates?:  {
    __typename: "ListCardTemplatesPayload",
    cardTemplates?:  Array< {
      __typename: "CardTemplate",
      id?: string | null,
      backgroundColor?: string | null,
      borderBottomColor?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type GetCardTemplateByIdQueryVariables = {
  id?: string | null,
};

export type GetCardTemplateByIdQuery = {
  getCardTemplateById?:  {
    __typename: "CardTemplateResponse",
    cardTemplate?:  {
      __typename: "CardTemplate",
      id?: string | null,
      backgroundColor?: string | null,
      borderBottomColor?: string | null,
    } | null,
    error?: string | null,
  } | null,
};

export type GetAboutPageQuery = {
  getAboutPage?:  {
    __typename: "PageData",
    id?: string | null,
    data?: string | null,
    updatedAt?: string | null,
    error?: string | null,
  } | null,
};

export type GetPrivacyPolicyPageQuery = {
  getPrivacyPolicyPage?:  {
    __typename: "PageData",
    id?: string | null,
    data?: string | null,
    updatedAt?: string | null,
    error?: string | null,
  } | null,
};

export type GetTermsAndConditionsPageQuery = {
  getTermsAndConditionsPage?:  {
    __typename: "PageData",
    id?: string | null,
    data?: string | null,
    updatedAt?: string | null,
    error?: string | null,
  } | null,
};

export type GetUserProfileQueryVariables = {
  userId?: string | null,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfilePayload",
    userDetails?:  {
      __typename: "User",
      id: string,
      backgroundImage?: string | null,
      avatar?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      location?: string | null,
      twitter?: string | null,
      facebook?: string | null,
      biography?: string | null,
      email?: string | null,
      userName?: string | null,
    } | null,
    userBusinessProfiles?:  Array< {
      __typename: "BusinessProfile",
      id?: string | null,
      companyName?: string | null,
      role?: string | null,
      category?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      userId?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type GetPresignedUploadUrlQueryVariables = {
  presignedUploadInput?: PresignedUploadInput | null,
};

export type GetPresignedUploadUrlQuery = {
  getPresignedUploadUrl?: string | null,
};

export type ListUserConversationsQueryVariables = {
  userId?: string | null,
};

export type ListUserConversationsQuery = {
  listUserConversations?:  Array< {
    __typename: "UserConversation",
    id?: string | null,
    recipientUserId?: string | null,
    recipientUsername?: string | null,
    recipientAvatar?: string | null,
    lastMessage?: string | null,
    createdAt?: string | null,
    error?: string | null,
  } | null > | null,
};

export type GetConversationQueryVariables = {
  id?: string | null,
};

export type GetConversationQuery = {
  getConversation?:  {
    __typename: "Conversation",
    id?: string | null,
    recipients?: Array< string | null > | null,
    createdAt?: string | null,
    error?: string | null,
  } | null,
};

export type ListMessagesForConversationQueryVariables = {
  conversationId?: string | null,
};

export type ListMessagesForConversationQuery = {
  listMessagesForConversation?:  Array< {
    __typename: "Message",
    id?: string | null,
    message?: string | null,
    sender?: string | null,
    conversationId?: string | null,
    createdAt?: string | null,
    error?: string | null,
  } | null > | null,
};

export type ListScheduledMessagesQueryVariables = {
  userId?: string | null,
};

export type ListScheduledMessagesQuery = {
  listScheduledMessages?:  {
    __typename: "ListScheduledMessagesPayload",
    scheduledMessages?:  Array< {
      __typename: "ScheduleMessage",
      message?: string | null,
      sender?: string | null,
      conversationId?: string | null,
      minute?: string | null,
      hour?: string | null,
      day?: string | null,
      month?: string | null,
      year?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListDraftsQueryVariables = {
  userId?: string | null,
};

export type ListDraftsQuery = {
  listDrafts?:  {
    __typename: "ListDraftsPayload",
    drafts?:  Array< {
      __typename: "Draft",
      id?: string | null,
      createdAt?: string | null,
      name?: string | null,
      role?: string | null,
      email?: string | null,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      facebook?: string | null,
      twitter?: string | null,
      linkedIn?: string | null,
      businessProfileId: string,
      userId?: string | null,
      cardTemplateId?: string | null,
      status?: string | null,
      color?: string | null,
      category?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListContactsQueryVariables = {
  contactsPayload?: Array< ListContactsInput | null > | null,
};

export type ListContactsQuery = {
  listContacts?:  {
    __typename: "ListContactsPayload",
    tapiollaContacts?:  Array< {
      __typename: "TapiollaContact",
      name?: string | null,
      phoneNumber?: string | null,
      id?: string | null,
    } | null > | null,
    phoneContacts?:  Array< {
      __typename: "PhoneContact",
      name?: string | null,
      phoneNumber?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type ListUserRemindersQueryVariables = {
  userId?: string | null,
};

export type ListUserRemindersQuery = {
  listUserReminders?:  {
    __typename: "ListRemindersPayload",
    reminders?:  Array< {
      __typename: "Reminder",
      userId?: string | null,
      message?: string | null,
      minute?: string | null,
      hour?: string | null,
      day?: string | null,
      month?: string | null,
      year?: string | null,
    } | null > | null,
    error?: string | null,
  } | null,
};

export type OnCreateConversationSubscription = {
  onCreateConversation?:  {
    __typename: "Conversation",
    id?: string | null,
    recipients?: Array< string | null > | null,
    createdAt?: string | null,
    error?: string | null,
  } | null,
};

export type OnCreateMessageByConversationIdSubscriptionVariables = {
  conversationId?: string | null,
};

export type OnCreateMessageByConversationIdSubscription = {
  onCreateMessageByConversationId?:  {
    __typename: "Message",
    id?: string | null,
    message?: string | null,
    sender?: string | null,
    conversationId?: string | null,
    createdAt?: string | null,
    error?: string | null,
  } | null,
};
