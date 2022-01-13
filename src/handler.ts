export const hello = async () => {
  const envTestVariables = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key.startsWith('ENV_TEST_')),
  );

  const payload = {
    message: '1st deploy',
    // message: '2nd deploy',
    envTestVariables,
  };

  console.log('payload', payload);

  return {
    statusCode: 200,
    body: JSON.stringify(payload, null, 2),
  };
};
