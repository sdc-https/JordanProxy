import http from "k6/http";
import { sleep } from "k6";
// GET
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      rate: 1000,
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 100,
      maxVUs: 300,
    },
  },
};
export default function () {
  const BASE_URL = `http://localhost:3000/dp/9000001`;
  http.get(`${BASE_URL}`);
}

