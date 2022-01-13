import http from 'k6/http';
import { sleep } from 'k6';
const stack = JSON.parse(open('./stack.json'));

export const options = {
  stages: [
    { duration: '10s', target: 10 }, // simulate ramp-up of traffic from 1 to 10 users over 10 seconds.
    { duration: '70s', target: 10 }, // stay at 10 users for 70 seconds
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
  http.get(stack.ServiceEndpoint);
  sleep(0.2); // 90s * 10 users * 0.2s wait = about 4.500 API calls in total
}
