const petNames = [
    "Max",
    "Luna",
    "Jasper",
    "Coco Chanel Divalicious",
    "Angus Von Wigglebottom",
    "Rainbow Sparkle Cotton Candy",
  ];

let  petTag = "k6PerformancePet" + Math.floor(Math.random() * 9999999999);

export const generatePetAPIRequest = {
    name: petNames[Math.floor(Math.random() * petNames.length)],
    id: Math.floor(Math.random() * 9999999999),
    category: {
      id: Math.floor(Math.random() * 9999999999),
      name: 'Dog'
    },
    "tags": [
      {
        "id": Math.floor(Math.random() * 9999999999),
        "name": petTag
      }
    ],
    status: "sold"
  };
  