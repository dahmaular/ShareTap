export type TabNavigatorParamsList = {
  Home: undefined;
  Chat: undefined;
  Card: undefined;
  Contacts: undefined;
  Profile: undefined;
};

export type UnauthenticatedRoutesParamsList = {
  CreateAccount: {
    item: AccountCreationRoute;
  };
  ForgotPassword: undefined;
  PhoneNumber: {
    item: PhoneNumberRoute;
  };
  ProfileType: undefined;
  ResetPassword: undefined;
  Signin: undefined;
  Verification: undefined;
  Welcome: undefined;
  Splash: undefined;
};

export type AuthenticatedRoutesParamsList = {
  Root: undefined;
};

export interface AccountCreationRoute {
  id: number | null;
  title: string;
  description: string;
  image: any;
}

export interface PhoneNumberRoute {
  id: number | null;
  title: string;
  description: string;
  image: any;
  fullName: string;
  email: string;
  password: string;
}
