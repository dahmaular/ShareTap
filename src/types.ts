export type TabNavigatorParamsList = {
  Home: undefined;
  Chat: undefined;
  Card: undefined;
  Contacts: undefined;
  Profile: undefined;
};

export type UnauthenticatedRoutesParamsList = {
  CreateAccount: {
    item: AccountCreation;
  };
  ForgotPassword: undefined;
  PhoneNumber: undefined;
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

export interface AccountCreation {
  id: number | null;
  title: string;
  description: string;
  image: any;
}
