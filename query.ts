import got from 'got';
import { ServiceEndpoint } from './stack.json';

(async () => {
  const result = await got(ServiceEndpoint).json();
  console.log(result);
})();
