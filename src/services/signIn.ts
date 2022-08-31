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
    return { message: json.message, ok: res.ok };
  }
};

export default signIn;
