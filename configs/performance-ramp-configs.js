export const setRampConfig = (scenario_key) => ({
    scenarios: { [scenario_key]: rampConfigs["scenarios"][scenario_key] },
  });
  
export const rampConfigs = {
    scenarios: {
     RampExecutorConfigDemo: {
        executor: "ramping-vus",
        startVUs: 0,
        stages: [
            { duration: "5s", target: 1 },
            { duration: "5", target: 2 },
            { duration: "10s", target: 0 },
        ],
     },
     RampExecutorConfigType1: {
        executor: "ramping-vus",
        startVUs: 0,
        stages: [
          { duration: "5m", target: 100 },
          { duration: "5m", target: 100 },
          { duration: "10m", target: 0 },
        ],
      },
      RampExecutorConfigType2: {
        executor: "ramping-vus",
        startVUs: 0,
        stages: [
          { duration: "5m", target: 100 },
          { duration: "5m", target: 100 },
          { duration: "5m", target: 200 },
          { duration: "5m", target: 200 },
          { duration: "20m", target: 0 },
        ],
      },
      RampExecutorConfigType3: {
        executor: "ramping-vus",
        startVUs: 0,
        stages: [
          { duration: "5m", target: 100 },
          { duration: "5m", target: 100 },
          { duration: "5m", target: 200 },
          { duration: "5m", target: 200 },
          { duration: "5m", target: 300 },
          { duration: "5m", target: 300 },
          { duration: "30m", target: 0 },
        ],
      },
      RampExecutorConfigType4: {
        executor: "ramping-vus",
        startVUs: 0,
        stages: [
          { duration: "5m", target: 100 },
          { duration: "5m", target: 100 },
          { duration: "5m", target: 200 },
          { duration: "5m", target: 200 },
          { duration: "5m", target: 300 },
          { duration: "5m", target: 300 },
          { duration: "5m", target: 400 },
          { duration: "5m", target: 400 },
          { duration: "40m", target: 0 },
        ],
      },
      RampExecutorConfigType5: {
        executor: "ramping-vus",
        startVUs: 0,
        stages: [
          { duration: "5m", target: 100 },
          { duration: "5m", target: 100 },
          { duration: "5m", target: 200 },
          { duration: "5m", target: 200 },
          { duration: "5m", target: 300 },
          { duration: "5m", target: 300 },
          { duration: "5m", target: 400 },
          { duration: "5m", target: 400 },
          { duration: "5m", target: 500 },
          { duration: "5m", target: 500 },
          { duration: "50m", target: 0 },
        ],
      },
    },
  };
  