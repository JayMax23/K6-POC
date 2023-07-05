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
