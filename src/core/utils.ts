export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = (name: string) => {
  const regex = /(\w.+\s).+/;
  if (!name || name.length <= 0) return 'Full name cannot be empty.';
  if (!regex.test(name)) return 'Enter at least 2 names.';

  return '';
};
