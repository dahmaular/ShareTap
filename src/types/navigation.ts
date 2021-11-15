import {NavigatorScreenParams} from '@react-navigation/native';

export interface ConnectProps {
  id: number;
  name: string;
}

export interface CardProps {
  id: number;
  name: string;
  phone: string;
  email: string;
  profession: string;
}

export type TabNavigatorParamsList = {
  Home: undefined;
  Chat: undefined;
  Card: undefined;
  Contacts: undefined;
  Profile: undefined;
};

export type UnauthenticatedRoutesParamsList = {
  CreateAccount: Record<'item', AccountCreationRoute>;
  ForgotPassword: undefined;
  PhoneNumber: Record<'item', PhoneNumberRoute>;
  ProfileType: undefined;
  ResetPassword: Record<'item', ResetPasswordRoute>;
  Signin: undefined;
  Verification: Record<'item', VerificationRoute>;
  Welcome: undefined;
  Splash: undefined;
};

export type AuthenticatedRoutesParamsList = {
  Root: undefined;
  Search: undefined;
  Rolodex: undefined;
  SetReminder: undefined;
  ReminderCalendar: undefined;
  Test: undefined
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
  firstName: string;
  email: string;
  password: string;
  userName: string;
  lastName: string;
}

export interface VerificationRoute {
  email: string;
  userName: string;
  isForgotPassword?: boolean;
}

export interface ForgotPasswordRoute {
  userName: string;
}

export interface ResetPasswordRoute {
  code: string;
  email: string;
}
