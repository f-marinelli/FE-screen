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

export default updatePassword;
