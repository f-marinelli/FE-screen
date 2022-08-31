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

export default stripe;
