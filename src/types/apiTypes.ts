/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCardInput = {
  userId?: string | null;
  email?: string | null;
  profession?: string | null;
  businessProfileId?: string | null;
};

export type Card = {
  __typename: 'Card';
  id: string;
  email?: string | null;
  createdAt?: string | null;
  businessProfileId: string;
  userId?: string | null;
  profession?: string | null;
  status?: string | null;
  color?: string | null;
  category?: string | null;
};

export type ShareCardPayload = {
  sender?: string | null;
  cardId?: string | null;
  recipient?: string | null;
};

export type BusinessProfilePayload = {
  name?: string | null;
  role?: string | null;
  phone?: string | null;
  website?: string | null;
  category?: string | null;
  address?: string | null;
  socialLinks?: SocialLinks | null;
  city?: string | null;
  country?: string | null;
  userId?: string | null;
  services?: Array<string | null> | null;
};

export type SocialLinks = {
  facebook?: string | null;
  twitter?: string | null;
  linkedIn?: string | null;
};

export type BusinessProfileResponse = {
  __typename: 'BusinessProfileResponse';
  businessProfile?: BusinessProfile | null;
  error?: string | null;
};

export type BusinessProfile = {
  __typename: 'BusinessProfile';
  id?: string | null;
  name?: string | null;
  role?: string | null;
  phone?: string | null;
  website?: string | null;
  category?: string | null;
  address?: string | null;
  socialLinks?: SocialLinksResponse | null;
  userId?: string | null;
};

export type SocialLinksResponse = {
  __typename: 'SocialLinksResponse';
  facebook?: string | null;
  twitter?: string | null;
  linkedIn?: string | null;
};

export type UpdateBusinessProfilePayload = {
  id?: string | null;
  name?: string | null;
  role?: string | null;
  phone?: string | null;
  website?: string | null;
  category?: string | null;
  address?: string | null;
  socialLinks?: SocialLinks | null;
};

export type CreateSubscriptionSessionPayload = {
  userId: string;
  customerPlan: string;
};

export type SubscriptionSessionPayload = {
  __typename: 'SubscriptionSessionPayload';
  url?: string | null;
  error?: string | null;
};

export type UpdateUserSubscriptionPayload = {
  userId: string;
  customerPlan: string;
};

export type UpdateUserSubscriptionResponse = {
  __typename: 'UpdateUserSubscriptionResponse';
  userSubscriptionData?: SubscriptionResponse | null;
  error?: string | null;
};

export type SubscriptionResponse = {
  __typename: 'SubscriptionResponse';
  id?: string | null;
  subscriptionData?: SubscriptionDetails | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type SubscriptionDetails = {
  __typename: 'SubscriptionDetails';
  customerPlan?: string | null;
  subscriptionPrice?: string | null;
};

export type CancelUserSubscriptionResponse = {
  __typename: 'CancelUserSubscriptionResponse';
  data?: string | null;
  error?: string | null;
};

export type UserBillingPortalPayload = {
  __typename: 'UserBillingPortalPayload';
  url?: string | null;
  error?: string | null;
};

export type SignupPayload = {
  phone_number: string;
  email: string;
  username: string;
  password: string;
};

export type ConfirmSignUpPayload = {
  username?: string | null;
  confirmationCode?: string | null;
};

export type CardsPayload = {
  __typename: 'CardsPayload';
  cards?: Array<CardResponse | null> | null;
  error?: string | null;
};

export type CardResponse = {
  __typename: 'CardResponse';
  cardDetails?: Card | null;
  businessProfile?: BusinessProfile | null;
};

export type UsersPayload = {
  __typename: 'UsersPayload';
  users?: Array<User | null> | null;
  error?: string | null;
};

export type User = {
  __typename: 'User';
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  avatar?: string | null;
  userName?: string | null;
};

export type BusinessProfilesPayload = {
  __typename: 'BusinessProfilesPayload';
  businessProfiles?: Array<BusinessProfile | null> | null;
  error?: string | null;
};

export type adminDashboardPayload = {
  __typename: 'adminDashboardPayload';
  totalUsers?: number | null;
  totalInactiveUsers?: number | null;
  totalCardsCreated?: number | null;
  totalCardsShared?: number | null;
  totalEarnings?: string | null;
  error?: string | null;
};

export type ListUsersPayload = {
  __typename: 'ListUsersPayload';
  users?: Array<ListUser | null> | null;
  total?: number | null;
  error?: string | null;
};

export type ListUser = {
  __typename: 'ListUser';
  id: string;
  positionId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  avatar?: string | null;
  userName?: string | null;
  totalCards?: number | null;
  subscriptionPlan?: string | null;
  group?: string | null;
};

export type SubscriptionPlansPayload = {
  __typename: 'SubscriptionPlansPayload';
  subscriptionPlans?: Array<SubscriptionPlanResponse | null> | null;
  error?: string | null;
};

export type SubscriptionPlanResponse = {
  __typename: 'SubscriptionPlanResponse';
  plan?: string | null;
  currency?: string | null;
  price?: string | null;
  description?: string | null;
};

export type UserSubscriptionStatusPayload = {
  __typename: 'UserSubscriptionStatusPayload';
  userSubscriptionData?: SubscriptionResponse | null;
  renewalDate?: string | null;
  cardLastDigits?: string | null;
  cardBrand?: string | null;
  currency?: string | null;
  error?: string | null;
};

export type ListCategoriesPayload = {
  __typename: 'ListCategoriesPayload';
  categories?: Array<string | null> | null;
  error?: string | null;
};

export type CreateCardMutationVariables = {
  card: CreateCardInput;
};

export type CreateCardMutation = {
  createCard?: {
    __typename: 'Card';
    id: string;
    email?: string | null;
    createdAt?: string | null;
    businessProfileId: string;
    userId?: string | null;
    profession?: string | null;
    status?: string | null;
    color?: string | null;
    category?: string | null;
  } | null;
};

export type ShareCardMutationVariables = {
  shareCardPayload?: ShareCardPayload | null;
};

export type ShareCardMutation = {
  shareCard?: string | null;
};

export type CreateBusinessProfileMutationVariables = {
  createBusinessProfilePayload?: BusinessProfilePayload | null;
};

export type CreateBusinessProfileMutation = {
  createBusinessProfile?: {
    __typename: 'BusinessProfileResponse';
    businessProfile?: {
      __typename: 'BusinessProfile';
      id?: string | null;
      name?: string | null;
      role?: string | null;
      phone?: string | null;
      website?: string | null;
      category?: string | null;
      address?: string | null;
      socialLinks?: {
        __typename: 'SocialLinksResponse';
        facebook?: string | null;
        twitter?: string | null;
        linkedIn?: string | null;
      } | null;
      userId?: string | null;
    } | null;
    error?: string | null;
  } | null;
};

export type DeleteBusinessProfileMutationVariables = {
  id?: string | null;
};

export type DeleteBusinessProfileMutation = {
  deleteBusinessProfile?: string | null;
};

export type UpdateBusinessProfileMutationVariables = {
  businessProfilePayload: UpdateBusinessProfilePayload;
};

export type UpdateBusinessProfileMutation = {
  updateBusinessProfile?: {
    __typename: 'BusinessProfileResponse';
    businessProfile?: {
      __typename: 'BusinessProfile';
      id?: string | null;
      name?: string | null;
      role?: string | null;
      phone?: string | null;
      website?: string | null;
      category?: string | null;
      address?: string | null;
      socialLinks?: {
        __typename: 'SocialLinksResponse';
        facebook?: string | null;
        twitter?: string | null;
        linkedIn?: string | null;
      } | null;
      userId?: string | null;
    } | null;
    error?: string | null;
  } | null;
};

export type ActivateUserMutationVariables = {
  userId?: string | null;
};

export type ActivateUserMutation = {
  activateUser?: string | null;
};

export type RemoveUserMutationVariables = {
  userId?: string | null;
};

export type RemoveUserMutation = {
  removeUser?: string | null;
};

export type SuspendUserMutationVariables = {
  userId?: string | null;
};

export type SuspendUserMutation = {
  suspendUser?: string | null;
};

export type SubscriptionSessionMutationVariables = {
  subscriptionSessionPayload?: CreateSubscriptionSessionPayload | null;
};

export type SubscriptionSessionMutation = {
  subscriptionSession?: {
    __typename: 'SubscriptionSessionPayload';
    url?: string | null;
    error?: string | null;
  } | null;
};

export type UpdateUserSubscriptionMutationVariables = {
  updateUserSubscriptionPayload: UpdateUserSubscriptionPayload;
};

export type UpdateUserSubscriptionMutation = {
  updateUserSubscription?: {
    __typename: 'UpdateUserSubscriptionResponse';
    userSubscriptionData?: {
      __typename: 'SubscriptionResponse';
      id?: string | null;
      subscriptionData?: {
        __typename: 'SubscriptionDetails';
        customerPlan?: string | null;
        subscriptionPrice?: string | null;
      } | null;
      createdAt?: string | null;
      updatedAt?: string | null;
    } | null;
    error?: string | null;
  } | null;
};

export type CancelUserSubscriptionMutationVariables = {
  userId?: string | null;
};

export type CancelUserSubscriptionMutation = {
  cancelUserSubscription?: {
    __typename: 'CancelUserSubscriptionResponse';
    data?: string | null;
    error?: string | null;
  } | null;
};

export type UserBillingPortalMutationVariables = {
  userId?: string | null;
};

export type UserBillingPortalMutation = {
  userBillingPortal?: {
    __typename: 'UserBillingPortalPayload';
    url?: string | null;
    error?: string | null;
  } | null;
};

export type DisableUserCardMutationVariables = {
  cardId?: string | null;
};

export type DisableUserCardMutation = {
  disableUserCard?: string | null;
};

export type SignUpMutationVariables = {
  signUpPayload?: SignupPayload | null;
};

export type SignUpMutation = {
  signUp?: string | null;
};

export type ConfirmSignUpMutationVariables = {
  confirmSignUpPayload?: ConfirmSignUpPayload | null;
};

export type ConfirmSignUpMutation = {
  confirmSignUp?: string | null;
};

export type ListReceivedCardsQueryVariables = {
  userId?: string | null;
};

export type ListReceivedCardsQuery = {
  listReceivedCards?: {
    __typename: 'CardsPayload';
    cards?: Array<{
      __typename: 'CardResponse';
      cardDetails?: {
        __typename: 'Card';
        id: string;
        email?: string | null;
        createdAt?: string | null;
        businessProfileId: string;
        userId?: string | null;
        profession?: string | null;
        status?: string | null;
        color?: string | null;
        category?: string | null;
      } | null;
      businessProfile?: {
        __typename: 'BusinessProfile';
        id?: string | null;
        name?: string | null;
        role?: string | null;
        phone?: string | null;
        website?: string | null;
        category?: string | null;
        address?: string | null;
        userId?: string | null;
      } | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type ListUserCardsQueryVariables = {
  userId?: string | null;
};

export type ListUserCardsQuery = {
  listUserCards: {
    __typename: 'CardsPayload';
    cards: Array<{
      __typename: 'CardResponse';
      cardDetails: {
        __typename: 'Card';
        id: string;
        email: string;
        createdAt?: string | null;
        businessProfileId: string;
        userId?: string | null;
        profession?: string | null;
        status?: string | null;
        color?: string | null;
        category?: string | null;
      };
      businessProfile: {
        __typename: 'BusinessProfile';
        id?: string | null;
        name?: string | null;
        role?: string | null;
        phone?: string | null;
        website?: string | null;
        category?: string | null;
        address?: string | null;
        userId?: string | null;
      };
    }>;
    error?: string | null;
  };
};

export type ListSharedCardsQueryVariables = {
  userId?: string | null;
};

export type ListSharedCardsQuery = {
  listSharedCards?: {
    __typename: 'CardsPayload';
    cards?: Array<{
      __typename: 'CardResponse';
      cardDetails?: {
        __typename: 'Card';
        id: string;
        email?: string | null;
        createdAt?: string | null;
        businessProfileId: string;
        userId?: string | null;
        profession?: string | null;
        status?: string | null;
        color?: string | null;
        category?: string | null;
      } | null;
      businessProfile?: {
        __typename: 'BusinessProfile';
        id?: string | null;
        name?: string | null;
        role?: string | null;
        phone?: string | null;
        website?: string | null;
        category?: string | null;
        address?: string | null;
        userId?: string | null;
      } | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type ListUsersWhoSharedACardQueryVariables = {
  cardId?: string | null;
};

export type ListUsersWhoSharedACardQuery = {
  listUsersWhoSharedACard?: {
    __typename: 'UsersPayload';
    users?: Array<{
      __typename: 'User';
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      address?: string | null;
      phoneNumber?: string | null;
      avatar?: string | null;
      userName?: string | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type ListReceiversFromUserQueryVariables = {
  userId?: string | null;
};

export type ListReceiversFromUserQuery = {
  listReceiversFromUser?: {
    __typename: 'UsersPayload';
    users?: Array<{
      __typename: 'User';
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      address?: string | null;
      phoneNumber?: string | null;
      avatar?: string | null;
      userName?: string | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type ListSendersToUserQueryVariables = {
  userId?: string | null;
};

export type ListSendersToUserQuery = {
  listSendersToUser?: {
    __typename: 'UsersPayload';
    users?: Array<{
      __typename: 'User';
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      address?: string | null;
      phoneNumber?: string | null;
      avatar?: string | null;
      userName?: string | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type ListUserBusinessProfilesQueryVariables = {
  userId?: string | null;
};

export type ListUserBusinessProfilesQuery = {
  listUserBusinessProfiles?: {
    __typename: 'BusinessProfilesPayload';
    businessProfiles?: Array<{
      __typename: 'BusinessProfile';
      id?: string | null;
      name?: string | null;
      role?: string | null;
      phone?: string | null;
      website?: string | null;
      category?: string | null;
      address?: string | null;
      socialLinks?: {
        __typename: 'SocialLinksResponse';
        facebook?: string | null;
        twitter?: string | null;
        linkedIn?: string | null;
      } | null;
      userId?: string | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type GetBusinessProfileByIdQueryVariables = {
  id?: string | null;
};

export type GetBusinessProfileByIdQuery = {
  getBusinessProfileById?: {
    __typename: 'BusinessProfileResponse';
    businessProfile?: {
      __typename: 'BusinessProfile';
      id?: string | null;
      name?: string | null;
      role?: string | null;
      phone?: string | null;
      website?: string | null;
      category?: string | null;
      address?: string | null;
      socialLinks?: {
        __typename: 'SocialLinksResponse';
        facebook?: string | null;
        twitter?: string | null;
        linkedIn?: string | null;
      } | null;
      userId?: string | null;
    } | null;
    error?: string | null;
  } | null;
};

export type ListCardsByBusinessProfileIdQueryVariables = {
  businessProfileId?: string | null;
};

export type ListCardsByBusinessProfileIdQuery = {
  listCardsByBusinessProfileId?: {
    __typename: 'CardsPayload';
    cards?: Array<{
      __typename: 'CardResponse';
      cardDetails?: {
        __typename: 'Card';
        id: string;
        email?: string | null;
        createdAt?: string | null;
        businessProfileId: string;
        userId?: string | null;
        profession?: string | null;
        status?: string | null;
        color?: string | null;
        category?: string | null;
      } | null;
      businessProfile?: {
        __typename: 'BusinessProfile';
        id?: string | null;
        name?: string | null;
        role?: string | null;
        phone?: string | null;
        website?: string | null;
        category?: string | null;
        address?: string | null;
        userId?: string | null;
      } | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type AdminDashboardQuery = {
  adminDashboard?: {
    __typename: 'adminDashboardPayload';
    totalUsers?: number | null;
    totalInactiveUsers?: number | null;
    totalCardsCreated?: number | null;
    totalCardsShared?: number | null;
    totalEarnings?: string | null;
    error?: string | null;
  } | null;
};

export type ListAllUsersQuery = {
  listAllUsers?: {
    __typename: 'ListUsersPayload';
    users?: Array<{
      __typename: 'ListUser';
      id: string;
      positionId?: number | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      avatar?: string | null;
      userName?: string | null;
      totalCards?: number | null;
      subscriptionPlan?: string | null;
      group?: string | null;
    } | null> | null;
    total?: number | null;
    error?: string | null;
  } | null;
};

export type ViewUserCardsForAdminQueryVariables = {
  userId?: string | null;
};

export type ViewUserCardsForAdminQuery = {
  viewUserCardsForAdmin?: {
    __typename: 'CardsPayload';
    cards?: Array<{
      __typename: 'CardResponse';
      cardDetails?: {
        __typename: 'Card';
        id: string;
        email?: string | null;
        createdAt?: string | null;
        businessProfileId: string;
        userId?: string | null;
        profession?: string | null;
        status?: string | null;
        color?: string | null;
        category?: string | null;
      } | null;
      businessProfile?: {
        __typename: 'BusinessProfile';
        id?: string | null;
        name?: string | null;
        role?: string | null;
        phone?: string | null;
        website?: string | null;
        category?: string | null;
        address?: string | null;
        userId?: string | null;
      } | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type MostSharedCardsQueryVariables = {
  userId?: string | null;
};

export type MostSharedCardsQuery = {
  mostSharedCards?: {
    __typename: 'CardsPayload';
    cards?: Array<{
      __typename: 'CardResponse';
      cardDetails?: {
        __typename: 'Card';
        id: string;
        email?: string | null;
        createdAt?: string | null;
        businessProfileId: string;
        userId?: string | null;
        profession?: string | null;
        status?: string | null;
        color?: string | null;
        category?: string | null;
      } | null;
      businessProfile?: {
        __typename: 'BusinessProfile';
        id?: string | null;
        name?: string | null;
        role?: string | null;
        phone?: string | null;
        website?: string | null;
        category?: string | null;
        address?: string | null;
        userId?: string | null;
      } | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type CountUserCardsQueryVariables = {
  userId?: string | null;
};

export type CountUserCardsQuery = {
  countUserCards?: number | null;
};

export type ListSubscriptionPlansQuery = {
  listSubscriptionPlans?: {
    __typename: 'SubscriptionPlansPayload';
    subscriptionPlans?: Array<{
      __typename: 'SubscriptionPlanResponse';
      plan?: string | null;
      currency?: string | null;
      price?: string | null;
      description?: string | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type GetUserSubscriptionStatusQueryVariables = {
  userId?: string | null;
};

export type GetUserSubscriptionStatusQuery = {
  getUserSubscriptionStatus?: {
    __typename: 'UserSubscriptionStatusPayload';
    userSubscriptionData?: {
      __typename: 'SubscriptionResponse';
      id?: string | null;
      subscriptionData?: {
        __typename: 'SubscriptionDetails';
        customerPlan?: string | null;
        subscriptionPrice?: string | null;
      } | null;
      createdAt?: string | null;
      updatedAt?: string | null;
    } | null;
    renewalDate?: string | null;
    cardLastDigits?: string | null;
    cardBrand?: string | null;
    currency?: string | null;
    error?: string | null;
  } | null;
};

export type GetUsersBySubscriptionPlanQueryVariables = {
  plan?: string | null;
};

export type GetUsersBySubscriptionPlanQuery = {
  getUsersBySubscriptionPlan?: {
    __typename: 'ListUsersPayload';
    users?: Array<{
      __typename: 'ListUser';
      id: string;
      positionId?: number | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      avatar?: string | null;
      userName?: string | null;
      totalCards?: number | null;
      subscriptionPlan?: string | null;
      group?: string | null;
    } | null> | null;
    total?: number | null;
    error?: string | null;
  } | null;
};

export type ListDisabledUserCardsQueryVariables = {
  userId?: string | null;
};

export type ListDisabledUserCardsQuery = {
  listDisabledUserCards?: {
    __typename: 'CardsPayload';
    cards?: Array<{
      __typename: 'CardResponse';
      cardDetails?: {
        __typename: 'Card';
        id: string;
        email?: string | null;
        createdAt?: string | null;
        businessProfileId: string;
        userId?: string | null;
        profession?: string | null;
        status?: string | null;
        color?: string | null;
        category?: string | null;
      } | null;
      businessProfile?: {
        __typename: 'BusinessProfile';
        id?: string | null;
        name?: string | null;
        role?: string | null;
        phone?: string | null;
        website?: string | null;
        category?: string | null;
        address?: string | null;
        userId?: string | null;
      } | null;
    } | null> | null;
    error?: string | null;
  } | null;
};

export type ListBusinessCategoriesQuery = {
  listBusinessCategories?: {
    __typename: 'ListCategoriesPayload';
    categories?: Array<string | null> | null;
    error?: string | null;
  } | null;
};