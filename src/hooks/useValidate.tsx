import { useState } from 'react';

interface DataInput {
  type: string;
  username?: string;
  email: string;
  password: string;
  confirm?: string;
}

interface DataOutput {
  emailValid: boolean;
  passwordValid: boolean;
  usernameValid: boolean;
  validateForm: (data: DataInput) => void;
  resetForm: () => void;
  validatePassword: (password: string, confirm: string) => void;
}

export const useValidate = (): DataOutput => {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  const validateEmail = (mail: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setEmailValid(true);
    }
  };

  const validatePassword = (password: string, confirm: string = password) => {
    if (password.length >= 8 && password === confirm) {
      setPasswordValid(true);
    }
  };

  const validateUsername = (username: string) => {
    if (username.length >= 5) {
      setUsernameValid(true);
    }
  };

  const validateForm = (data: DataInput): void => {
    if (data.type === 'signin') {
      validateEmail(data.email!);
      validatePassword(data.password);
    }

    if (data.type === 'signup') {
      validateEmail(data.email);
      validatePassword(data.password, data.confirm);
      validateUsername(data.username!);
    }
  };

  const resetForm = () => {
    setEmailValid(false);
    setPasswordValid(false);
    setUsernameValid(false);
  };

  return { emailValid, passwordValid, usernameValid, validateForm, resetForm, validatePassword };
};
