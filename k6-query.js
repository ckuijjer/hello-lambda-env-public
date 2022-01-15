import http from 'k6/http';
import { sleep } from 'k6';
const stack = JSON.parse(open('./stack.json'));

export const options = {
  stages: [
    { duration: '10s', target: 20 }, // simulate ramp-up of traffic from 1 to 20 users over 10 seconds.
    { duration: '70s', target: 20 }, // stay at 20 users for 70 seconds
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
  http.get(stack.ServiceEndpoint);
  sleep(0.1); // 90s * 20 users * 0.1s wait = about 18k API calls in total
}
