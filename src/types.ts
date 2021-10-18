import { NavigatorScreenParams } from '@react-navigation/native';

export interface ItemProps {
  id: number;
  name: string;
  phone: string;
  email: string;
  profession: string;
}

export interface ConnectProps {
  id: number;
  name: string;
}

export interface CardProps {
  item: ItemProps;
  index: number;
  boxWidth: number;
  halfBoxDistance: number;
  pan: any;
}

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
  Verification: {
    item: VerificationRoute
  } | undefined;
  Welcome: undefined;
  Splash: undefined;
};

export type AuthenticatedRoutesParamsList = {
  Root: undefined;
  Search: undefined
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

export interface VerificationRoute {
  id: number | null;
  title: string;
  description: string;
  image: any;
  fullName: string;
  email: string;
  password: string;
  phone: string
}
