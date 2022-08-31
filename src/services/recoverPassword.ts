const recoverPassword = (email: string) => {
  fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/recoverPassword`, {
    method: 'POST',
    body: JSON.stringify({ email: email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default recoverPassword;
