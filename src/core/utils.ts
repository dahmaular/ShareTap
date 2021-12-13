export const emailValidator = (email: string) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!email || email.length <= 0) return 'email cannot be empty.';
  if (!regex.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password) {
    return 'password is required';
  }

  if (password.length < 8) {
    return 'password must be at least 8 characters';
  }

  if (!/[A-Z]/.test(password)) {
    return 'password must contain an uppercase letter';
  }

  if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
    return 'password must contain a special character';
  }

  return '';
};

export const confirmPasswordValidator = (value: string, password: string) => {
  if (!value) {
    return 'password is required';
  }

  if (value !== password) {
    return 'passwords do not match';
  }

  return '';
};

export const nameValidator = (value: string, type: string) => {
  if (!value || value.length <= 0) return `${type} cannot be empty.`;
  return '';
};

export const userNameValidator = (value: string, type: string) => {
  if (!value || value.length <= 0) return `${type} cannot be empty.`;
  return '';
};
