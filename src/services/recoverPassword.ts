const recoverPassword = async (email: string) => {
  const res = await fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/recoverPassword`, {
    method: 'POST',
    body: JSON.stringify({ email: email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    return { message: 'Email sent successfully', ok: res.ok };
  } else {
    const json = await res.json();
    return { message: json.message, ok: res.ok };
  }
};

export default recoverPassword;
