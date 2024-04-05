/* 
Executor: ramping-arrival-rate

Description: Instead of controlling the number of VUs, this executor focuses on the rate of new iterations (new virtual users arriving) 
per time unit and allows this rate to ramp up or down during the test. The goal is to simulate a changing demand on the system, 
increasing or decreasing the rate of new actions or requests per time unit.

Use Case: Ideal for simulating real-world scenarios where the load on your system varies over time. It helps understand how well 
your system can handle spikes in traffic and adapt to changing loads. It's particularly useful for testing auto-scaling capabilities 
and performance under fluctuating demand.
*/

export const setRampArrivalConfig = (scenario_key) => ({
  scenarios: {
    [scenario_key]: rampArrivalRateConfigs["scenarios"][scenario_key],
  },
});

export const rampArrivalRateConfigs = {
  scenarios: {
    RampArrivalRateConfigType1: {
      executor: "ramping-arrival-rate",
      startRate: 0,
      timeUnit: "1s",
      preAllocatedVUs: 300,
      maxVUs: 8000,
      stages: [
        { target: 50, duration: "5m" },
        { target: 100, duration: "5m" },
        { target: 150, duration: "5m" },
        { target: 200, duration: "5m" },
        { target: 250, duration: "5m" },
        { target: 300, duration: "5m" },
        { target: 400, duration: "5m" },
        { target: 500, duration: "5m" },
        { target: 600, duration: "5m" },
        { target: 750, duration: "5m" },
      ],
    },
    RampArrivalRateConfigType2: {
      executor: "ramping-arrival-rate",
      startRate: 0,
      timeUnit: "1s",
      preAllocatedVUs: 10,
      maxVUs: 1000,
      stages: [
        { target: 100, duration: "2m" },
        { target: 200, duration: "2m" },
        { target: 300, duration: "2m" },
        { target: 400, duration: "2m" },
        { target: 500, duration: "2m" },
        { target: 500, duration: "10m" },
      ],
    },
    RampArrivalRateConfigType3: {
      executor: "ramping-arrival-rate",
      startRate: 0,
      timeUnit: "1s",
      preAllocatedVUs: 10,
      maxVUs: 1000,
      stages: [
        { target: 200, duration: "2m" },
        { target: 400, duration: "2m" },
        { target: 600, duration: "2m" },
        { target: 800, duration: "2m" },
        { target: 1000, duration: "2m" },
        { target: 1000, duration: "10m" },
      ],
    },
    RampArrivalRateConfigType4: {
      executor: "ramping-arrival-rate",
      startRate: 0,
      timeUnit: "1s",
      preAllocatedVUs: 10,
      maxVUs: 1000,
      stages: [
        { target: 25, duration: "2m" },
        { target: 50, duration: "2m" },
        { target: 75, duration: "2m" },
        { target: 100, duration: "2m" },
      ],
    },
  },
};
