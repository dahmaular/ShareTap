import {Auth} from 'aws-amplify';

export const signInService = async (username: string, password: string) => {
  try {
    const response = await Auth.signIn({
      username,
      password,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const signUpService = async (
  user: Record<
    'fullName' | 'email' | 'phone' | 'password' | 'userName',
    string
  >,
) => {
  try {
    const response = await Auth.signUp({
      username: user.userName,
      password: user.password,
      attributes: {
        email: user.email,
        phone_number: user.phone,
        //'custom:fullName': user.fullName,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const resendSignUpService = async (userName: string) => {
  try {
    await Auth.resendSignUp(userName);
  } catch (error) {
    throw error;
  }
};

export const confirmSignUpService = async (userName: string, code: string) => {
  try {
    const response = await Auth.confirmSignUp(userName, code);

    return response;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (userName: string) => {
  try {
    const response = await Auth.forgotPassword(userName);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  userName: string,
  code: string,
  password: string,
) => {
  try {
    const response = await Auth.forgotPasswordSubmit(userName, code, password);

    return response;
  } catch (error) {
    throw error;
  }
};