import { message } from './message.json';

export const hello = async () => {
  const payload = {
    lambda: message,
    environment: process.env.MESSAGE,
  };

  console.log('payload', payload);

  return {
    statusCode: 200,
    body: JSON.stringify(payload, null, 2),
  };
};
