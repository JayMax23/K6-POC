## How to run a load test locally

1. Install k6: https://k6.io/docs/getting-started/installation/   (https://dl.k6.io/msi/k6-latest-amd64.msi) 
<br>

## Commands to run:

`k6 run example-name-test.js`

<br>

## Types of test

### Constant Rate

A fixed number of VUs execute as many iterations as possible for a specified amount of time. This executor is equivalent to the global vus and duration options.

_Constant VUs_ focuses on continually performing your test over a specified amount of time. This allows each virtual user to perform as many requests as it can within the allowed timeframe.

| Option         | Description                                 | Default      |
| -------------- | ------------------------------------------- | ------------ |
| **`duration`** | Overall scenario duration                   | - (required) |
| `vus`          | Number of virtual users to run concurrently | `1`          |

As noted above, the primary objective is for each of the `vus` VU(s) to perform as many test iterations as possible for the required `duration` time-period, e.g. `"30s"`, `"1h"`, etc.

<br>

#### When to use

Use this executor if you need a specific amount of VUs to run for a certain amount of time.

##### Example:

```json
{
  "executor": "constant-vus",
  "vus": 100, // Constant amount of Users
  "duration": "5m" // Time
}
```

URL: https://k6.io/docs/using-k6/scenarios/executors/constant-vus

<br>

### Ramping Arrival Rates

A variable number of VUs execute as many iterations as possible for a specified amount of time. This executor is equivalent to the global stages option.

_Ramping VUs_ is an evolution of the _Constant VUs_ executor which introduces **_stages_**. This allows k6 to transition the number of desired VUs from one stage to another. Each stage defines its own timeframe for which all VUs will continually perform your test.

| Option             | Description                                                                             | Default      |
| ------------------ | --------------------------------------------------------------------------------------- | ------------ |
| **`stages`**       | Consists of a time `duration` and `target` for the number of desired VUs                | - (required) |
| `gracefulRampDown` | Grace period for a test iteration to finish before shutting down a VU when ramping down | `"30s"`      |
| `startVUs`         | Number of virtual users at the beginning of test                                        | `1`          |

A time-based scenario, the total duration is equal to the sum of `duration` timeframe(s) from each `stage`. The first stage will begin with `startVUs` VU(s) and ramp up (or down) linearly over the configured `duration` to the `target` number of VUs specified within the stage. The next stage, if configured, will then ramp up or down from that point to the desired `target` VU(s) over the specified `duration` timeframe. This pattern continues for each remaining stage. As with _Constant VUs_, each running VU will continually perform test iterations until the scenario ends.

[Experiment with _Ramping VUs_ for yourself!](Executors/Ramping%20VUs%20Exercises.md)

<br>

#### When to use

This executor is a good fit if you need VUs to ramp up or down during specific periods of time

##### Example:

`RampExecutorConfigType1:`

```
 {
   executor: "ramping-vus",
   startVUs: 0,
   stages: [
      { duration: "5m", target: 100 }, // Ramp from 0 > 100 users in 5 minutes
      { duration: "5m", target: 100 }, // Hold at 100 users for 5 minutes
      { duration: "5m", target: 0 }, // Ramp down over 5 minitues to 0 users ], }
```

URL: https://k6.io/docs/using-k6/scenarios/executors/ramping-vus/

<br>

### Ramping Arrival Rates

A variable number of iterations are started in specified periods of time. This is similar to the ramping VUs executor, but for iterations instead. k6 will attempt to dynamically change the number of VUs to achieve the configured iteration rate.

_Ramping Arrival Rate_ is an evolution of the _Constant Arrival Rate_ executor which introduces **_stages_**. This is probably the best candidate for modeling real-world testing scenarios, allowing k6 to transition the desired _iteration rate_ from one stage to another. Each stage defines its own timeframe for which to achieve the desired rate.

| Option                | Description                                                                          | Default        |
| --------------------- | ------------------------------------------------------------------------------------ | -------------- |
| **`preAllocatedVUs`** | Number of virtual users at the beginning of test                                     | - (required)   |
| **`stages`**          | Consists of a time `duration` and `target` for the desired iterations per `timeUnit` | - (required)   |
| `maxVUs`              | Maximum number of virtual users allowed to scale                                     | - (no scaling) |
| `startRate`           | Desired iterations per `timeUnit` to be achieved and maintained                      | `0`            |
| `timeUnit`            | Duration to which the desired `rate` applies                                         | `"1s"`         |

Similar to the _Constant Arrival Rate_, the main focus is achieving a target _iteration rate_. The primary difference being the desired rate is achieved within each defined `stage`. The overall duration will be equal to the sum of `duration` timeframe(s) from each `stage`. The first stage will begin with an _iteration rate_ of `startRate` per `timeUnit` performed by `preAllocatedVUs` virtual user(s). The _iteration rate_ will ramp up (or down) linearly over the configured `duration` to the `target` rate specified for the stage. The next stage, if configured, will then ramp up or down from that point to the desired `target` rate over the specified `duration` timeframe. This pattern continues for each remaining stage. _Spikes_, _valleys_, and _plateaus_ can be simulated with these stages.

[Experiment with _Ramping Arrival Rate_ for yourself!](Executors/Ramping%20Arrival%20Rate%20Exercises.md)

<br>

#### When to use

If you need your tests to not be affected by the system-under-test's performance, and would like to ramp the number of iterations up or down during specific periods of time.

URL: https://k6.io/docs/using-k6/scenarios/executors/ramping-arrival-rate

<br>

## Avaliable HTTP Requests

| Syntax    | Description                                                              | 
|-----------|--------------------------------------------------------------------------|
| batch()	| Issue multiple HTTP requests in parallel (like e.g. browsers tend to do).  |
| del()	    | Issue an HTTP DELETE request.                                            |
| get()	    | Issue an HTTP GET request.                                               |
| options()	| Issue an HTTP OPTIONS request.                                           |
| patch()	| Issue an HTTP PATCH request.                                               |
| post()	| Issue an HTTP POST request.                                                |
| put()	    | Issue an HTTP PUT request.                                               |
| request()	| Issue any type of HTTP request.                                          |

More here: https://k6.io/docs/using-k6/http-requests/ 

<br>

## Definition

- VU  : Virtual User. 1 VU is the same as one real life person.
- Cycle : As a Virtual User fire a request once and stop
- Duration : As a VU fire the same request over and over until given time
- Scenarios : A User Journey hitting endpoints one after another in order as a real life user would

<br>

## Checks vs Threshold

- Checks : These are Assertions, however they do not halt the execution of a test!
- Thresholds : These are global pass/fail criteria

<br>

## Calculate VU count

 ``` 
      VUs =  numHourlySessions X avgSessionsDurationInSeconds
             ------------------------------------------------
                                3600
 ```

<br>

## Run K6 (External) Link Local to k6 Cloud via API token
To access the API key go to K6 and grab the API token. Once you have this, run the following command:

```k6 login cloud --token {token}```

If you are successful, you will see your token returned in CLI.

To run your test pushing the data up:

```k6 run --out cloud {fileName.js}```

<br>

## Performance Run Configs

For the above types of tests there are configs that can be added to or used with any test you generate. These can be found under the configs folder in the root.

These are accessed by importing the config and then passing the scenario name. For example

`export const options = setRampConfig("RampExecutorConfigType1");`

<br>

## Metrics
Report metrics:

| METRIC NAME	|TYPE	|DESCRIPTION|
|---------------|-------|-----------|
|http_reqs	|Counter|	How many HTTP requests has k6 generated, in total.|
|http_req_blocked	|Trend|	Time spent blocked (waiting for a free TCP connection slot) before initiating the request. float|
|http_req_connecting	|Trend|	Time spent establishing TCP connection to the remote host. float|
|http_req_tls_handshaking	|Trend|	Time spent handshaking TLS session with remote host|
|http_req_sending	|Trendv	Time spent sending data to the remote host. float|
|http_req_waiting	|Trend|	Time spent waiting for response from remote host (a.k.a. “time to first byte”, or “TTFB”). float|
|http_req_receiving	|Trend|	Time spent receiving response data from the remote host. float|
|http_req_duration	|Trend|	Total time for the request. It's equal to http_req_sending + http_req_waiting + http_req_receiving (i.e. how long did the remote server take to process the request and respond, without the initial DNS lookup/connection times). float|
|http_req_failed (≥ v0.31)	|Rate|	The rate of failed requests according to setResponseCallback.|

<br>

## Generate a Local Report via 3rd Party tool
To generate a local report navigate into the folder where the perforance test is located and the following

```
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Produce a report from JSON Data handleSummary is the AfterAll callback function provided by k6
export function handleSummary(data) {
  return {
    "scenario_POSTPetResult.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
```
<br>

## Mocks

Any JSON request body that is required needs to be added inside the mocks folder

<br>

## VSCode Extentions

Below are two VSCode extentions for K6

- Snippets: https://marketplace.visualstudio.com/items?itemName=mJacobson.snippets-for-k6
- K6 Quick Commands: https://marketplace.visualstudio.com/items?itemName=k6.k6 

<br>

## More information

- K6 metric types and their inclusion into tests: https://k6.io/docs/using-k6/metrics/
- Datadog Docker Agent information: https://docs.datadoghq.com/agent/docker/?tab=standard
- Datadog Docker Agent StatD information/configuration: https://k6.io/docs/results-visualization/statsd/
- K6 - Options : https://k6.io/docs/using-k6/k6-options/how-to/
- K6 - Lifecycle of a Script : https://k6.io/docs/using-k6/test-life-cycle/
