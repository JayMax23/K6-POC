import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { EnvVariables } from '../env-variables.js';
import { Rate } from 'k6/metrics';

// Produce a report from JSON Data handleSummary is the AfterAll callback function provided by k6
export function handleSummary(data) {
  return {
    "../reports/post-pet-simple.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

// Call the EnvVariables Object to be used at RunTime
const BASE_URL = EnvVariables.baseUrl;

// Generate Your Own Custom Metric
export let errorRate = new Rate('errors') // Create Custom Metric to be used in thresholds and default function

// Setting the Configuration for the Test
export const options = {
  vus: 1, // 1 user looping for 10 seconds
  duration: '5s',  //  s , m , h, *m*s, h*m*s

  thresholds: {
    http_req_failed: ['rate<=0.05'], // if request rate drops below 0.05 seconds
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    errors: ['rate<0.1'], // Error Threshold. If Errors Exceed 10% then test fails. (Custom Metric)
  },
};

// Performance Test Itself
export default function () {
  const url = `${BASE_URL}/pet`;
  
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  let createPetBody = JSON.stringify({
    name: "my-test-doggie",
    id: Math.floor(Math.random() * 9999999999),
    category: {
      id: Math.floor(Math.random() * 9999999999),
      name: "Luna"
    },
    status: "sold"
  });

  const response = http.post(url,createPetBody, params);
  check(response, { 
      'POST /Pet: Status Code was 200' : (r) => r.status == 200,
      'POST /Pet: Correct name was returned' : (r) => r.json()["name"] === "my-test-doggie",
      'POST /Pet: Correct status was returned' : (r) => r.json()["status"] === "sold"
  }) || errorRate.add(1);


   sleep(Math.random() * 2); // Sleep between 0 > 2s to make it more like a human interaction
}
