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

  // const body = await res.json();
  // return body.url;

  if (res.ok) {
    const body = await res.json();

    return { url: body.url, ok: res.ok };
  } else {
    const json = await res.json();
    return { message: json.message, ok: res.ok };
  }
};

export default stripe;
