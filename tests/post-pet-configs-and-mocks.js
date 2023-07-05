import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from "k6";
import http from "k6/http";

import { EnvVariables } from '../env-variables.js';
import { generatePetAPIRequest } from "../__mocks__/pet-api-requests.js";
import { setRampConfig } from "../configs/performance-ramp-configs.js";

// Produce a report from JSON Data handleSummary is the AfterAll callback function provided by k6
export function handleSummary(data) {
  return {
    "../reports/post-pet-configs-and-mocks.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

// Set the type of performnace test from a set of defined performance tests
export const options = setRampConfig("RampExecutorConfigDemo");

const BASE_URL = EnvVariables.baseUrl;

export default () => {
  const payload = JSON.stringify(generatePetAPIRequest);

  const params = {
    headers: {
      "Content-Type": "application/json"
    },
  };

  const response = http.post(`${BASE_URL}/pet`, payload, params);

  // Log out while test is running into console what the service has returned if not a 200. This is useful to see in real time why something
  // failed, rather than wait for a long soak / stress test to finish.

  if (response.status !== 200) {
    console.log(
      JSON.stringify(
        {
          body: response.body,
          request: JSON.stringify(response.request),
          status: response.status,
        },
        null,
        2
      )
    );
  }

  check(response, {
    'POST /Pet: Status Code was 200' : (r) => r.status == 200,
    'POST /Pet: Correct name was returned' : (r) => r.json()["name"] === generatePetAPIRequest.name,
    'POST /Pet: Correct status was returned' : (r) => r.json()["status"] === "sold"
  });
};
