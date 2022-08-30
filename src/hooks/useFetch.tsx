import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const useFetch = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const signIn = (data: { email: string | undefined; password: string | undefined }) => {
    fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => setUser(json));
  };

  const signUp = (data: { username: string; email: string; password: string }) => {
    fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => setUser(json));
  };

  const updatePassword = (
    token: string,
    decodedToken: {
      email: string;
      iat: number;
      exp: number;
    },
    newPassword: string
  ) => {
    fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/updatePassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as HeadersInit,
      body: JSON.stringify({ email: decodedToken.email, newPassword: newPassword }),
    })
      .then((res) => res.json())
      .then((json) => setUser(json))
      .then(() => navigate('/', { replace: true }));
  };

  const recoverPassword = (email: string) => {
    fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/recoverPassword`, {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const stripe = async () => {
    const res = await fetch(`${process.env.REACT_APP_BE_DOMAIN}/stripe`, {
      method: 'POST',
      headers: {
        'x-access-token': user.accessToken,
        mode: 'no-cors',
      } as HeadersInit,
    });

    const body = await res.json();
    return body.url;
  };

  return { signIn, signUp, updatePassword, recoverPassword, stripe };
};

export default useFetch;
