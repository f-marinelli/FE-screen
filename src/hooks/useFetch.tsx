const useFetch = () => {
  const signIn = async (data: { email: string | undefined; password: string | undefined }) => {
    const res = await fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const json = await res.json();

      return { user: json, ok: res.ok };
    } else {
      const json = await res.json();

      return { message: json, ok: res.ok };
    }
  };

  const signUp = async (data: { username: string; email: string; password: string }) => {
    const res = await fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const json = await res.json();

      return { user: json, ok: res.ok };
    } else {
      const json = await res.json();

      return { message: json, ok: res.ok };
    }
  };

  const updatePassword = async (
    token: string,
    decodedToken: {
      email: string;
      iat: number;
      exp: number;
    },
    newPassword: string
  ) => {
    const res = await fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/updatePassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as HeadersInit,
      body: JSON.stringify({ email: decodedToken.email, newPassword: newPassword }),
    });
    if (res.ok) {
      const json = await res.json();

      return { user: json, ok: res.ok };
    } else {
      const json = await res.json();

      return { message: json, ok: res.ok };
    }
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

  const stripe = async (user: {
    username?: string;
    password?: string;
    email?: string;
    accessToken?: string;
    APIKey?: string;
  }) => {
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

  const screenshot = async (data: string, apiKey: string | undefined) => {
    const res = await fetch(`${process.env.REACT_APP_BE_DOMAIN}/screen`, {
      method: 'POST',
      body: JSON.stringify({ apiKey: apiKey, html: data }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const file = await res.blob();

    return file;
  };

  return { signIn, signUp, updatePassword, recoverPassword, stripe, screenshot };
};

export default useFetch;
