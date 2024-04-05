/* 
Executor: constant-vus

Description: This executor maintains a constant number of virtual users (VUs) throughout the entire test duration. 
It's used to generate a steady load on the system, allowing you to observe how your system behaves under a continuous, 
fixed level of demand. 

Use Case: Ideal for baseline testing to understand how your system performs under a known steady load. 
It helps identify performance bottlenecks and stability issues when the system is not subjected to varying load.
*/

export const setConstantConfig = (scenario_key) => ({
  scenarios: {
    [scenario_key]: constantConfigs["scenarios"][scenario_key],
  },
});

export const constantConfigs = {
  scenarios: {
    ConstantConfigType1: {
      executor: "constant-vus",
      vus: 100,
      duration: "5m",
    },
    ConstantConfigType2: {
      executor: "constant-vus",
      vus: 200,
      duration: "5m",
    },
    ConstantConfigType3: {
      executor: "constant-vus",
      vus: 300,
      duration: "5m",
    },
    ConstantConfigType4: {
      executor: "constant-vus",
      vus: 400,
      duration: "5m",
    },
    ConstantConfigType5: {
      executor: "constant-vus",
      vus: 500,
      duration: "5m",
    },
  },
};
