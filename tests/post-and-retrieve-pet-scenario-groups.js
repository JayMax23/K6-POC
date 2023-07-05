import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { EnvVariables } from '../env-variables.js';

// Produce a report from JSON Data handleSummary is the AfterAll callback function provided by k6
export function handleSummary(data) {
  return {
    "../reports/post-and-retrieve-pet-scenario-groups.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

// Call the EnvVariables Object to be used at RunTime
const BASE_URL = EnvVariables.baseUrl

// Setting the Configuration for the Test
export const options = {
  vus: 1, // 1 user looping for 10 seconds
  duration: '5s',  //  s , m , h, *m*s, h*m*s

  thresholds: {
    http_req_failed: ['rate<=0.05'], // if request rate drops below 0.05 seconds
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  }
};

// Performance Test Itself
export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  let petTag = "k6PerformancePet" + Math.floor(Math.random() * 9999999999);

  let createPetBody = JSON.stringify({
    name: "my-test-doggie",
    id: Math.floor(Math.random() * 9999999999),
    category: {
      id: Math.floor(Math.random() * 9999999999),
      name: "Luna"
    },
    "tags": [
      {
        "id": Math.floor(Math.random() * 9999999999),
        "name": petTag
      }
    ],
    status: "sold"
  });

  group('Generate a Pet and Confirm Creation via APIs', (_) => {
    // POST Pet Request    
    const postUrl = `${BASE_URL}/pet`;
    const post_response = http.post(postUrl, createPetBody, params);
    check(post_response, {
      'POST /Pet: Status Code was 200' : (r) => r.status == 200,
      'POST /Pet: Correct name was returned' : (r) => r.json()["name"] === "my-test-doggie",
      'POST /Pet: Correct status was returned' : (r) => r.json()["status"] === "sold"
    });

    let responseContent = post_response.json();
    sleep(Math.random() * 2); // Sleep between 0 > 2s to make it more like a human interaction

    // GET Pet Request
    const getUrl = `${BASE_URL}/pet/findByTags?tags=`+ responseContent.tags[0].name;
    const get_response = http.get(getUrl,params);
    check(get_response, { 
        'GET /pet/findByTags?tags={tagName}: Status Code was 200' : (r) => r.status == 200,
        'GET /pet/findByTags?tags={tagName}: Correct name was returned' : (r) => r.json()[0]["name"] === "my-test-doggie",
        'GET /pet/findByTags?tags={tagName}: Correct status was returned' : (r) => r.json()[0]["status"] === "sold",
        'GET /pet/findByTags?tags={tagName}: Correct Pet ID was returned' : (r) => r.json()[0]["id"] === responseContent.id
    });
  });
}
