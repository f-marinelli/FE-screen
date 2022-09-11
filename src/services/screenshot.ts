const screenshot = async (data: string, apiKey: string | undefined) => {
  const res = await fetch(`${process.env.REACT_APP_BE_DOMAIN}/screen`, {
    method: 'POST',
    body: JSON.stringify({ apiKey: apiKey, html: data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res;
};

export default screenshot;
